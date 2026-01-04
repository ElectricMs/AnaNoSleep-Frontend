<template>
  <div class="serif-tutorials" :class="{ 'dark-mode': themeStore.isDarkMode }">
    <!-- Hero Section - Editorial Typography -->
    <section class="serif-hero-tutorials">
      <div class="serif-container">
        <!-- Section Label -->
        <div class="serif-section-label-hero">
          <span class="serif-line"></span>
          <span class="serif-label-text">TUTORIALS & GUIDES</span>
          <span class="serif-line"></span>
        </div>

        <h1 class="serif-hero-title">攻略教程</h1>
        <p class="serif-hero-subtitle">
          从入门到精通，掌握每一个英雄的制胜秘籍，
          <span class="serif-accent-text">系统教学</span>助你进阶
        </p>

        <!-- Decorative Rule -->
        <div class="serif-hero-rule"></div>
      </div>
    </section>

    <!-- Loading State -->
    <div v-if="shouldShowLoading" class="serif-loading-section">
      <div class="serif-container">
        <div class="serif-loading">
          <div class="serif-loading-spinner"></div>
          <p>正在加载教程...</p>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="blogStore.error" class="serif-error-section">
      <div class="serif-container">
        <div class="serif-error">
          <div class="serif-error-icon">⚠</div>
          <p class="serif-error-message">{{ blogStore.error }}</p>
          <button @click="loadBlogs" class="serif-btn serif-btn--primary">重试</button>
        </div>
      </div>
    </div>

    <!-- Tutorials List - Editorial List Layout -->
    <section v-else-if="shouldShowContent" class="serif-rows-section">
      <div class="serif-container">
        <div class="serif-rows">
          <article
            v-for="(blog, index) in blogStore.blogs"
            :key="blog.id"
            :ref="el => setCardRef(el, index)"
            class="serif-tutorial-row"
            :class="{ 'serif-animate-in': visibleCards[index] }"
            @click="openBlog(blog.id)"
          >
            <!-- Row Number -->
            <div class="serif-row-number">
              <span class="serif-number-text">{{ String(index + 1).padStart(2, '0') }}</span>
            </div>

            <!-- Row Image -->
            <div class="serif-row-image-wrapper">
              <img
                :src="getBlogImage(blog)"
                :alt="blog.title"
                class="serif-row-image"
                loading="lazy"
              />
              <!-- Category Badge -->
              <div class="serif-category-badge" v-if="blog.categoryName">
                {{ blog.categoryName }}
              </div>
            </div>

            <!-- Row Content -->
            <div class="serif-row-content">
              <!-- Meta Info -->
              <div class="serif-row-meta">
                <time class="serif-meta-date">{{ formatDate(blog.createdAt) }}</time>
                <span class="serif-meta-views" v-if="blog.viewCount">
                  {{ blog.viewCount }} 阅读
                </span>
              </div>

              <!-- Title -->
              <h3 class="serif-row-title">{{ blog.title }}</h3>

              <!-- Description -->
              <p class="serif-row-description">{{ blog.excerpt || '暂无简介' }}</p>
            </div>

            <!-- Row Arrow -->
            <div class="serif-row-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Empty State -->
    <div v-else-if="shouldShowEmpty" class="serif-empty-section">
      <div class="serif-container">
        <div class="serif-empty">
          <div class="serif-empty-icon">📚</div>
          <p class="serif-empty-text">暂无教程内容，敬请期待</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '../stores/theme'
import { useBlogStore } from '../stores/blog'

const themeStore = useThemeStore()
const blogStore = useBlogStore()
const router = useRouter()

// Animation states
const visibleCards = ref({})
const cardRefs = ref([])

// 计算属性：判断是否应该显示内容
const shouldShowContent = computed(() => {
  return !blogStore.loading && blogStore.blogs.length > 0
})

// 计算属性：判断是否应该显示加载状态
const shouldShowLoading = computed(() => {
  return blogStore.loading && blogStore.blogs.length === 0
})

// 计算属性：判断是否应该显示空状态
const shouldShowEmpty = computed(() => {
  return !blogStore.loading && blogStore.blogs.length === 0 && !blogStore.error
})

// Set card refs
const setCardRef = (el, index) => {
  if (el) {
    cardRefs.value[index] = el
  }
}

// Intersection Observer
let observer = null

const setupObserver = () => {
  // 清理旧的 observer
  if (observer) {
    observer.disconnect()
  }

  // 检查是否有卡片需要观察
  const cardsToObserve = cardRefs.value.filter(c => c)
  console.log('[TutorialsView] 准备观察卡片数量:', cardsToObserve.length)

  if (cardsToObserve.length === 0) {
    console.log('[TutorialsView] 没有卡片需要观察，直接显示所有')
    blogStore.blogs.forEach((_, index) => {
      visibleCards.value[index] = true
    })
    return
  }

  // 创建新的 observer
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const cardIndex = cardRefs.value.findIndex(ref => ref === entry.target)
        if (cardIndex !== -1) {
          console.log(`[TutorialsView] 卡片 ${cardIndex} 进入视口，触发动画`)
          visibleCards.value[cardIndex] = true
        }
        observer.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.01, // 降低阈值，几乎一进入视口就触发
    rootMargin: '100px' // 在视口外 100px 就开始观察
  })

  // 开始观察所有卡片
  cardsToObserve.forEach((card, index) => {
    console.log(`[TutorialsView] 开始观察卡片 ${index}`)
    observer.observe(card)
  })
}

// 加载博客数据
const loadBlogs = async () => {
  console.log('[TutorialsView] 开始加载博客数据...')
  try {
    await blogStore.fetchBlogs({ pageSize: 12 })
    console.log('[TutorialsView] 博客数据加载完成:', {
      blogsCount: blogStore.blogs.length,
      loading: blogStore.loading,
      error: blogStore.error
    })
  } catch (error) {
    console.error('[TutorialsView] 加载博客数据失败:', error)
  }
}

// 打开博客详情
const openBlog = (blogId) => {
  router.push(`/blog/${blogId}`)
}

// 获取博客图片
const getBlogImage = (blog) => {
  if (blog.featuredImage) {
    return blog.featuredImage
  }
  // 如果没有特色图片，使用默认图片
  return '/src/assets/images/hero-tutorial.jpg'
}

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// 组件挂载时加载数据
onMounted(() => {
  console.log('[TutorialsView] 组件已挂载，当前状态:', {
    blogsCount: blogStore.blogs.length,
    loading: blogStore.loading,
    error: blogStore.error
  })

  // 清空之前的错误状态
  blogStore.clearError()

  // 加载数据
  loadBlogs().then(async () => {
    // 等待 Vue 完成 DOM 更新
    await nextTick()

    // 再等待一小段时间确保浏览器完成布局
    setTimeout(() => {
      console.log('[TutorialsView] 数据加载完成，设置观察器，当前博客数量:', blogStore.blogs.length)
      setupObserver()

      // 1秒后如果还有卡片没显示，强制显示所有卡片（后备方案）
      setTimeout(() => {
        const invisibleCount = blogStore.blogs.length - Object.keys(visibleCards.value).filter(k => visibleCards.value[k]).length
        if (invisibleCount > 0) {
          console.log(`[TutorialsView] 后备方案：强制显示所有 ${invisibleCount} 个未显示的卡片`)
          blogStore.blogs.forEach((_, index) => {
            if (!visibleCards.value[index]) {
              visibleCards.value[index] = true
            }
          })
        }
      }, 1000)
    }, 200)
  })
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style lang="scss" scoped>
/* ============================================
   SERIF DESIGN SYSTEM - Tutorials Styles
   ============================================ */

.serif-tutorials {
  min-height: 100vh;
  background: var(--serif-background);
  color: var(--serif-foreground);
  font-family: var(--serif-font-body);
  transition: background 0.3s ease, color 0.3s ease;

  &.dark-mode {
    background: var(--serif-background);
    color: var(--serif-foreground);
  }
}

.serif-container {
  max-width: var(--serif-container-max);
  margin: 0 auto;
  padding: 0 2rem;
}

/* ============================================
   HERO SECTION
   ============================================ */
.serif-hero-tutorials {
  padding: 4rem 0 4rem 0;
  text-align: center;
  position: relative;

  /* Subtle noise texture */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.3;
    pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  }
}

.serif-section-label-hero {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  position: relative;
  z-index: 2;
}

.serif-line {
  flex: 1;
  max-width: 120px;
  height: 1px;
  background: var(--serif-border);
}

.serif-label-text {
  font-family: var(--serif-font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--serif-accent);
}

.serif-hero-title {
  font-family: var(--serif-font-display);
  font-size: clamp(3rem, 7vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--serif-foreground);
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
}

.serif-hero-subtitle {
  font-size: 1.125rem;
  line-height: 1.75;
  color: var(--serif-muted-foreground);
  max-width: 640px;
  margin: 0 auto 2rem;
  position: relative;
  z-index: 2;
}

.serif-accent-text {
  color: var(--serif-accent);
  font-style: italic;
}

.serif-hero-rule {
  width: 80px;
  height: 3px;
  background: var(--serif-accent);
  margin: 2rem auto 0;
  position: relative;
  z-index: 2;

  /* Decorative end marks */
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 4px;
    height: 4px;
    background: var(--serif-accent);
    border-radius: 50%;
    transform: translateY(-50%);
  }

  &::before {
    left: -8px;
  }

  &::after {
    right: -8px;
  }
}

/* ============================================
   ROWS SECTION - Editorial List Layout
   ============================================ */
.serif-rows-section {
  padding: 4rem 0 8rem 0;
}

.serif-rows {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.serif-tutorial-row {
  display: grid;
  grid-template-columns: auto 240px 1fr auto;
  gap: 2rem;
  align-items: center;
  background: var(--serif-card);
  border: 1px solid var(--serif-border);
  border-left: 3px solid var(--serif-accent);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;

  /* Animation initial state */
  opacity: 0;
  transform: translateX(-40px);

  &.serif-animate-in {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    transform: translateX(8px);
    border-color: var(--serif-accent);

    .serif-row-image {
      transform: scale(1.05);
    }

    .serif-row-arrow {
      color: var(--serif-accent);
      transform: translateX(4px);
    }

    .serif-row-title {
      color: var(--serif-accent);
    }
  }
}

/* Dark mode row adjustments */
.serif-tutorials.dark-mode {
  .serif-tutorial-row {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

    &:hover {
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }
  }
}

/* Row Number */
.serif-row-number {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--serif-font-display);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--serif-border);
  line-height: 1;
  min-width: 60px;
}

.serif-number-text {
  color: var(--serif-accent);
  opacity: 0.7;
  text-shadow: 0 1px 0 rgba(26, 26, 26, 0.06);
  transition: opacity 0.2s ease-out, color 0.2s ease-out;
}

.serif-tutorial-row:hover .serif-number-text {
  opacity: 0.95;
}

/* Row Image */
.serif-row-image-wrapper {
  width: 240px;
  height: 150px;
  border-radius: 8px;
  overflow: hidden;
  background: var(--serif-muted);
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: relative;
}

.serif-row-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.serif-category-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: var(--serif-accent);
  color: var(--serif-accent-foreground);
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-family: var(--serif-font-mono);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  z-index: 2;
}

/* Row Content */
.serif-row-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 0;
}

.serif-row-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: var(--serif-font-mono);
  font-size: 0.75rem;
  color: var(--serif-muted-foreground);
}

.serif-meta-date,
.serif-meta-views {
  font-weight: 500;
  letter-spacing: 0.05em;
}

.serif-row-title {
  font-family: var(--serif-font-display);
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--serif-foreground);
  margin: 0;
  transition: color 0.3s ease;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.serif-row-description {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--serif-muted-foreground);
  margin: 0;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Row Arrow */
.serif-row-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--serif-muted);
  color: var(--serif-muted-foreground);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

.serif-tutorial-row:hover .serif-row-arrow {
  background: var(--serif-accent);
  color: var(--serif-accent-foreground);
}

/* ============================================
   LOADING & ERROR STATES
   ============================================ */
.serif-loading-section,
.serif-error-section,
.serif-empty-section {
  padding: 4rem 0 8rem 0;
}

.serif-loading,
.serif-error,
.serif-empty {
  text-align: center;
  padding: 4rem 2rem;
}

.serif-loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid var(--serif-border);
  border-top-color: var(--serif-accent);
  border-radius: 50%;
  animation: serif-spin 1s linear infinite;
  margin: 0 auto 1.5rem;
}

@keyframes serif-spin {
  to { transform: rotate(360deg); }
}

.serif-error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.serif-error-message {
  color: #dc3545;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.serif-empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.4;
}

.serif-empty-text {
  font-size: 1.1rem;
  color: var(--serif-muted-foreground);
}

/* Button */
.serif-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 2rem;
  font-family: var(--serif-font-body);
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-decoration: none;
  border-radius: 6px;
  transition: all 200ms ease-out;
  border: none;
  cursor: pointer;

  &.serif-btn--primary {
    background: var(--serif-accent);
    color: var(--serif-accent-foreground);
    box-shadow: 0 2px 8px rgba(184, 134, 11, 0.2);

    &:hover {
      background: var(--serif-accent-secondary);
      box-shadow: 0 4px 12px rgba(184, 134, 11, 0.25);
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  }
}

/* ============================================
   RESPONSIVE DESIGN
   ============================================ */
@media (max-width: 1200px) {
  .serif-tutorial-row {
    grid-template-columns: auto 200px 1fr auto;
    gap: 1.5rem;
    padding: 1.5rem;
  }

  .serif-row-image-wrapper {
    width: 200px;
    height: 125px;
  }

  .serif-row-title {
    font-size: 1.5rem;
  }

  .serif-row-number {
    font-size: 2rem;
    min-width: 50px;
  }
}

@media (max-width: 1024px) {
  .serif-tutorial-row {
    grid-template-columns: auto 180px 1fr auto;
    gap: 1.5rem;
  }

  .serif-row-image-wrapper {
    width: 180px;
    height: 110px;
  }

  .serif-row-title {
    font-size: 1.35rem;
  }

  .serif-hero-title {
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .serif-container {
    padding: 0 1.5rem;
  }

  .serif-hero-tutorials {
    padding: 4rem 0 3rem 0;
  }

  .serif-section-label-hero {
    margin-bottom: 2rem;
    gap: 1rem;

    .serif-line {
      max-width: 60px;
    }
  }

  .serif-hero-title {
    font-size: 2.5rem;
  }

  .serif-hero-subtitle {
    font-size: 1rem;
  }

  .serif-hero-rule {
    width: 60px;
  }

  .serif-rows-section,
  .serif-loading-section,
  .serif-error-section,
  .serif-empty-section {
    padding: 3rem 0 6rem 0;
  }

  .serif-rows {
    gap: 1.5rem;
  }

  .serif-tutorial-row {
    grid-template-columns: auto 1fr auto;
    grid-template-areas:
      "number content arrow"
      "image image image";
    gap: 1rem;
    padding: 1.5rem;

    /* Animation from left */
    transform: translateX(-30px);
  }

  .serif-row-number {
    grid-area: number;
    font-size: 1.75rem;
    min-width: 40px;
  }

  .serif-row-image-wrapper {
    grid-area: image;
    width: 100%;
    height: 180px;
    order: 3;
  }

  .serif-row-content {
    grid-area: content;
  }

  .serif-row-arrow {
    grid-area: arrow;
    width: 40px;
    height: 40px;
  }

  .serif-row-title {
    font-size: 1.25rem;
  }

  .serif-row-description {
    font-size: 0.9rem;
    line-clamp: 3;
    -webkit-line-clamp: 3;
  }
}

/* Dark Mode Enhancements */
.serif-tutorials.dark-mode {
  .serif-row-arrow {
    background: rgba(255, 255, 255, 0.05);
  }

  .serif-tutorial-row:hover .serif-row-arrow {
    background: var(--serif-accent);
    color: var(--serif-accent-foreground);
  }

  .serif-error-message {
    color: #ff6b6b;
  }
}
</style>

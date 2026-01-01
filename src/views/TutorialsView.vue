<template>
  <div class="serif-tutorials" :class="{ 'dark-mode': themeStore.isDarkMode }">
    <!-- Hero Section -->
    <section class="serif-hero-tutorials">
      <div class="serif-container">
        <!-- Section Label -->
        <div class="serif-section-label-hero">
          <span class="serif-line"></span>
          <span class="serif-label-text">TUTORIALS</span>
          <span class="serif-line"></span>
        </div>

        <h1 class="serif-hero-title">攻略教程</h1>
        <p class="serif-hero-subtitle">
          从入门到精通，掌握每一个英雄的制胜秘籍——
          <span class="serif-accent-text">深度解析</span>助你进阶
        </p>

        <!-- Decorative Rule -->
        <div class="serif-hero-rule"></div>
      </div>
    </section>

    <!-- Loading State -->
    <div v-if="blogStore.loading" class="serif-loading-section">
      <div class="serif-container">
        <div class="serif-loading-spinner"></div>
        <p class="serif-loading-text">正在加载教程...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="blogStore.error" class="serif-error-section">
      <div class="serif-container">
        <div class="serif-error-content">
          <div class="serif-error-icon">⚠</div>
          <h2 class="serif-error-title">加载失败</h2>
          <p class="serif-error-message">{{ blogStore.error }}</p>
          <button @click="loadBlogs" class="serif-btn serif-btn--primary">
            重试
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="blogStore.blogs.length === 0" class="serif-empty-section">
      <div class="serif-container">
        <div class="serif-empty-content">
          <div class="serif-empty-icon">📚</div>
          <h2 class="serif-empty-title">暂无教程内容</h2>
          <p class="serif-empty-text">敬请期待更多精彩内容</p>
        </div>
      </div>
    </div>

    <!-- Tutorials List -->
    <section v-else class="serif-rows-section">
      <div class="serif-container">
        <div class="serif-rows">
          <div
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
            </div>

            <!-- Row Content -->
            <div class="serif-row-content">
              <!-- Category Label -->
              <span v-if="blog.categoryName" class="serif-row-category">{{ blog.categoryName }}</span>

              <!-- Title -->
              <h3 class="serif-row-title">{{ blog.title }}</h3>

              <!-- Description -->
              <p class="serif-row-description">{{ blog.excerpt || '暂无简介' }}</p>

              <!-- Meta Info -->
              <div class="serif-row-meta">
                <span class="serif-meta-date">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  {{ formatDate(blog.createdAt) }}
                </span>
                <span v-if="blog.viewCount" class="serif-meta-views">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  {{ blog.viewCount }} 阅读
                </span>
              </div>
            </div>

            <!-- Row Arrow -->
            <div class="serif-row-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '../stores/theme'
import { useBlogStore } from '../stores/blog'

const themeStore = useThemeStore()
const blogStore = useBlogStore()
const router = useRouter()

// Animation states
const visibleCards = ref({})
const cardRefs = ref([])

// Set card refs
const setCardRef = (el, index) => {
  if (el) {
    cardRefs.value[index] = el
  }
}

// Intersection Observer
let observer = null

const setupObserver = () => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const cardIndex = cardRefs.value.findIndex(ref => ref === entry.target)
        if (cardIndex !== -1) {
          visibleCards.value[cardIndex] = true
        }
        observer.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  })

  cardRefs.value.forEach(card => {
    if (card) {
      observer.observe(card)
    }
  })
}

// Load blogs
const loadBlogs = async () => {
  await blogStore.fetchBlogs({ pageSize: 12 })
}

// Open blog detail
const openBlog = (blogId) => {
  router.push(`/blog/${blogId}`)
}

// Get blog image
const getBlogImage = (blog) => {
  if (blog.featuredImage) {
    return blog.featuredImage
  }
  return '/src/assets/images/hero-tutorial.jpg'
}

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(() => {
  loadBlogs()
  setTimeout(setupObserver, 100)
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
  //padding-top: 60px; /* Account for fixed navbar */

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
   LOADING & ERROR STATES
   ============================================ */
.serif-loading-section,
.serif-error-section,
.serif-empty-section {
  padding: 6rem 0 8rem 0;
}

.serif-loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid var(--serif-border);
  border-top: 4px solid var(--serif-accent);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 2rem;
}

.serif-loading-text {
  text-align: center;
  font-size: 1.125rem;
  color: var(--serif-muted-foreground);
  font-family: var(--serif-font-mono);
  letter-spacing: 0.05em;
}

.serif-error-content,
.serif-empty-content {
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
}

.serif-error-icon,
.serif-empty-icon {
  font-size: 4rem;
  margin-bottom: 2rem;
  opacity: 0.5;
}

.serif-error-title,
.serif-empty-title {
  font-family: var(--serif-font-display);
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--serif-foreground);
  margin-bottom: 1rem;
}

.serif-error-message,
.serif-empty-text {
  font-size: 1.125rem;
  color: var(--serif-muted-foreground);
  line-height: 1.7;
  margin-bottom: 2rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* ============================================
   TUTORIALS ROWS SECTION
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
  grid-template-columns: auto 280px 1fr auto;
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
  opacity: 0.3;
  transition: opacity 0.3s ease;
}

.serif-tutorial-row:hover .serif-number-text {
  opacity: 0.6;
}

/* Row Image */
.serif-row-image-wrapper {
  width: 280px;
  height: 157.5px; /* 16:9 ratio */
  border-radius: 8px;
  overflow: hidden;
  background: var(--serif-muted);
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.serif-row-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Row Content */
.serif-row-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 0; /* Prevent flex overflow */
}

.serif-row-category {
  font-family: var(--serif-font-mono);
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--serif-accent);
  display: inline-block;
  align-self: flex-start;
  padding: 0.25rem 0.75rem;
  background: rgba(184, 134, 11, 0.08);
  border-radius: 4px;
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

  /* Limit to 2 lines */
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

  /* Limit to 2 lines */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.serif-row-meta {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 0.5rem;
}

.serif-meta-date,
.serif-meta-views {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--serif-font-mono);
  font-size: 0.75rem;
  color: var(--serif-muted-foreground);
  letter-spacing: 0.05em;

  svg {
    opacity: 0.6;
  }
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
   BUTTONS
   ============================================ */
.serif-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2.5rem;
  font-family: var(--serif-font-body);
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 48px;
  position: relative;
  overflow: hidden;
  border: none;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &.serif-btn--primary {
    background: var(--serif-accent);
    color: var(--serif-accent-foreground);
    box-shadow: 0 2px 8px rgba(184, 134, 11, 0.15);

    &:hover {
      background: var(--serif-accent-secondary);
      box-shadow: 0 6px 20px rgba(184, 134, 11, 0.25);
      transform: translateY(-2px);

      &::before {
        opacity: 1;
      }
    }
  }
}

/* ============================================
   RESPONSIVE DESIGN
   ============================================ */
@media (max-width: 1200px) {
  .serif-tutorial-row {
    grid-template-columns: auto 240px 1fr auto;
    gap: 1.5rem;
    padding: 1.5rem;
  }

  .serif-row-image-wrapper {
    width: 240px;
    height: 135px; /* 16:9 ratio */
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
    grid-template-columns: auto 200px 1fr auto;
    gap: 1.5rem;
  }

  .serif-row-image-wrapper {
    width: 200px;
    height: 112.5px; /* 16:9 ratio */
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

  .serif-rows-section {
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
    -webkit-line-clamp: 3;
  }

  .serif-row-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
}

/* Dark Mode Enhancements */
.serif-tutorials.dark-mode {
  .serif-row-category {
    background: rgba(184, 134, 11, 0.15);
  }

  .serif-row-arrow {
    background: rgba(255, 255, 255, 0.05);
  }

  .serif-tutorial-row:hover .serif-row-arrow {
    background: var(--serif-accent);
    color: var(--serif-accent-foreground);
  }
}
</style>

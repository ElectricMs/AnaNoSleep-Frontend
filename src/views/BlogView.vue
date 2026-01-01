<template>
  <div class="serif-blog" :class="{ 'dark-mode': themeStore.isDarkMode }">
    <!-- Loading State -->
    <div v-if="blogStore.loading" class="serif-loading-section">
      <div class="serif-container">
        <div class="serif-loading-spinner"></div>
        <p class="serif-loading-text">正在加载精彩内容...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="blogStore.error" class="serif-error-section">
      <div class="serif-container">
        <div class="serif-error-content">
          <div class="serif-error-icon">⚠</div>
          <h2 class="serif-error-title">加载失败</h2>
          <p class="serif-error-message">{{ blogStore.error }}</p>
          <button @click="loadBlog" class="serif-btn serif-btn--primary">
            重新加载
          </button>
        </div>
      </div>
    </div>

    <!-- Blog Content -->
    <article v-else-if="blogStore.currentBlog" class="serif-article-wrapper">
      <!-- Back Navigation -->
      <nav class="serif-nav-back">
        <button @click="goBack" class="serif-back-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>返回教程列表</span>
        </button>
      </nav>

      <!-- Article Header -->
      <header class="serif-article-header">
        <!-- Category Label -->
        <div v-if="blogStore.currentBlog.categoryName" class="serif-category-label">
          <span class="serif-label-text">{{ blogStore.currentBlog.categoryName }}</span>
        </div>

        <!-- Article Title -->
        <h1 class="serif-article-title">{{ blogStore.currentBlog.title }}</h1>

        <!-- Article Meta -->
        <div class="serif-article-meta">
          <div class="serif-meta-group">
            <span class="serif-meta-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              {{ blogStore.currentBlog.authorName }}
            </span>
            <span class="serif-meta-divider">·</span>
            <span class="serif-meta-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              {{ formatDate(blogStore.currentBlog.createdAt) }}
            </span>
          </div>
          <div class="serif-meta-views">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            {{ blogStore.currentBlog.viewCount || 0 }} 次阅读
          </div>
        </div>
      </header>

      <!-- Featured Image -->
      <div v-if="blogStore.currentBlog.featuredImage" class="serif-featured-image">
        <img :src="blogStore.currentBlog.featuredImage" :alt="blogStore.currentBlog.title" />
      </div>

      <!-- Article Content -->
      <div class="serif-article-content">
        <div class="serif-content-wrapper">
          <!-- Rich Text Content -->
          <div class="serif-rich-content" v-html="blogStore.currentBlog.content"></div>

          <!-- Tags -->
          <div v-if="blogStore.currentBlog.tags && blogStore.currentBlog.tags.length" class="serif-article-tags">
            <span v-for="tag in blogStore.currentBlog.tags" :key="tag.id" class="serif-tag">
              #{{ tag.name }}
            </span>
          </div>

          <!-- Divider -->
          <hr class="serif-article-divider" />

          <!-- Actions -->
          <div class="serif-article-actions">
            <button @click="likeBlog" class="serif-action-btn serif-btn-like" :class="{ 'serif-liked': isLiked }">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span>{{ isLiked ? '已点赞' : '点赞' }}</span>
              <span v-if="blogStore.currentBlog.likeCount > 0" class="serif-like-count">{{ blogStore.currentBlog.likeCount }}</span>
            </button>

            <button @click="shareBlog" class="serif-action-btn serif-btn-share">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              <span>分享</span>
            </button>
          </div>
        </div>
      </div>
    </article>

    <!-- Not Found -->
    <div v-else class="serif-not-found-section">
      <div class="serif-container">
        <div class="serif-not-found-content">
          <div class="serif-not-found-icon">📄</div>
          <h2 class="serif-not-found-title">未找到文章</h2>
          <p class="serif-not-found-text">抱歉，您访问的文章不存在或已被删除。</p>
          <button @click="goBack" class="serif-btn serif-btn--primary">
            返回教程列表
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useThemeStore } from '../stores/theme'
import { useBlogStore } from '../stores/blog'

const themeStore = useThemeStore()
const blogStore = useBlogStore()
const route = useRoute()
const router = useRouter()

const isLiked = ref(false)

// Load blog
const loadBlog = async () => {
  const blogId = route.params.id
  if (blogId) {
    await blogStore.fetchBlogById(blogId)
  }
}

// Go back
const goBack = () => {
  router.push('/tutorials')
}

// Like blog
const likeBlog = async () => {
  if (blogStore.currentBlog) {
    const result = await blogStore.likeBlog(blogStore.currentBlog.id)
    if (result.success) {
      isLiked.value = true
      setTimeout(() => {
        isLiked.value = false
      }, 3000)
    }
  }
}

// Share blog
const shareBlog = async () => {
  if (navigator.share && blogStore.currentBlog) {
    try {
      await navigator.share({
        title: blogStore.currentBlog.title,
        text: blogStore.currentBlog.excerpt,
        url: window.location.href
      })
    } catch (error) {
      console.log('分享取消或失败:', error)
    }
  } else {
    try {
      await navigator.clipboard.writeText(window.location.href)
      alert('链接已复制到剪贴板')
    } catch (error) {
      console.log('复制失败:', error)
    }
  }
}

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(() => {
  loadBlog()
})
</script>

<style lang="scss" scoped>
/* ============================================
   SERIF DESIGN SYSTEM - Blog Article Styles
   ============================================ */

.serif-blog {
  min-height: 100vh;
  background: var(--serif-background);
  color: var(--serif-foreground);
  font-family: var(--serif-font-body);
  transition: background 0.3s ease, color 0.3s ease;
  padding-top: 80px;

  &.dark-mode {
    background: var(--serif-background);
    color: var(--serif-foreground);
  }
}

/* ============================================
   LOADING & ERROR STATES
   ============================================ */
.serif-loading-section,
.serif-error-section,
.serif-not-found-section {
  padding: 6rem 0 8rem 0;
  min-height: 60vh;
  display: flex;
  align-items: center;
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
.serif-not-found-content {
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
}

.serif-error-icon,
.serif-not-found-icon {
  font-size: 4rem;
  margin-bottom: 2rem;
  opacity: 0.5;
}

.serif-error-title,
.serif-not-found-title {
  font-family: var(--serif-font-display);
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--serif-foreground);
  margin-bottom: 1rem;
}

.serif-error-message,
.serif-not-found-text {
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
   ARTICLE WRAPPER
   ============================================ */
.serif-article-wrapper {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem 6rem;
}

/* ============================================
   BACK NAVIGATION
   ============================================ */
.serif-nav-back {
  margin-bottom: 3rem;
}

.serif-back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: var(--serif-card);
  border: 1px solid var(--serif-border);
  border-radius: 8px;
  color: var(--serif-muted-foreground);
  font-family: var(--serif-font-mono);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;

  svg {
    transition: transform 0.3s ease;
  }

  &:hover {
    color: var(--serif-accent);
    border-color: var(--serif-accent);
    background: rgba(184, 134, 11, 0.05);

    svg {
      transform: translateX(-4px);
    }
  }
}

/* ============================================
   ARTICLE HEADER
   ============================================ */
.serif-article-header {
  text-align: center;
  margin-bottom: 4rem;
}

.serif-category-label {
  margin-bottom: 2rem;
}

.serif-label-text {
  font-family: var(--serif-font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--serif-accent);
  display: inline-block;
  padding: 0.5rem 1.25rem;
  background: rgba(184, 134, 11, 0.08);
  border-radius: 50px;
}

.serif-article-title {
  font-family: var(--serif-font-display);
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--serif-foreground);
  margin-bottom: 2rem;
}

.serif-article-meta {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  flex-wrap: wrap;
}

.serif-meta-group {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.serif-meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--serif-font-mono);
  font-size: 0.875rem;
  color: var(--serif-muted-foreground);
  letter-spacing: 0.05em;

  svg {
    opacity: 0.6;
  }
}

.serif-meta-divider {
  color: var(--serif-border);
  font-size: 0.875rem;
}

.serif-meta-views {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--serif-font-mono);
  font-size: 0.875rem;
  color: var(--serif-muted-foreground);
  letter-spacing: 0.05em;

  svg {
    opacity: 0.6;
  }
}

/* ============================================
   FEATURED IMAGE
   ============================================ */
.serif-featured-image {
  margin-bottom: 4rem;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);

  img {
    width: 100%;
    height: auto;
    display: block;
  }
}

/* ============================================
   ARTICLE CONTENT
   ============================================ */
.serif-article-content {
  background: var(--serif-card);
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  border: 1px solid var(--serif-border);
}

.serif-content-wrapper {
  max-width: 680px;
  margin: 0 auto;
}

/* Rich Content Typography */
.serif-rich-content {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--serif-foreground);

  /* Headings */
  :deep(h2) {
    font-family: var(--serif-font-display);
    font-size: 1.875rem;
    font-weight: 600;
    line-height: 1.3;
    letter-spacing: -0.01em;
    color: var(--serif-foreground);
    margin: 3rem 0 1.5rem;
    position: relative;
    padding-left: 1rem;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.15em;
      bottom: 0.15em;
      width: 3px;
      background: var(--serif-accent);
      border-radius: 2px;
    }
  }

  :deep(h3) {
    font-family: var(--serif-font-display);
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.4;
    letter-spacing: -0.01em;
    color: var(--serif-foreground);
    margin: 2.5rem 0 1.25rem;
  }

  :deep(h4) {
    font-family: var(--serif-font-display);
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.4;
    color: var(--serif-foreground);
    margin: 2rem 0 1rem;
  }

  /* Paragraphs */
  :deep(p) {
    margin-bottom: 1.8rem;
    text-align: justify;
  }

  /* Links */
  :deep(a) {
    color: var(--serif-accent);
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color 0.3s ease;

    &:hover {
      color: var(--serif-accent-secondary);
    }
  }

  /* Images */
  :deep(img) {
    max-width: 100%;
    height: auto;
    border-radius: 12px;
    margin: 2.5rem 0;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }

  /* Blockquote */
  :deep(blockquote) {
    background: var(--serif-muted);
    border-left: 3px solid var(--serif-accent);
    margin: 2.5rem 0;
    padding: 1.5rem 2rem;
    font-style: italic;
    color: var(--serif-muted-foreground);
    border-radius: 0 12px 12px 0;
    font-family: var(--serif-font-display);
    font-size: 1.25rem;
    line-height: 1.7;
  }

  /* Lists */
  :deep(ul),
  :deep(ol) {
    padding-left: 2rem;
    margin-bottom: 2rem;

    li {
      margin-bottom: 1rem;
      padding-left: 0.5rem;
    }
  }

  :deep(ul) {
    list-style: none;

    li {
      position: relative;

      &::before {
        content: '·';
        position: absolute;
        left: -1rem;
        color: var(--serif-accent);
        font-weight: 700;
        font-size: 1.2rem;
      }
    }
  }

  /* Code */
  :deep(code) {
    background: var(--serif-muted);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.9em;
    color: var(--serif-accent);
  }

  :deep(pre) {
    background: #1a1a1a;
    padding: 1.5rem;
    border-radius: 12px;
    overflow-x: auto;
    color: #e0e0e0;
    margin: 2rem 0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.875rem;
    line-height: 1.6;

    code {
      background: none;
      color: inherit;
      padding: 0;
    }
  }

  /* Tables */
  :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
    font-size: 1rem;
  }

  :deep(th),
  :deep(td) {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid var(--serif-border);
  }

  :deep(th) {
    font-family: var(--serif-font-mono);
    font-weight: 600;
    font-size: 0.875rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--serif-accent);
    background: var(--serif-muted);
  }

  :deep(tr:last-child td) {
    border-bottom: none;
  }
}

/* ============================================
   ARTICLE TAGS
   ============================================ */
.serif-article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 3rem;
}

.serif-tag {
  font-family: var(--serif-font-mono);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: var(--serif-muted-foreground);
  background: var(--serif-muted);
  padding: 0.4rem 0.875rem;
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    color: var(--serif-accent);
    background: rgba(184, 134, 11, 0.1);
  }
}

/* ============================================
   ARTICLE DIVIDER
   ============================================ */
.serif-article-divider {
  border: none;
  height: 1px;
  background: var(--serif-border);
  margin: 3rem 0 2.5rem;
}

/* ============================================
   ARTICLE ACTIONS
   ============================================ */
.serif-article-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
}

.serif-action-btn {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.875rem 2rem;
  border-radius: 50px;
  font-family: var(--serif-font-body);
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;

  svg {
    flex-shrink: 0;
  }
}

.serif-btn-like {
  background: transparent;
  border-color: #ff4757;
  color: #ff4757;

  &:hover {
    background: #fff0f1;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 71, 87, 0.15);
  }

  &.serif-liked {
    background: #ff4757;
    color: white;
  }
}

.serif-like-count {
  font-family: var(--serif-font-mono);
  font-size: 0.875rem;
  opacity: 0.8;
}

.serif-btn-share {
  background: transparent;
  border-color: var(--serif-accent);
  color: var(--serif-accent);

  &:hover {
    background: rgba(184, 134, 11, 0.08);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(184, 134, 11, 0.15);
  }
}

/* ============================================
   BUTTONS
   ============================================ */
.serif-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
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
   DARK MODE ENHANCEMENTS
   ============================================ */
.serif-blog.dark-mode {
  .serif-featured-image {
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  }

  .serif-article-content {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }

  .serif-label-text {
    background: rgba(184, 134, 11, 0.15);
  }

  .serif-rich-content {
    :deep(img) {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    }

    :deep(blockquote) {
      background: rgba(255, 255, 255, 0.03);
    }
  }

  .serif-btn-like {
    &:hover {
      background: rgba(255, 71, 87, 0.1);
    }

    &.serif-liked {
      background: #ff4757;
      color: white;
    }
  }

  .serif-btn-share {
    border-color: var(--serif-accent);

    &:hover {
      background: rgba(184, 134, 11, 0.15);
    }
  }

  .serif-back-link {
    &:hover {
      background: rgba(184, 134, 11, 0.1);
    }
  }
}

/* ============================================
   RESPONSIVE DESIGN
   ============================================ */
@media (max-width: 768px) {
  .serif-blog {
    padding-top: 60px;
  }

  .serif-article-wrapper {
    padding: 0 1.5rem 4rem;
  }

  .serif-nav-back {
    margin-bottom: 2rem;
  }

  .serif-article-header {
    margin-bottom: 3rem;
  }

  .serif-article-title {
    font-size: 2rem;
  }

  .serif-article-meta {
    flex-direction: column;
    gap: 1rem;
  }

  .serif-featured-image {
    margin-bottom: 3rem;
    border-radius: 12px;
  }

  .serif-article-content {
    padding: 2rem 1.5rem;
  }

  .serif-rich-content {
    font-size: 1rem;
    line-height: 1.7;

    :deep(h2) { font-size: 1.5rem; }
    :deep(h3) { font-size: 1.25rem; }
    :deep(h4) { font-size: 1.125rem; }
    :deep(blockquote) { font-size: 1.125rem; padding: 1.25rem 1.5rem; }
  }

  .serif-article-actions {
    flex-direction: column;
    width: 100%;

    .serif-action-btn {
      width: 100%;
      justify-content: center;
    }
  }
}
</style>

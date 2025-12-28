<template>
  <div class="blog-section" :class="{ 'dark-mode': themeStore.isDarkMode }">
    <div class="container">
      <!-- 加载状态 -->
      <div v-if="blogStore.loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>正在加载精彩内容...</p>
      </div>
      
      <!-- 错误状态 -->
      <div v-else-if="blogStore.error" class="error-container">
        <p class="error-message">{{ blogStore.error }}</p>
        <button @click="loadBlog" class="retry-button">重新加载</button>
      </div>
      
      <!-- 博客内容 -->
      <div v-else-if="blogStore.currentBlog" class="blog-wrapper animate-in">
        <!-- 顶部导航 -->
        <div class="blog-nav">
          <button @click="goBack" class="back-link">
            <span class="arrow">←</span> 返回列表
          </button>
        </div>

        <article class="blog-article">
          <!-- 文章头部 -->
          <header class="article-header">
            <div class="category-tags">
              <span v-if="blogStore.currentBlog.categoryName" class="category-pill">{{ blogStore.currentBlog.categoryName }}</span>
            </div>
            
            <h1 class="article-title">{{ blogStore.currentBlog.title }}</h1>
            
            <div class="article-meta">
              <div class="meta-left">
                <span class="author-name">{{ blogStore.currentBlog.authorName }}</span>
                <span class="divider">·</span>
                <span class="publish-date">{{ formatDate(blogStore.currentBlog.createdAt) }}</span>
              </div>
              <div class="meta-right">
                <span class="read-count">{{ blogStore.currentBlog.viewCount || 0 }} 次阅读</span>
              </div>
            </div>
          </header>
          
          <!-- 特色图片 -->
          <div v-if="blogStore.currentBlog.featuredImage" class="article-cover">
            <img :src="blogStore.currentBlog.featuredImage" :alt="blogStore.currentBlog.title" />
          </div>
          
          <!-- 文章正文 -->
          <div class="article-content rich-content" v-html="blogStore.currentBlog.content"></div>
          
          <!-- 底部标签 -->
          <div class="article-tags" v-if="blogStore.currentBlog.tags && blogStore.currentBlog.tags.length">
            <span 
              v-for="tag in blogStore.currentBlog.tags" 
              :key="tag.id" 
              class="tag-hash"
            >
              #{{ tag.name }}
            </span>
          </div>
          
          <hr class="article-divider" />
          
          <!-- 操作按钮 -->
          <div class="article-actions">
            <button @click="likeBlog" class="action-btn like-btn" :class="{ 'liked': isLiked }">
              <span class="icon">♥</span>
              <span>{{ isLiked ? '已点赞' : '点赞' }}</span>
              <span class="count" v-if="blogStore.currentBlog.likeCount > 0">{{ blogStore.currentBlog.likeCount }}</span>
            </button>
            
            <button @click="shareBlog" class="action-btn share-btn">
              <span class="icon">↗</span>
              <span>分享</span>
            </button>
          </div>
        </article>
      </div>
      
      <!-- 博客不存在 -->
      <div v-else class="not-found-container">
        <h2>未找到文章</h2>
        <p>抱歉，您访问的文章不存在或已被删除。</p>
        <button @click="goBack" class="back-button">返回教程列表</button>
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

// 加载博客数据
const loadBlog = async () => {
  const blogId = route.params.id
  if (blogId) {
    await blogStore.fetchBlogById(blogId)
  }
}

// 返回上一页
const goBack = () => {
  router.push('/tutorials')
}

// 点赞博客
const likeBlog = async () => {
  if (blogStore.currentBlog) {
    const result = await blogStore.likeBlog(blogStore.currentBlog.id)
    if (result.success) {
      isLiked.value = true
      // 3秒后重置点赞状态，防止重复点击
      setTimeout(() => {
        isLiked.value = false
      }, 3000)
    }
  }
}

// 分享博客
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
    // 降级到复制链接
    try {
      await navigator.clipboard.writeText(window.location.href)
      alert('链接已复制到剪贴板')
    } catch (error) {
      console.log('复制失败:', error)
    }
  }
}

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 组件挂载时加载数据
onMounted(() => {
  loadBlog()
})
</script>

<style lang="scss" scoped>
.blog-section {
  min-height: 100vh;
  background: #f8f9fa;
  transition: all 0.3s ease;
  padding-top: 100px;
  padding-bottom: 4rem;

  &.dark-mode {
    background: #1a1a1a;
  }
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

// 顶部导航
.blog-nav {
  margin-bottom: 2rem;
}

.back-link {
  background: none;
  border: none;
  color: #666;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
  
  .arrow {
    margin-right: 0.5rem;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: #ED6516;
    
    .arrow {
      transform: translateX(-4px);
    }
  }
}

.dark-mode .back-link {
  color: #aaa;
  &:hover { color: #ff8c42; }
}

// 博客文章容器
.blog-article {
  background: white;
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
  animation: fadeUpIn 0.6s ease-out;
  
  .dark-mode & {
    background: #2d2d2d;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  }
}

// 头部信息
.article-header {
  margin-bottom: 2.5rem;
  text-align: center;
}

.category-tags {
  margin-bottom: 1.5rem;
}

.category-pill {
  background: rgba(237, 101, 22, 0.1);
  color: #ED6516;
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  
  .dark-mode & {
    background: rgba(237, 101, 22, 0.2);
    color: #ff8c42;
  }
}

.article-title {
  font-size: 2.8rem;
  font-weight: 800;
  color: #333;
  margin-bottom: 1.5rem;
  line-height: 1.3;
  
  .dark-mode & {
    color: #e0e0e0;
  }
}

.article-meta {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  color: #999;
  font-size: 0.95rem;
  font-weight: 500;
  
  .meta-left, .meta-right {
    display: flex;
    align-items: center;
  }
  
  .author-name {
    color: #333;
    font-weight: 600;
    
    .dark-mode & { color: #ccc; }
  }
  
  .divider {
    margin: 0 0.5rem;
  }
}

// 特色图片
.article-cover {
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 3rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
}

// 底部标签
.article-tags {
  margin-top: 3rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.tag-hash {
  color: #666;
  background: #f5f5f5;
  padding: 0.3rem 0.8rem;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  
  &:hover {
    color: #ED6516;
    background: rgba(237, 101, 22, 0.1);
  }
  
  .dark-mode & {
    background: #3d3d3d;
    color: #aaa;
    
    &:hover {
      color: #ff8c42;
      background: rgba(237, 101, 22, 0.2);
    }
  }
}

.article-divider {
  border: none;
  height: 1px;
  background: #eee;
  margin: 2.5rem 0;
  
  .dark-mode & { background: #444; }
}

// 操作按钮
.article-actions {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  .icon {
    font-size: 1.2rem;
  }
}

.like-btn {
  background: #fff;
  border: 2px solid #ff4757;
  color: #ff4757;
  
  &:hover {
    background: #fff0f1;
    transform: translateY(-3px);
  }
  
  &.liked {
    background: #ff4757;
    color: white;
  }
  
  .dark-mode & {
    background: transparent;
    
    &:hover { background: rgba(255, 71, 87, 0.1); }
    
    &.liked { background: #ff4757; }
  }
}

.share-btn {
  background: #fff;
  border: 2px solid #ED6516;
  color: #ED6516;
  
  &:hover {
    background: #fff5f0;
    transform: translateY(-3px);
  }
  
  .dark-mode & {
    background: transparent;
    color: #ff8c42;
    border-color: #ff8c42;
    
    &:hover { background: rgba(255, 140, 66, 0.1); }
  }
}

// 正文排版 (Typography)
.rich-content {
  font-size: 1.15rem;
  line-height: 1.9;
  color: #333;
  
  .dark-mode & { color: #d0d0d0; }

  // 标题
  :deep(h2) {
    font-size: 1.8rem;
    font-weight: 700;
    margin: 2.5rem 0 1.2rem;
    color: #222;
    position: relative;
    padding-left: 1rem;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 70%;
      background: #ED6516;
      border-radius: 2px;
    }
    
    .dark-mode & { color: #f0f0f0; }
  }
  
  :deep(h3) {
    font-size: 1.4rem;
    font-weight: 600;
    margin: 2rem 0 1rem;
    color: #444;
    .dark-mode & { color: #ccc; }
  }

  // 段落
  :deep(p) {
    margin-bottom: 1.8rem;
    text-align: justify;
  }

  // 图片
  :deep(img) {
    max-width: 100%;
    height: auto;
    border-radius: 12px;
    margin: 2rem 0;
    box-shadow: 0 5px 20px rgba(0,0,0,0.08);
  }
  
  // 引用
  :deep(blockquote) {
    background: #f9f9f9;
    border-left: 4px solid #ED6516;
    margin: 2rem 0;
    padding: 1.5rem;
    font-style: italic;
    color: #555;
    border-radius: 0 8px 8px 0;
    
    .dark-mode & {
      background: #363636;
      color: #aaa;
    }
  }
  
  // 代码
  :deep(code) {
    background: #f0f0f0;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-family: Consolas, Monaco, monospace;
    font-size: 0.9em;
    color: #e83e8c;
    
    .dark-mode & {
      background: #444;
      color: #ff9fc9;
    }
  }
  
  :deep(pre) {
    background: #282c34;
    padding: 1.5rem;
    border-radius: 12px;
    overflow-x: auto;
    color: #abb2bf;
    margin: 2rem 0;
    
    code {
      background: none;
      color: inherit;
      padding: 0;
    }
  }
  
  // 列表
  :deep(ul), :deep(ol) {
    padding-left: 1.5rem;
    margin-bottom: 2rem;
    
    li {
      margin-bottom: 0.8rem;
      padding-left: 0.5rem;
    }
  }
}

// 动画
@keyframes fadeUpIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

// 加载/错误状态
.loading-container, .error-container, .not-found-container {
  text-align: center;
  padding: 6rem 0;
  color: #666;
  
  .dark-mode & { color: #aaa; }
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(237, 101, 22, 0.2);
  border-top: 4px solid #ED6516;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1.5rem;
}

.error-message {
  color: #ff4757;
  margin-bottom: 1.5rem;
}

.retry-button, .back-button {
  background: #ED6516;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(237, 101, 22, 0.3);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .blog-article {
    padding: 1.5rem;
  }
  
  .article-title {
    font-size: 2rem;
  }
  
  .article-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .rich-content {
    font-size: 1.05rem;
    line-height: 1.7;
    
    :deep(h2) { font-size: 1.5rem; }
    :deep(h3) { font-size: 1.25rem; }
  }
}
</style>

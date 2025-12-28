<template>
  <div class="tutorials-section" :class="{ 'dark-mode': themeStore.isDarkMode }">
    <div class="container">
      <div class="header-group">
        <h1 class="section-title">攻略教程</h1>
        <p class="section-subtitle">从入门到精通，掌握每一个英雄的制胜秘籍</p>
      </div>
      
      <!-- 加载状态 -->
      <div v-if="blogStore.loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>正在加载教程...</p>
      </div>
      
      <!-- 错误状态 -->
      <div v-else-if="blogStore.error" class="error-container">
        <p class="error-message">{{ blogStore.error }}</p>
        <button @click="loadBlogs" class="retry-button">重试</button>
      </div>
      
      <!-- 博客列表 -->
      <div v-else-if="blogStore.blogs.length > 0" class="tutorials-grid">
        <div 
          class="tutorial-card" 
          v-for="(blog, index) in blogStore.blogs" 
          :key="blog.id" 
          @click="openBlog(blog.id)"
          :style="{ '--delay': `${index * 0.1}s` }"
        >
          <div class="card-image-wrapper">
            <img :src="getBlogImage(blog)" :alt="blog.title" class="card-img" loading="lazy">
            <div class="category-badge" v-if="blog.categoryName">{{ blog.categoryName }}</div>
            <div class="card-overlay">
              <span class="view-text">阅读教程</span>
            </div>
          </div>
          
          <div class="card-content">
            <div class="card-meta">
              <span class="date">{{ formatDate(blog.createdAt) }}</span>
              <span class="views" v-if="blog.viewCount">{{ blog.viewCount }} 阅读</span>
            </div>
            
            <h3 class="card-title">{{ blog.title }}</h3>
            <p class="card-excerpt">{{ blog.excerpt || '暂无简介' }}</p>
            
            <div class="card-footer">
              <span class="read-more">阅读全文</span>
              <span class="arrow-icon">→</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 空状态 -->
      <div v-else class="empty-container">
        <div class="empty-icon">📚</div>
        <p>暂无教程内容，敬请期待</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '../stores/theme'
import { useBlogStore } from '../stores/blog'

const themeStore = useThemeStore()
const blogStore = useBlogStore()
const router = useRouter()

// 加载博客数据
const loadBlogs = async () => {
  await blogStore.fetchBlogs({ pageSize: 12 })
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
  loadBlogs()
})
</script>

<style lang="scss" scoped>
.tutorials-section {
  min-height: 100vh;
  background: #f8f9fa;
  transition: all 0.3s ease;
  padding-top: 2rem;

  &.dark-mode {
    background: #1a1a1a;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem 6rem;
}

.header-group {
  text-align: center;
  margin-bottom: 4rem;
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
}

.section-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: #333;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  user-select: none;
  
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 6px;
    background: #ED6516;
    margin: 1rem auto 0;
    border-radius: 3px;
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100px;
  }
}

.section-subtitle {
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.dark-mode .section-title {
  color: #e0e0e0;
}

.dark-mode .section-subtitle {
  color: #aaa;
}

.tutorials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
}

.tutorial-card {
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%; // 确保卡片等高
  opacity: 0;
  animation: fadeUpIn 0.6s ease forwards;
  animation-delay: var(--delay, 0s);
  border: 1px solid rgba(0,0,0,0.03);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(237, 101, 22, 0.15);
    border-color: rgba(237, 101, 22, 0.2);

    .card-img {
      transform: scale(1.08);
    }
    
    .card-overlay {
      opacity: 1;
    }

    .card-title {
      color: #ED6516;
    }

    .arrow-icon {
      transform: translateX(5px);
      opacity: 1;
    }
  }
}

.dark-mode .tutorial-card {
  background: #2a2a2a;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border-color: rgba(255,255,255,0.05);

  &:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    border-color: rgba(237, 101, 22, 0.4);
    
    .card-title {
      color: #ff8c42;
    }
  }
}

.card-image-wrapper {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.category-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(237, 101, 22, 0.9);
  color: #fff;
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
  backdrop-filter: blur(4px);
  z-index: 2;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.view-text {
  color: #fff;
  font-weight: 600;
  border: 2px solid #fff;
  padding: 0.6rem 1.2rem;
  border-radius: 30px;
  letter-spacing: 1px;
}

.card-content {
  padding: 1.8rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #999;
  margin-bottom: 1rem;
  font-weight: 500;
}

.card-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.8rem;
  line-height: 1.4;
  transition: color 0.3s ease;
  
  // 限制行数
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-excerpt {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex: 1;
  
  // 限制行数
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  color: #ED6516;
  font-weight: 600;
  font-size: 0.95rem;
}

.arrow-icon {
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
  opacity: 0.6;
}

.dark-mode {
  .card-title { color: #e0e0e0; }
  .card-excerpt { color: #aaa; }
  .card-footer { 
    border-top-color: #333; 
    color: #ff8c42;
  }
}

// 加载和错误状态样式
.loading-container, .error-container, .empty-container {
  text-align: center;
  padding: 6rem 2rem;
  color: #666;
  
  p {
    margin-top: 1rem;
    font-size: 1.1rem;
  }
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.dark-mode .loading-container,
.dark-mode .error-container,
.dark-mode .empty-container {
  color: #ccc;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(237, 101, 22, 0.2);
  border-top: 4px solid #ED6516;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeUpIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.error-message {
  color: #dc3545;
  margin-bottom: 1.5rem;
}

.retry-button {
  background: #ED6516;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(237, 101, 22, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(237, 101, 22, 0.4);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .container {
    padding: 5rem 1.5rem 3rem;
  }
  
  .section-title {
    font-size: 2.2rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
    padding: 0 1rem;
  }
  
  .tutorials-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .card-image-wrapper {
    height: 200px;
  }
  
  .card-content {
    padding: 1.5rem;
  }
  
  .card-title {
    font-size: 1.3rem;
  }
}
</style>

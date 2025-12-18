<template>
  <div class="navigation-section" :class="{ 'dark-mode': themeStore.isDarkMode, 'christmas-bg': christmasStore.isChristmasMode }">
    <div class="container">
      <div class="header-group" :class="{ 'animate-in': true }">
        <h1 class="section-title">网页导航</h1>
        <p class="section-subtitle">探索更多守望先锋精彩内容与实用工具</p>
      </div>

      <div class="navigation-grid" :class="gridClass">
        <!-- 后续从后端获取 -->
        <div class="nav-card" 
          v-for="(item, index) in navigationDataWithIds" 
          :key="item.id"
          :ref="el => setCardRef(el, index)"
          :class="{ 'animate-in': visibleCards[index] }"
          @click="handleNavigation(item.link)">
          <div class="nav-card-image-wrapper">
            <img :src="item.image" :alt="item.title" class="nav-card-img" loading="lazy">
            <div class="card-overlay">
              <span class="visit-text">访问网站</span>
            </div>
          </div>
          <div class="nav-card-content">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '../stores/theme'
import { useChristmasStore } from '../stores/christmas'
import { useNavigationStore } from '../stores/navigation'

const themeStore = useThemeStore()
const christmasStore = useChristmasStore()
const navigationStore = useNavigationStore()
const router = useRouter()

// 生成唯一ID的函数
const generateId = (prefix, index) => {
  return `${prefix}-${index}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// 为每个导航项生成唯一ID
const navigationDataWithIds = computed(() => {
  return navigationStore.navigationData.map((item, index) => ({
    ...item,
    id: generateId('nav', index)
  }))
})

// 根据项目数量动态设置网格类名
const gridClass = computed(() => {
  const itemCount = navigationDataWithIds.value.length
  const classes = []
  
  if (itemCount === 1) {
    classes.push('single-item')
  } else if (itemCount === 2) {
    classes.push('two-items')
  } else {
    // 检查最后一行是否不完整（不是3的倍数）
    const remainder = itemCount % 3
    if (remainder === 1 || remainder === 2) {
      classes.push('incomplete-last-row')
    }
  }
  
  return classes.join(' ')
})

// 动画相关状态
const visibleCards = ref({})
const cardRefs = ref([])

// 设置卡片引用
const setCardRef = (el, index) => {
  if (el) {
    cardRefs.value[index] = el
  }
}

// Intersection Observer
let observer = null

// 设置 Intersection Observer
const setupObserver = () => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 找到对应的卡片索引
        const cardIndex = cardRefs.value.findIndex(ref => ref === entry.target)
        if (cardIndex !== -1) {
          visibleCards.value[cardIndex] = true
        }
        // 动画触发后停止观察该元素
        observer.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.15, // 稍微降低阈值，让动画更早触发
    rootMargin: '0px 0px -50px 0px'
  })

  // 开始观察所有卡片
  cardRefs.value.forEach(card => {
    if (card) {
      observer.observe(card)
    }
  })
}

onMounted(() => {
  // 延迟设置观察器，确保DOM已渲染
  setTimeout(setupObserver, 100)
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

// 处理导航点击事件
const handleNavigation = (link) => {
  // 创建确认对话框
  const userConfirmed = confirm(`即将跳转到: ${link}\n\n点击"确定"继续，点击"取消"返回`)
  
  if (userConfirmed) {
    // 用户确认后执行跳转逻辑
    performNavigation(link)
  } else {
    // 用户取消，不执行任何操作
    console.log('用户取消了导航')
  }
}

// 执行导航逻辑
const performNavigation = (link) => {
  if (link.startsWith('/')) {
    // 内部路由跳转
    console.log('执行内部路由跳转:', link)
    router.push(link)
  } else if (link.startsWith('http')) {
    // 外部链接跳转
    console.log('执行外部链接跳转:', link)
    window.open(link, '_blank', 'noopener,noreferrer')
  } else {
    // 其他类型的链接
    console.log('未知链接类型:', link)
  }
}
</script>

<style lang="scss" scoped>
.navigation-section {
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

.navigation-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
}

// 当只有1个项目时，居中显示
.navigation-grid:has(.nav-card:only-child) {
  grid-template-columns: 1fr;
  max-width: 450px;
}

// 当只有2个项目时，居中显示
.navigation-grid:has(.nav-card:nth-child(2):last-child) {
  grid-template-columns: repeat(2, 1fr);
  max-width: 900px;
}

// 兼容性方案
.navigation-grid.single-item {
  grid-template-columns: 1fr;
  max-width: 450px;
}

.navigation-grid.two-items {
  grid-template-columns: repeat(2, 1fr);
  max-width: 900px;
}

.navigation-grid.incomplete-last-row {
  justify-content: center;
}

.nav-card {
  background: #fff;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  position: relative;
  border: 1px solid rgba(0,0,0,0.03);
  display: flex;
  flex-direction: column;
  
  // 初始状态：隐藏并向下偏移
  opacity: 0;
  transform: translateY(60px);
  
  // 动画进入状态
  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(237, 101, 22, 0.15); // 使用主题色阴影
    border-color: rgba(237, 101, 22, 0.2);
    
    .nav-card-img {
      transform: scale(1.08);
    }
    
    .card-overlay {
      opacity: 1;
    }
  }
}

.navigation-section.dark-mode .nav-card {
  background: #2a2a2a;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border-color: rgba(255,255,255,0.05);
  
  &:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    border-color: rgba(237, 101, 22, 0.4);
  }
}

.nav-card-image-wrapper {
  position: relative;
  overflow: hidden;
  height: 220px;
  width: 100%;
}

.nav-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
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
  backdrop-filter: blur(2px);
}

.visit-text {
  color: #fff;
  font-weight: 600;
  padding: 0.8rem 1.5rem;
  border: 2px solid #fff;
  border-radius: 50px;
  font-size: 1rem;
  letter-spacing: 1px;
}

// 为动画进入的卡片中的图片添加额外效果
.nav-card.animate-in .nav-card-img {
  animation: imageFloat 0.6s ease-out 0.2s both;
}

.nav-card-content {
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.8rem;
    color: #333;
    transition: color 0.3s ease;
    
    .nav-card:hover & {
      color: #ED6516;
    }
  }

  p {
    color: #666;
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    flex: 1; // 让描述占据剩余空间
  }
}

.navigation-section.dark-mode .nav-card-content {
  h3 {
    color: #e0e0e0;
    
    .nav-card:hover & {
      color: #ff8c42;
    }
  }

  p {
    color: #aaa;
  }
}

// 响应式设计
@media (max-width: 1024px) {
  .navigation-grid {
    grid-template-columns: repeat(2, 1fr);
    max-width: 800px;
  }
  
  .section-title {
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 5rem 1.5rem 3rem;
  }

  .navigation-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .nav-card-image-wrapper {
    height: 200px;
  }

  .nav-card-content {
    padding: 1.5rem;

    h3 {
      font-size: 1.3rem;
    }

    p {
      font-size: 0.95rem;
    }
  }

  .section-title {
    font-size: 2.2rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
  }
}

// 动画关键帧定义
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes imageFloat {
  0% {
    opacity: 0;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>

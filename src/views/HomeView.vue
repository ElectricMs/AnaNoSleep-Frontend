<template>
  <div class="home-section">
    <!-- 主背景区域 -->
    <div class="hero-section" :class="{ 'dark-mode': themeStore.isDarkMode }">
      <div class="hero-background">
        <img src="/src/assets/images/homeview-bg1.jpg" alt="守望先锋背景" class="hero-bg-img">
      </div>
      <div class="hero-content">
        <h1 class="hero-title">在此探索更多守望先锋</h1>
        <div class="hero-buttons">
          <button @click="scrollToContent" class="btn btn-primary">开始访问</button>
          <button @click="viewSource" class="btn btn-secondary">跳转游戏官网</button>
        </div>
      </div>
      <div class="scroll-indicator" @click="scrollToContent">
        <div class="scroll-arrow"></div>
      </div>
    </div>

    <!-- 内容介绍区域 -->
    <div class="content-section" :class="{ 'dark-mode': themeStore.isDarkMode, 'christmas-bg': christmasStore.isChristmasMode }">
      <div class="content-container">
        <!-- 英雄思路教学 -->
        <div class="feature-card clean-style" ref="featureCard1" :class="{ 'animate-in': isVisible1 }">
          <div class="feature-text">
            <h2>英雄思路教学</h2>
            <p>学习英雄对位技巧：压制敌方坦克，阻挡后排，给予巨大压力，劣势对位抗压</p>
            <p>技能释放精进：掌控战场局面，学习关键开团与保护队友，细节做到极致</p>
            <router-link to="/tutorials" class="btn-simple">了解更多</router-link>
          </div>
          <div class="feature-image clean-style">
            <img src="/src/assets/images/hero-tutorial.jpg" alt="英雄教学" class="feature-img" loading="lazy">
          </div>
        </div>
      </div>
    </div>

    <!-- 内容介绍区域2 -->
    <div class="content-section" :class="{ 'dark-mode': themeStore.isDarkMode, 'christmas-bg': christmasStore.isChristmasMode }">
      <div class="content-container">
        <!-- 网页导航 -->
        <div class="feature-card clean-style" ref="featureCard2" :class="{ 'animate-in': isVisible2 }">
          <div class="feature-image clean-style">
            <img src="/src/assets/images/owtics.png" alt="网页导航" class="feature-img" loading="lazy">
          </div>
          <div class="feature-text">
            <h2>网页导航</h2>
            <p>此处收纳了众多中外实用守望先锋相关网站</p>
            <p>覆盖数据详解、角斗领域教程与守望先锋电竞，提供英雄热度查询与电竞选手专访，总有你没见过的</p>
            <router-link to="/navigation" class="btn-simple">了解更多</router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- 内容介绍区域3 -->
    <div class="content-section content-section-final" :class="{ 'dark-mode': themeStore.isDarkMode, 'christmas-bg': christmasStore.isChristmasMode }">
      <div class="content-container">
        <!-- NanKaiGayming -->
        <div class="feature-card clean-style" ref="featureCard3" :class="{ 'animate-in': isVisible3 }">
          <div class="feature-text">
            <h2>NanKaiGayming</h2>
            <p>了解南开大学守望先锋高校战队《NanKaiGayming》的故事</p>
            <p>南开大学守望先锋校队NKG自2023年起参加守望先锋高校联赛、朱诺杯高校赛、owcs预选赛和朱诺杯高校赛等赛事，2025年11月在第二届宿舍英雄天津站中取得冠军。</p>
            <router-link to="/nkg" class="btn-simple">了解更多</router-link>
          </div>
          <div class="feature-image clean-style">
            <img src="/src/assets/images/NanKaiGayming.png" alt="NKG战队" class="feature-img" loading="lazy">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useThemeStore } from '../stores/theme'
import { useChristmasStore } from '../stores/christmas'

const themeStore = useThemeStore()
const christmasStore = useChristmasStore()

// 动画可见性状态
const isVisible1 = ref(false)
const isVisible2 = ref(false)
const isVisible3 = ref(false)

// 元素引用
const featureCard1 = ref(null)
const featureCard2 = ref(null)
const featureCard3 = ref(null)

// Intersection Observer
let observer = null

const scrollToContent = () => {
  const contentSection = document.querySelector('.content-section')
  if (contentSection) {
    contentSection.scrollIntoView({
      behavior: 'smooth'
    })
  }
}

const viewSource = () => {
  window.open('https://ow.blizzard.cn/', '_blank')
}

// 设置 Intersection Observer
const setupObserver = () => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 根据元素引用确定是哪个卡片
        if (entry.target === featureCard1.value) {
          isVisible1.value = true
        } else if (entry.target === featureCard2.value) {
          isVisible2.value = true
        } else if (entry.target === featureCard3.value) {
          isVisible3.value = true
        }
        // 动画触发后停止观察该元素
        observer.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.2, // 当元素20%可见时触发
    rootMargin: '0px 0px -50px 0px' // 提前50px触发
  })

  // 开始观察所有卡片
  if (featureCard1.value) observer.observe(featureCard1.value)
  if (featureCard2.value) observer.observe(featureCard2.value)
  if (featureCard3.value) observer.observe(featureCard3.value)
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
</script>

<style lang="scss" scoped>
.home-section {
  min-height: 100vh;
}

.hero-section {
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  user-select: none; // 禁止文本选择
  cursor: default;   // 鼠标保持默认箭头样式

  &.dark-mode .hero-bg-img {
    filter: brightness(0.4);
  }
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.hero-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7);
  transition: filter 0.3s ease;
}

.hero-content {
  text-align: center;
  z-index: 2;
  max-width: 800px;
  padding: 0 2rem;
}

.hero-title {
  font-size: 4.5rem;
  font-weight: 900;
  font-style: italic;
  color: #fff;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  animation: fadeInUp 1s ease-out;
}

.hero-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  animation: fadeInUp 1s ease-out 0.3s both;
}

.btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  position: relative;
  overflow: hidden;

  &.btn-primary {
    background: linear-gradient(45deg, #ED6516, #ED6516);
    color: #fff;
    box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(255, 107, 53, 0.6);
    }
  }

  &.btn-secondary {
    background: transparent;
    color: #fff;
    border: 2px solid #fff;

    &:hover {
      background: #fff;
      color: #333;
      transform: translateY(-3px);
    }
  }

  &.btn-outline {
    background: transparent;
    color: #ED6516;
    border: 2px solid #ED6516;
    margin-top: 1rem;

    &:hover {
      background: #ED6516;
      color: #fff;
      transform: translateY(-2px);
    }
    
    // 为动画进入的卡片中的按钮添加效果
    .feature-card.animate-in & {
      animation: buttonSlideIn 0.2s ease-out 0.5s both;
    }
  }
}

// 简洁风格按钮
.btn-simple {
  display: inline-flex;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: #ED6516;
  text-decoration: none;
  margin-top: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;
  
  &::after {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-left: 0.5rem;
    border-top: 2px solid currentColor;
    border-right: 2px solid currentColor;
    transform: rotate(45deg);
    transition: transform 0.3s ease;
  }
  
  // 底部线条动画效果
  &::before {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #ED6516;
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: #c95612;
    
    &::after {
      transform: translateX(6px);
    }
    
    &::before {
      width: 100%;
    }
  }
  
  // 为动画进入的卡片中的按钮添加效果
  // .feature-card.animate-in & {
  //   animation: buttonSlideIn 0.2s ease-out 0.5s both;
  // }
}

.content-section.dark-mode .btn-simple {
  color: #ff8c42;
  
  &::before {
    background-color: #ff8c42;
  }
  
  &:hover {
    color: #ffa060;
  }
}

@keyframes buttonSlideIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  animation: bounce 2s infinite;
}

.scroll-arrow {
  width: 30px;
  height: 30px;
  border-right: 3px solid #fff;
  border-bottom: 3px solid #fff;
  transform: rotate(45deg);
}

.content-section {
  padding: 3rem 0 0 0;
  background: #f8f9fa;
  transition: all 0.3s ease;

  &.dark-mode {
    background: #2a2a2a;
  }
}

.content-section-final {
  padding: 3rem 0;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.feature-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  padding: 3rem 0; // 移除左右内边距，减少卡片感
  transition: all 0.3s ease;
  
  // 初始状态：隐藏并向下偏移
  // opacity: 0;
  // transform: translateY(60px);
  // transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  // 简洁风格样式
  &.clean-style {
    background: transparent;
    box-shadow: none;
    border: none;
  }
  
  // 动画进入状态
  // &.animate-in {
  //   opacity: 1;
  //   transform: translateY(0);
  // }
  
  // 为不同卡片添加不同的延迟
  &:nth-child(1) {
    transition-delay: 0.1s;
  }
  
  &:nth-child(2) {
    transition-delay: 0.2s;
  }
  
  &:nth-child(3) {
    transition-delay: 0.3s;
  }
}

.content-section.dark-mode .feature-card.clean-style {
  background: transparent;
  box-shadow: none;
}

.feature-text h2 {
  font-size: 2.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 2rem;
  position: relative;
  user-select: none; // 禁止文本选择
  
  // 添加下划线装饰
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background: #ED6516; // 使用主色调
    margin-top: 1rem;
    border-radius: 2px;
  }
  
  // 为动画进入的卡片中的标题添加效果
  // .feature-card.animate-in & {
  //   animation: textSlideIn 0.2s ease-out 0.2s both;
  // }
}

@keyframes textSlideIn {
  0% {
    opacity: 0;
    transform: translateX(-30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.content-section.dark-mode .feature-text h2 {
  color: #e0e0e0;
}

.feature-text p {
  font-size: 1.15rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: #555;
  
  // 为动画进入的卡片中的段落添加效果
  // .feature-card.animate-in & {
  //   animation: textSlideIn 0.2s ease-out 0.3s both;
  // }
  
  // 第二个段落延迟更长
  &:nth-child(3) {
    // .feature-card.animate-in & {
    //   animation-delay: 0.4s;
    // }
  }
}

.content-section.dark-mode .feature-text p {
  color: #ccc;
}

.feature-image {
  position: relative;
  width: 100%;
  // height: 0; // 移除固定宽高比，允许图片自然高度但限制最大高度
  // padding-bottom: 56.25%; 
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &.clean-style {
    // 只有当图片本身没有圆角/阴影时，才给容器加。这里feature-img已经有了，所以容器可以保持干净
    // 或者给容器加装饰性背景
  }
}

.feature-img {
  width: 100%;
  max-width: 500px; // 稍微加大最大宽度
  height: auto;
  border-radius: 20px; // 加大圆角
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15); // 更柔和深邃的阴影
  transition: transform 0.3s ease;
  object-fit: cover;

  &:hover {
    transform: scale(1.02);
  }
}

// 为动画进入的卡片中的图片添加额外效果
// .feature-card.animate-in .feature-img {
//   animation: imageFloat 0.4s ease-out 0.4s both;
// }

@keyframes imageFloat {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

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

@keyframes bounce {

  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateX(-50%) translateY(0);
  }

  40% {
    transform: translateX(-50%) translateY(-10px);
  }

  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .hero-title {
    font-size: 3.2rem;
    padding: 0 1rem;
    line-height: 1.2;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
    margin-top: 2.5rem;
  }

  .btn {
    width: 260px;
    text-align: center;
    padding: 1rem 2rem;
    font-size: 1.1rem;
  }

  .content-container {
    padding: 0 1rem;
  }

  .feature-card {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    padding: 2.5rem 1.5rem;
    margin: 0 0 2rem 0;
    border-radius: 15px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    
    // 确保手机端图片在文字上方
    .feature-image {
      order: 1;
      margin-bottom: 1rem;
    }
    
    .feature-text {
      order: 2;
    }
    
    // 移除导致背景遮挡的 margin
    margin-bottom: 0;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12);
    }
  }

  .feature-text h2 {
    font-size: 1.8rem;
    margin-bottom: 1.2rem;
    line-height: 1.3;
    
    // 移动端下划线居中
    &::after {
      margin: 1rem auto 0;
    }
  }

  .feature-text p {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1.2rem;
  }

  .feature-text {
    text-align: center;
  }

  .btn {
    margin: 1.5rem auto 0 auto;
    display: block;
  }

  .feature-img {
    max-width: 320px;
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  .content-section {
    padding: 2.5rem 0 0 0;
  }

  .content-section-final {
    padding: 2.5rem 0 3rem 0;
  }
}

// 小屏幕优化
@media (max-width: 480px) {
  .hero-title {
    font-size: 2.2rem;
    padding: 0 0.5rem;
  }

  .feature-card {
    padding: 2rem 1rem;
    gap: 2rem;
    border-radius: 12px;
    margin: 0 0 1.5rem 0;
    
    // 确保小屏幕图片在文字上方
    .feature-image {
      order: 1;
    }
    
    .feature-text {
      order: 2;
    }
    
    // 移除导致背景遮挡的 margin
    margin-bottom: 0;
  }

  .feature-text h2 {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }

  .feature-text p {
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 1rem;
  }

  .feature-text {
    text-align: center;
  }

  .btn {
    margin: 1.2rem auto 0 auto;
    display: block;
  }

  .feature-img {
    max-width: 280px;
    width: 100%;
  }

  .btn {
    width: 240px;
    padding: 0.9rem 1.8rem;
    font-size: 1.05rem;
  }

  .content-container {
    padding: 0 0.5rem;
  }

  .scroll-arrow {
    width: 40px;
    height: 40px;
    border-right: 4px solid #fff;
    border-bottom: 4px solid #fff;
  }
}
</style>

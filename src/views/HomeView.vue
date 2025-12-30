<template>
  <div class="home-section">
    <!-- 主背景区域 -->
    <div class="hero-section" :class="{ 'dark-mode': themeStore.isDarkMode }">
      <!-- 参考 aliued.com 首屏：深色渐变底 + 浮动媒体卡片 + 居中文案 -->
      <div class="hero-bg" aria-hidden="true"></div>
      <!-- 参考图：背景全屏，但内容区更窄（居中 stage 容器） -->
      <div class="hero-stage">
        <div class="hero-media-wall" aria-hidden="true">
          <div class="hero-main-card">
            <img src="/src/assets/images/homeview-bg1.jpg" alt="" class="hero-card-img">
          </div>

          <div class="hero-float-card hero-float-card--md c1">
            <img src="/src/assets/images/kirimercy.jpg" alt="" class="hero-card-img">
          </div>

          <div class="hero-float-card hero-float-card--md c2">
            <img src="/src/assets/images/route66.jpg" alt="" class="hero-card-img">
           </div>
          
          <div class="hero-float-card hero-float-card--sm c4">
            <img src="/src/assets/images/kirimercy2.jpg" alt="" class="hero-card-img">
          </div>

          <div class="hero-float-card hero-float-card--sm c5">
            <img src="/src/assets/images/kiriko.jpg" alt="" class="hero-card-img">
          </div>

          <div class="hero-float-card hero-float-card--main c6">
            <img src="/src/assets/images/overlab.png" alt="" class="hero-card-img">
          </div>

          <div class="hero-float-card hero-float-card--sm c7">
            <img src="/src/assets/images/owtv.png" alt="" class="hero-card-img">
          </div>

          <div class="hero-float-card hero-float-card--sm c8">
            <img src="/src/assets/images/patch-notes.png" alt="" class="hero-card-img">
          </div>

          <div class="hero-float-card hero-float-card--md c9">
            <img src="/src/assets/images/stadiumbuilds.png" alt="" class="hero-card-img">
          </div>

          <div class="hero-float-card hero-float-card--sm c10">
            <img src="/src/assets/images/liquipedia.png" alt="" class="hero-card-img">
          </div>
        </div>
        <div class="hero-content">
          <h1 class="hero-title"><span class="hero-title-accent">ANANOSLEEP</span>.COM</h1>
          <p class="hero-subtitle">在此探索更多守望先锋</p>

        </div>
        <div class="scroll-indicator" @click="scrollToContent">
          <div class="scroll-arrow"></div>
        </div>
      </div>
    </div>

    <!-- 内容介绍区域（参考 aliued.com：窄容器 + 水印大字 + 分区风格） -->
    <div class="content-section ali-block ali-define" :class="{ 'dark-mode': themeStore.isDarkMode }" data-watermark="TUTORIALS">
      <div class="content-container">
        <!-- 英雄思路教学 -->
        <div class="feature-card clean-style" ref="featureCard1" :class="{ 'animate-in': isVisible1 }">
          <div class="feature-text">
            <h2>英雄思路教学</h2>
            <p>学习英雄对位技巧：压制敌方坦克，阻挡后排，给予巨大压力，劣势对位抗压</p>
            <p>技能释放精进：掌控战场局面，学习关键开团与保护队友，细节做到极致</p>
            <router-link to="/tutorials" class="btn-simple">了解更多</router-link>
          </div>
          <div class="ali-pillars" aria-label="内容入口">
            <div class="ali-pillar ali-pillar--accent">
              <div class="ali-pillar-title">Guides</div>
              <div class="ali-pillar-sub">基础到进阶</div>
            </div>
            <div class="ali-pillar ali-pillar--dark">
              <div class="ali-pillar-title">Matchups</div>
              <div class="ali-pillar-sub">对位思路</div>
            </div>
            <div class="ali-pillar ali-pillar--accent">
              <div class="ali-pillar-title">Skills</div>
              <div class="ali-pillar-sub">技能细节</div>
            </div>
            <div class="ali-pillar ali-pillar--img">
              <img src="/src/assets/images/hero-tutorial.jpg" alt="英雄教学" loading="lazy">
              <div class="ali-pillar-mask"></div>
              <div class="ali-pillar-title">Practice</div>
              <div class="ali-pillar-sub">训练计划</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 内容介绍区域2 -->
    <div class="content-section ali-block ali-create" :class="{ 'dark-mode': themeStore.isDarkMode }" data-watermark="NAVIGATIONS">
      <div class="content-container">
        <!-- 网页导航 -->
        <div class="feature-card clean-style" ref="featureCard2" :class="{ 'animate-in': isVisible2 }">
          <div class="feature-text">
            <h2>网页导航</h2>
            <p>此处收纳了众多中外实用守望先锋相关网站</p>
            <p>覆盖数据详解、角斗领域教程与守望先锋电竞，提供英雄热度查询与电竞选手专访，总有你没见过的</p>
            <router-link to="/navigation" class="btn-simple">了解更多</router-link>
          </div>
          <div class="ali-ux-cards" aria-label="导航入口">
            <div class="ali-ux-card ali-ux-card--dark">
              <div class="ali-ux-card-title">For Newbie</div>
              <div class="ali-ux-card-sub">新手入门</div>
              <img src="/src/assets/images/wiki.png" alt="资料百科" loading="lazy">
            </div>
            <div class="ali-ux-card ali-ux-card--light">
              <div class="ali-ux-card-title">For Advanced</div>
              <div class="ali-ux-card-sub">进阶提升</div>
              <img src="/src/assets/images/owtics.png" alt="网页导航" loading="lazy">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 内容介绍区域3 -->
    <div class="content-section ali-block ali-guide content-section-final" :class="{ 'dark-mode': themeStore.isDarkMode }" data-watermark="NKGSTORY">
      <div class="content-container">
        <!-- NanKaiGayming -->
        <div class="feature-card clean-style" ref="featureCard3" :class="{ 'animate-in': isVisible3 }">
          <div class="feature-text">
            <h2>NanKaiGayming</h2>
            <p>了解南开大学守望先锋高校战队《NanKaiGayming》的故事</p>
            <p>南开大学守望先锋校队NKG自2023年起参加守望先锋高校联赛、朱诺杯高校赛、owcs预选赛和朱诺杯高校赛等赛事，2025年11月在第二届宿舍英雄天津站中取得冠军。</p>
            <router-link to="/nkg" class="btn-simple">了解更多</router-link>
          </div>
          <div class="ali-grid" aria-label="内容卡片">
            <div class="ali-grid-card ali-grid-card--img">
              <img src="/src/assets/images/NanKaiGayming.png" alt="NKG 战队" loading="lazy">
              <div class="ali-grid-card-title">Team</div>
            </div>
            <div class="ali-grid-card ali-grid-card--img">
              <img src="/src/assets/images/NKG_Real.jpg" alt="NKG 合照" loading="lazy">
              <div class="ali-grid-card-title">Moments</div>
            </div>
            <div class="ali-grid-card ali-grid-card--solid">
              <div class="ali-grid-card-title">100+</div>
              <div class="ali-grid-card-sub">故事片段</div>
            </div>
            <div class="ali-grid-card ali-grid-card--solid2">
              <div class="ali-grid-card-title">4</div>
              <div class="ali-grid-card-sub">赛事赛季</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useThemeStore } from '../stores/theme'

const themeStore = useThemeStore()

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
  // 参考图：首屏占据大半屏，而不是整屏
  height: clamp(520px, 65vh, 760px);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  user-select: none; // 禁止文本选择
  cursor: default;   // 鼠标保持默认箭头样式
}

.hero-stage {
  position: relative;
  /* aliued 风格：舞台宽度固定，不随视口缩放；视口变窄只减少两侧留白，继续变窄则裁切 */
  width: 1180px;
  min-width: 1180px; // 关键：禁止被 flex 压缩
  flex: 0 0 1180px;  // 关键：作为 flex item 固定占位，不参与收缩
  height: 100%;
  margin: 0 auto;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background:
    radial-gradient(900px 420px at 28% 40%, rgba(138, 92, 255, 0.38) 0%, rgba(138, 92, 255, 0) 65%),
    radial-gradient(780px 380px at 72% 35%, rgba(255, 122, 74, 0.22) 0%, rgba(255, 122, 74, 0) 65%),
    radial-gradient(520px 320px at 62% 78%, rgba(0, 210, 255, 0.14) 0%, rgba(0, 210, 255, 0) 70%),
    linear-gradient(180deg, #0b061a 0%, #0e0a26 40%, #06050f 100%);
}

.hero-media-wall {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  // 参考 aliued：定版尺寸（不随视口宽度缩放）
  --card-main-w: 200px;
  --card-main-h: 120px;
  --card-md-w: 150px;
  --card-md-h: 90px;
  --card-sm-w: 80px;
  --card-sm-h: 80px;
}

.hero-main-card,
.hero-float-card {
  position: absolute;
  border-radius: 14px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow:
    0 18px 50px rgba(0, 0, 0, 0.55),
    0 0 0 1px rgba(0, 0, 0, 0.12) inset;
  backdrop-filter: blur(6px);
  transform: translateZ(0);
  will-change: transform, opacity, filter;
}

.hero-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: saturate(1.05) contrast(1.05) brightness(0.92);
}

/* 不改变卡片尺寸，仅放大图片（会在卡片内裁切） */
.hero-float-card.c4 .hero-card-img {
  //transform: scale(1.4);
  transform-origin: center;
}

// 主卡片：在标题左侧，尺寸更大（参考 aliued.com 首屏左侧媒体块）
.hero-main-card {
  width: var(--card-main-w);
  height: var(--card-main-h);
  left: 90px;
  top: 200px;
  --base-transform: translateY(-50%);
  --enter-x: 260px;
  --enter-y: 0px;
  --float-x: 0px;
  --float-y: 10px;
  --float-duration: 6s;
  --target-opacity: 1;
  opacity: var(--target-opacity);
  transform: translate(0px, 0px) scale(1) var(--base-transform) translateZ(0);
  animation:
    heroCardIn 900ms cubic-bezier(0.2, 0.8, 0.2, 1) 0ms both,
    heroCardFloat var(--float-duration) ease-in-out 900ms infinite;
}

// 浮动卡片：围绕内容，营造“媒体墙”氛围
.hero-float-card {
  // 默认给中等尺寸（具体用 --md/--sm/--main 控制）
  width: var(--card-md-w);
  height: var(--card-md-h);
  --target-opacity: 0.75;
  opacity: var(--target-opacity);
  --enter-x: 0px;
  --enter-y: 0px;
  --float-x: 0px;
  --float-y: 10px;
  --float-duration: 8s;
  // 动画在各个卡片位里分别定义，避免覆盖不同的 rotate/定位
  transform: translate(0px, 0px) scale(1) var(--base-transform) translateZ(0);
  animation:
    heroCardIn 900ms cubic-bezier(0.2, 0.8, 0.2, 1) 0ms both,
    heroCardFloat var(--float-duration) ease-in-out 900ms infinite;
}

.hero-float-card--md {
  width: var(--card-md-w);
  height: var(--card-md-h);
}

.hero-float-card--sm {
  width: var(--card-sm-w);
  height: var(--card-sm-h);
  //--target-opacity: 0.68;
}

// 与主卡片同尺寸（“目前最大的尺寸不变”，主卡片保持原值，这张提升到同级）
.hero-float-card--main {
  width: var(--card-main-w);
  height: var(--card-main-h);
  //--target-opacity: 0.62;
}

.hero-float-card.c1 {
  left: 20px;
  top: 350px;
  --base-transform: translate(0px, 0px);
  --enter-x: 220px;
  --enter-y: 160px;
  --float-y: 10px;
  --float-duration: 8s;
}
.hero-float-card.c2 {
  left: 240px;
  top: 320px;
  --base-transform: translate(0px, 0px);
  --enter-x: -220px;
  --enter-y: 160px;
  --float-y: 12px;
  --float-duration: 7.5s;
}
.hero-float-card.c4 {
  left: 420px;
  top: 430px;
  --base-transform: translate(0px, 0px);
  --enter-x: 200px;
  --enter-y: -160px;
  --float-y: 11px;
  --float-duration: 10s;
}

.hero-float-card.c5 {
  left: 370px;
  top: 100px;
  --base-transform: translate(0px, 0px);
  //--target-opacity: 0.55;
  --enter-x: 0px;
  --enter-y: 140px;
  --float-y: 10px;
  --float-duration: 8.6s;
}

.hero-float-card.c6 {
  left: 800px;
  top: 350px;
  --base-transform: translateY(-50%);
  --enter-x: -260px;
  --enter-y: 0px;
  --float-x: -6px;
  --float-y: 0px;
  --float-duration: 9.4s;
}

.hero-float-card.c7 {
  left: 720px;
  top: 380px;
  --base-transform: translateX(-50%);
  //--target-opacity: 0.58;
  --enter-x: -200px;
  --enter-y: -160px;
  --float-y: 12px;
  --float-duration: 10.2s;
}

.hero-float-card.c8 {
  left: 1030px;
  top: 420px;
  --base-transform: translate(0px, 0px);
  --enter-x: -180px;
  --enter-y: 140px;
  --float-y: 10px;
  --float-duration: 8.2s;
}

.hero-float-card.c9 {
  left: 960px;
  top: 180px;
  --base-transform: translate(0px, 0px);
  --enter-x: -220px;
  --enter-y: 80px;
  --float-y: 12px;
  --float-duration: 9.1s;
}

.hero-float-card.c10 {
  left: 850px;
  top: 120px;
  --base-transform: translate(0px, 0px);
  --enter-x: 0px;
  --enter-y: 160px;
  --float-y: 9px;
  --float-duration: 7.9s;
}

.hero-content {
  text-align: center;
  z-index: 2;
  width: 800px;      // 定版宽度，避免舞台被压缩时内容重新排版
  max-width: 800px;
  padding: 0;
}

.hero-title {
  /* aliued 风格：桌面端标题定版，不随视口宽度缩放 */
  font-size: 60px;
  font-weight: 900;
  //font-family: "Times New Roman", Times, Georgia, serif;
  color: #fff;
  margin-bottom: 1rem;
  //letter-spacing: 0.03em;
  text-shadow: 0 12px 40px rgba(0, 0, 0, 0.65);
  animation: fadeInUp 1s ease-out;
}

.hero-title-accent {
  color: #ED6516;
}

.hero-subtitle {
  /* aliued 风格：桌面端副标题定版，不随视口宽度缩放 */
  font-size: 18px;
  line-height: 1.7;
  color: rgba(255, 255, 255);
  margin: 0 auto 1.4rem;
  max-width: 640px;
  animation: fadeInUp 1s ease-out 0.15s both;
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
    background: linear-gradient(90deg, #7c3aed 0%, #5b21b6 55%, #4c1d95 100%);
    color: #fff;
    box-shadow: 0 10px 30px rgba(124, 58, 237, 0.35);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 14px 40px rgba(124, 58, 237, 0.5);
    }
  }

  &.btn-secondary {
    background: rgba(255, 255, 255, 0.06);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.28);
    backdrop-filter: blur(6px);

    &:hover {
      background: rgba(255, 255, 255, 0.12);
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
  // aliued 风格：定版内容舞台（宽度变化只裁切，不缩放/不重排）
  width: 880px;
  min-width: 880px;
  max-width: 880px;
  margin: 0 auto;
  padding: 0;
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

/* =========================
 * aliued 风格内容区（收窄 + 水印大字 + 分区色块 + 卡片组）
 * ========================= */
.content-section.ali-block {
  position: relative;
  // 高度（纵向留白）更大，接近参考图的“展陈感”
  padding: 7rem 0 3.5rem 0;
  min-height: 560px;
  overflow: hidden;
}

.content-section.ali-block::before {
  content: attr(data-watermark);
  position: absolute;
  left: 50%;
  top: 54%;
  transform: translate(-50%, -50%)scaleY(1.5);
  // 定版水印字号：避免随宽度变化而缩放
  font-size: 180px;
  font-weight: 900;
  letter-spacing: 0.05em;
  color: rgba(0, 0, 0, 0.06);
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
}

.content-section.ali-define {
  background: #f2f2f2;
}

.content-section.ali-create {
  background: linear-gradient(180deg, #ED6516 0%, #f07b30 60%, #f38a45 100%);
}

.content-section.ali-guide {
  /* NKG：整段背景使用紫色 */
  --ali-accent: #711a5f;
  background: var(--ali-accent);
}

.content-section.ali-guide::before {
  color: rgba(255, 255, 255, 0.12);
}

.content-section.ali-create::before {
  color: rgba(255, 255, 255, 0.18);
}

.content-section.ali-create .feature-text h2,
.content-section.ali-create .feature-text p,
.content-section.ali-create .btn-simple {
  color: rgba(255, 255, 255, 0.92);
}

.content-section.ali-create .feature-text h2::after {
  background: rgba(255, 255, 255, 0.8);
}

.content-section.ali-create .btn-simple::before {
  background-color: rgba(255, 255, 255, 0.8);
}

.content-section.ali-create .btn-simple {
  color: rgba(255, 255, 255, 0.95);
}

.content-section.ali-create .btn-simple:hover {
  color: #fff;
}

/* 让卡片更“平面编辑风”，弱化原本大阴影 */
.content-section.ali-block .feature-card {
  padding: 2.2rem 0;
  gap: 2.8rem;
}

.content-section.ali-block .feature-text h2 {
  // 定版字号：避免随宽度变化而缩放
  font-size: 34px;
  margin-bottom: 1.15rem;
}

.content-section.ali-block .feature-text p {
  font-size: 16px;
  line-height: 1.7;
  margin-bottom: 0.95rem;
}

.content-section.ali-block .btn-simple {
  font-size: 16px;
}

/* NKG（紫色底）上的文字/装饰：改为浅色以保持对比 */
.content-section.ali-guide .feature-text h2,
.content-section.ali-guide .feature-text p {
  color: rgba(255, 255, 255, 0.92);
}

.content-section.ali-guide .feature-text h2::after {
  background: rgba(255, 255, 255, 0.85);
}

.content-section.ali-guide .btn-simple {
  color: rgba(255, 255, 255, 0.92);
}

.content-section.ali-guide .btn-simple::before {
  background-color: rgba(255, 255, 255, 0.85);
}

.content-section.ali-guide .btn-simple:hover {
  color: #ffffff;
}

.content-section.ali-block .feature-img {
  box-shadow: none;
  border-radius: 14px;
}

/* Brand: 竖向“书脊”卡片 */
.ali-pillars {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  align-items: stretch;
}

.ali-pillar {
  position: relative;
  height: 280px;
  border-radius: 14px;
  overflow: hidden;
  padding: 18px 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: #fff;
}

.ali-pillar--accent {
  background: linear-gradient(180deg, #ED6516 0%, #ff8a42 100%);
  border-color: rgba(237, 101, 22, 0.25);
}

.ali-pillar--dark {
  background: #151515;
  border-color: rgba(255, 255, 255, 0.08);
}

.ali-pillar--img img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(1.05) saturate(1.05) brightness(0.78);
}

.ali-pillar-mask {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 85%);
}

.ali-pillar-title {
  position: relative;
  z-index: 1;
  font-size: 1rem;
  font-weight: 800;
  color: #111;
}

.ali-pillar-sub {
  position: relative;
  z-index: 1;
  margin-top: 6px;
  font-size: 0.88rem;
  color: rgba(17, 17, 17, 0.75);
}

.ali-pillar--accent .ali-pillar-title,
.ali-pillar--accent .ali-pillar-sub,
.ali-pillar--dark .ali-pillar-title,
.ali-pillar--dark .ali-pillar-sub,
.ali-pillar--img .ali-pillar-title,
.ali-pillar--img .ali-pillar-sub {
  color: rgba(255, 255, 255, 0.92);
}

.ali-pillar--dark .ali-pillar-sub {
  color: rgba(255, 255, 255, 0.7);
}

/* UX: 两张横向入口卡 */
.ali-ux-cards {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  align-items: stretch;
}

.ali-ux-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  min-height: 170px;
  padding: 18px 18px 14px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.ali-ux-card img {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 62%;
  height: 100%;
  object-fit: cover;
  opacity: 0.85;
  filter: contrast(1.05) saturate(1.05) brightness(0.9);
  transform: translateX(8px);
}

.ali-ux-card--dark {
  background: rgba(0, 0, 0, 0.62);
}

.ali-ux-card--light {
  background: rgba(255, 255, 255, 0.92);
  border-color: rgba(0, 0, 0, 0.08);
}

.ali-ux-card-title {
  position: relative;
  z-index: 1;
  font-weight: 900;
  font-size: 1.15rem;
  letter-spacing: -0.01em;
  color: rgba(255, 255, 255, 0.92);
}

.ali-ux-card-sub {
  position: relative;
  z-index: 1;
  margin-top: 6px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.72);
}

.ali-ux-card--light .ali-ux-card-title {
  color: #111;
}
.ali-ux-card--light .ali-ux-card-sub {
  color: rgba(17, 17, 17, 0.7);
}

/* Guide: 拼图卡 */
.ali-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.ali-grid-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  min-height: 170px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #f3f4f6;
}

.ali-grid-card--img img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(1.05) saturate(1.05) brightness(0.9);
}

.ali-grid-card-title {
  position: absolute;
  left: 14px;
  bottom: 12px;
  font-weight: 900;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.92);
  text-shadow: 0 10px 30px rgba(0,0,0,0.55);
}

.ali-grid-card--solid,
.ali-grid-card--solid2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 18px;
}

.ali-grid-card--solid {
  background: #b7ff00;
  border-color: rgba(0,0,0,0.08);
}
.ali-grid-card--solid2 {
  background: #8b5cf6;
  border-color: rgba(0,0,0,0.08);
}

.ali-grid-card--solid .ali-grid-card-title,
.ali-grid-card--solid2 .ali-grid-card-title {
  position: static;
  color: rgba(17, 17, 17, 0.92);
  text-shadow: none;
  font-size: 2.35rem;
  line-height: 1;
}

.ali-grid-card-sub {
  margin-top: 6px;
  font-weight: 700;
  color: rgba(17, 17, 17, 0.7);
}

/* NKG 区块：把数字卡调成紫色体系 */
.content-section.ali-guide .ali-grid-card--solid {
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(255, 255, 255, 0.35);
}

.content-section.ali-guide .ali-grid-card--solid2 {
  background: rgba(255, 255, 255, 0.16);
  border-color: rgba(255, 255, 255, 0.28);
}

.content-section.ali-guide .ali-grid-card--solid2 .ali-grid-card-title,
.content-section.ali-guide .ali-grid-card--solid2 .ali-grid-card-sub {
  color: rgba(255, 255, 255, 0.92);
}

.content-section.ali-guide .ali-grid-card--solid2 .ali-grid-card-sub {
  color: rgba(255, 255, 255, 0.82);
}

.content-section.ali-guide .ali-grid-card--solid .ali-grid-card-title,
.content-section.ali-guide .ali-grid-card--solid .ali-grid-card-sub {
  color: rgba(17, 17, 17, 0.9);
}

/* 注意：为实现“只遮挡、不变位”，此页面不做该区块的响应式重排 */

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

/* 首屏卡片：加载时从中心放射到目标位置（缩放+透明度恢复），结束后进入轻漂浮 */
@keyframes heroCardIn {
  0% {
    opacity: 0;
    filter: blur(6px);
    transform: translate(var(--enter-x), var(--enter-y)) scale(0.65) var(--base-transform) translateZ(0);
  }
  60% {
    opacity: var(--target-opacity, 1);
    filter: blur(0);
    transform: translate(0px, 0px) scale(1.03) var(--base-transform) translateZ(0);
  }
  100% {
    opacity: var(--target-opacity, 1);
    filter: blur(0);
    transform: translate(0px, 0px) scale(1) var(--base-transform) translateZ(0);
  }
}

@keyframes heroCardFloat {
  0%,
  100% {
    transform: translate(0px, 0px) scale(1) var(--base-transform) translateZ(0);
  }
  50% {
    transform: translate(var(--float-x, 0px), calc(-1 * var(--float-y, 10px))) scale(1) var(--base-transform) translateZ(0);
  }
}

@keyframes heroMainFloat {
  0% {
    transform: translateY(-58%);
  }
  50% {
    transform: translateY(-62%);
  }
  100% {
    transform: translateY(-58%);
  }
}

@keyframes floatCard1 {
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}
@keyframes floatCard2 {
  0% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
  100% { transform: translateY(0); }
}
@keyframes floatCard3 {
  0% { transform: translateY(0); }
  50% { transform: translateY(-9px); }
  100% { transform: translateY(0); }
}
@keyframes floatCard4 {
  0% { transform: translateY(0); }
  50% { transform: translateY(-11px); }
  100% { transform: translateY(0); }
}

@keyframes floatCard5 {
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}
@keyframes floatCard6 {
  0% { transform: translateY(-50%) translateX(0); }
  50% { transform: translateY(-50%) translateX(-6px); }
  100% { transform: translateY(-50%) translateX(0); }
}
@keyframes floatCard7 {
  0% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
  100% { transform: translateY(0); }
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
// 注意：为实现“只遮挡、不变位”，此页面不对内容区做 <=768px 的响应式重排

// 小屏幕优化
@media (max-width: 480px) {
  // 注意：为实现“只遮挡、不变位”，此页面不对内容区做 <=480px 的响应式重排

  .scroll-arrow {
    width: 40px;
    height: 40px;
    border-right: 4px solid #fff;
    border-bottom: 4px solid #fff;
  }
}
</style>

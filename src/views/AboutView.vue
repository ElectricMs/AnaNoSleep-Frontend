<template>
  <!--
    AboutView - AnaNoSleep 守望先锋攻略平台关于页面
    语义化 HTML5 结构，包含完整的 SEO 元数据和可访问性支持
  -->
  <div
    class="serif-about"
    :class="{ 'dark-mode': themeStore.isDarkMode }"
    role="main"
    aria-label="关于 AnaNoSleep 平台"
  >
    <!-- Hero Section - 主要介绍区域 -->
    <section
      class="serif-hero-about"
      aria-labelledby="hero-title"
      ref="heroSection"
    >
      <div class="serif-container">
        <!-- Section Label with semantic nav landmark -->
        <nav
          class="serif-section-label-hero"
          aria-label="页面导航"
          ref="sectionLabel"
        >
          <span class="serif-line" aria-hidden="true"></span>
          <span class="serif-label-text">ABOUT</span>
          <span class="serif-line" aria-hidden="true"></span>
        </nav>

        <h1 id="hero-title" class="serif-hero-title">
          关于 AnaNoSleep
        </h1>
        <p class="serif-hero-subtitle">
          <span class="serif-accent-text">AnaNoSleep</span> —
          专为守望先锋玩家打造的专业攻略平台，助力每一位玩家提升竞技水平
        </p>

        <!-- Decorative Rule - 视觉装饰元素 -->
        <div class="serif-hero-rule" aria-hidden="true"></div>
      </div>
    </section>

    <!-- Introduction Section - 平台介绍 -->
    <article
      class="serif-intro-section"
      aria-labelledby="intro-heading"
      ref="introSection"
    >
      <div class="serif-container">
        <div class="serif-intro-content">
          <!-- Opening Quote with blockquote semantics -->
          <blockquote class="serif-quote-opening" cite="https://ananosleep.com">
            <svg
              class="serif-quote-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="48" height="48"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              role="presentation"
            >
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
            </svg>
            <p class="serif-quote-text">
              欢迎来到 <span class="serif-accent-text">AnaNoSleep</span>！
              作为专为守望先锋玩家打造的专业攻略社区，我们深知每个玩家都有独特的成长路径。
              从英雄技能的深度解析到实战对位的精妙策略，从新手入门到进阶技巧，
              我们致力于提供最系统化、最实用的学习资源，
              帮助你在竞技场上展现真正的实力。
            </p>
          </blockquote>

          <!-- Mission Statement -->
          <div class="serif-mission-block" ref="missionBlock">
            <nav
              class="serif-section-label-centered"
              aria-label="使命声明导航"
            >
              <span class="serif-line" aria-hidden="true"></span>
              <span class="serif-label-text">OUR MISSION</span>
              <span class="serif-line" aria-hidden="true"></span>
            </nav>

            <h2 id="intro-heading" class="serif-mission-title">我们的使命与愿景</h2>
            <p class="serif-mission-text">
              通过专业权威的攻略内容和温暖友好的社区氛围，
              让每一位守望先锋玩家都能找到属于自己的成长之路。
              我们相信，技术的精进来自于持续的学习与实践，
              而真正的游戏乐趣在于与志同道合的伙伴共同进步。
              无论你是初入战场的新手，还是追求卓越的资深玩家，
              AnaNoSleep 都是你提升竞技水平的最佳伙伴。
            </p>
          </div>
        </div>
      </div>
    </article>

    <!-- Features Section - 核心功能展示 -->
    <section
      class="serif-features-section"
      aria-labelledby="features-heading"
      ref="featuresSection"
    >
      <div class="serif-container">
        <!-- Section Label -->
        <nav
          class="serif-section-label"
          aria-label="功能特性导航"
          ref="featuresLabel"
        >
          <span class="serif-line" aria-hidden="true"></span>
          <span class="serif-label-text">WHAT WE OFFER</span>
          <span class="serif-line" aria-hidden="true"></span>
        </nav>

        <!-- Features Grid with semantic list -->
        <h2 id="features-heading" class="sr-only">平台核心功能</h2>
        <ul class="serif-features-grid" role="list">
          <li
            v-for="(feature, index) in features"
            :key="feature.id"
            :ref="el => setFeatureRef(el, index)"
          >
            <router-link
              :to="feature.link"
              class="serif-feature-item"
              :aria-label="`访问${feature.title}页面${feature.description}`"
            >
              <div class="serif-feature-icon-wrapper">
                <div
                  class="serif-feature-icon"
                  v-html="feature.icon"
                  :aria-label="`${feature.title}图标`"
                ></div>
              </div>
              <div class="serif-feature-content">
                <h3 class="serif-feature-title">{{ feature.title }}</h3>
                <p class="serif-feature-description">{{ feature.description }}</p>
              </div>
              <div class="serif-feature-arrow" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section
      class="serif-closing-section"
      aria-labelledby="cta-heading"
      ref="ctaSection"
    >
      <div class="serif-container">
        <div class="serif-closing-content">
          <h2 id="cta-heading" class="serif-closing-title">开启你的进阶之旅</h2>
          <p class="serif-closing-text">
            加入 AnaNoSleep 社区，与数千名玩家一起探索守望先锋的无限可能！
          </p>
          <router-link
            to="/tutorials"
            class="serif-btn serif-btn--primary"
            aria-label="浏览教程页面，开始学习"
          >
            浏览教程
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Page Loading Overlay -->
    <Transition name="fade">
      <div
        v-if="isLoading"
        class="page-loading-overlay"
        aria-live="polite"
        aria-label="页面加载中"
      >
        <div class="loading-spinner" aria-hidden="true"></div>
        <span class="loading-text">加载中...</span>
      </div>
    </Transition>
  </div>
</template>

<script setup>
/**
 * AboutView - AnaNoSleep 关于页面
 *
 * 功能特性:
 * - GSAP 滚动动画和过渡效果
 * - 响应式设计和无障碍访问支持
 * - SEO 优化的语义化 HTML
 * - 懒加载和性能优化
 * - 暗色模式兼容
 */

import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useThemeStore } from '../stores/theme'
import { onBeforeRouteLeave } from 'vue-router'

// GSAP 动画库 (已在项目中安装)
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// 注册 GSAP 插件
gsap.registerPlugin(ScrollTrigger)

// 主题 store
const themeStore = useThemeStore()

// 页面加载状态
const isLoading = ref(true)

// 引用各个 DOM 元素用于动画
const heroSection = ref(null)
const sectionLabel = ref(null)
const introSection = ref(null)
const missionBlock = ref(null)
const featuresSection = ref(null)
const featuresLabel = ref(null)
const featureRefs = ref([])
const ctaSection = ref(null)

// 动态设置 feature 引用
const setFeatureRef = (el, index) => {
  if (el) {
    featureRefs.value[index] = el
  }
}

// 优化后的功能数据
const features = ref([
  {
    id: 'tutorials',
    title: '攻略教程',
    description: '深度解析英雄技能机制、对位克制关系和实战策略，助你掌握每个英雄的制胜秘籍',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`,
    link: '/tutorials'
  },
  {
    id: 'navigation',
    title: '精选导航',
    description: '精心筛选的守望先锋资源导航，涵盖数据百科、战术分析平台、进阶教程等专业工具',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1 4 10"></path></svg>`,
    link: '/navigation'
  },
  {
    id: 'nkg-team',
    title: 'NKG 战队',
    description: '探索南开大学守望先锋校队 NanKaiGayming 的传奇故事，见证高校电竞的热血与荣耀征程',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
    link: '/nkg'
  }
])

// SEO 元数据优化 - 手动更新文档标题和元标签
const updateSEOMetadata = () => {
  // 更新页面标题
  document.title = '关于 AnaNoSleep - 守望先锋专业攻略平台'

  // 更新或创建 meta 描述
  let metaDescription = document.querySelector('meta[name="description"]')
  if (!metaDescription) {
    metaDescription = document.createElement('meta')
    metaDescription.setAttribute('name', 'description')
    document.head.appendChild(metaDescription)
  }
  metaDescription.setAttribute('content', 'AnaNoSleep 是专为守望先锋玩家打造的专业攻略平台，提供英雄教程、战术分析、精选导航等核心功能，助力玩家提升竞技水平。')

  // 更新或创建 meta 关键词
  let metaKeywords = document.querySelector('meta[name="keywords"]')
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta')
    metaKeywords.setAttribute('name', 'keywords')
    document.head.appendChild(metaKeywords)
  }
  metaKeywords.setAttribute('content', '守望先锋,Overwatch,攻略教程,英雄指南,战术分析,AnaNoSleep,NKG战队')

  // 更新或创建 Open Graph 标签
  const updateOGMeta = (property, content) => {
    let meta = document.querySelector(`meta[property="${property}"]`)
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('property', property)
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', content)
  }

  updateOGMeta('og:title', '关于 AnaNoSleep - 守望先锋专业攻略平台')
  updateOGMeta('og:description', '探索 AnaNoSleep，获取最专业的守望先锋攻略资源，与社区一起成长进步')
  updateOGMeta('og:type', 'website')

  // 更新或创建 Twitter Card 标签
  let twitterCard = document.querySelector('meta[name="twitter:card"]')
  if (!twitterCard) {
    twitterCard = document.createElement('meta')
    twitterCard.setAttribute('name', 'twitter:card')
    document.head.appendChild(twitterCard)
  }
  twitterCard.setAttribute('content', 'summary_large_image')
}

// 清理 SEO 元数据
const cleanupSEOMetadata = () => {
  document.title = 'AnaNoSleep'

  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', 'AnaNoSleep - 守望先锋综合性攻略平台')
  }
}

// GSAP 动画时间线引用
let animations = []

// 初始化动画
const initAnimations = () => {
  // 等待 DOM 完全渲染
  nextTick(() => {
    // Hero Section 动画
    if (heroSection.value) {
      const heroTimeline = gsap.timeline({
        defaults: { ease: 'power3.out' }
      })

      heroTimeline
        .from(
          sectionLabel.value,
          {
            opacity: 0,
            y: -30,
            duration: 0.8
          }
        )
        .from(
          '.serif-hero-title',
          {
            opacity: 0,
            y: 50,
            duration: 1,
            scale: 0.95
          },
          '-=0.3'
        )
        .from(
          '.serif-hero-subtitle',
          {
            opacity: 0,
            y: 30,
            duration: 0.8
          },
          '-=0.5'
        )
        .from(
          '.serif-hero-rule',
          {
            opacity: 0,
            width: 0,
            duration: 0.6
          },
          '-=0.3'
        )

      animations.push(heroTimeline)
    }

    // Introduction Section 滚动动画
    if (introSection.value) {
      gsap.from('.serif-quote-opening', {
        scrollTrigger: {
          trigger: '.serif-quote-opening',
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power3.out'
      })

      gsap.from('.serif-mission-block', {
        scrollTrigger: {
          trigger: '.serif-mission-block',
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out'
      })
    }

    // Features Section 滚动动画
    if (featuresSection.value) {
      gsap.from('.serif-section-label', {
        scrollTrigger: {
          trigger: '.serif-section-label',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: -20,
        duration: 0.6
      })

      // 功能卡片依次出现
      featureRefs.value.forEach((feature, index) => {
        gsap.from(feature, {
          scrollTrigger: {
            trigger: feature,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          x: -50,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'power3.out'
        })
      })
    }

    // CTA Section 滚动动画
    if (ctaSection.value) {
      const ctaTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.serif-closing-content',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      ctaTimeline
        .from('.serif-closing-title', {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out'
        })
        .from(
          '.serif-closing-text',
          {
            opacity: 0,
            y: 30,
            duration: 0.6
          },
          '-=0.4'
        )
        .from(
          '.serif-btn',
          {
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
            ease: 'back.out(1.7)'
          },
          '-=0.3'
        )

      animations.push(ctaTimeline)
    }
  })
}

// 清理动画资源
const cleanupAnimations = () => {
  // 清理所有 ScrollTrigger 实例
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())

  // 清理所有动画
  animations.forEach(animation => {
    if (animation && animation.kill) {
      animation.kill()
    }
  })

  animations = []
}

// 页面加载完成处理
const handlePageLoad = () => {
  // 模拟加载延迟以展示加载动画
  setTimeout(() => {
    isLoading.value = false
    initAnimations()
  }, 300)
}

// 生命周期钩子
onMounted(() => {
  // 更新 SEO 元数据
  updateSEOMetadata()

  // 初始化主题
  themeStore.initTheme()

  // 处理页面加载
  handlePageLoad()

  // 添加键盘导航支持
  document.addEventListener('keydown', handleKeyboardNavigation)
})

onUnmounted(() => {
  // 清理动画
  cleanupAnimations()

  // 清理 SEO 元数据
  cleanupSEOMetadata()

  // 移除事件监听
  document.removeEventListener('keydown', handleKeyboardNavigation)
})

// 路由离开前清理
onBeforeRouteLeave(() => {
  cleanupAnimations()
  cleanupSEOMetadata()
})

// 键盘导航支持
const handleKeyboardNavigation = (e) => {
  // 支持 Tab 键导航时的视觉反馈
  if (e.key === 'Tab') {
    const focusedElement = document.activeElement
    if (focusedElement) {
      focusedElement.classList.add('keyboard-nav-focus')
      // 移除其他元素的焦点样式
      document.querySelectorAll('.keyboard-nav-focus').forEach(el => {
        if (el !== focusedElement) {
          el.classList.remove('keyboard-nav-focus')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/* ============================================
   SERIF DESIGN SYSTEM - About Styles
   优化版本：包含无障碍访问、动画和性能优化
   ============================================ */

/* 屏幕阅读器专用样式 */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* ============================================
   PAGE LOADING ANIMATION
   ============================================ */
.page-loading-overlay {
  position: fixed;
  inset: 0;
  background: var(--serif-background);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: opacity 0.3s ease;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 3px solid var(--serif-muted);
  border-top-color: var(--serif-accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-text {
  margin-top: 1rem;
  font-family: var(--serif-font-body);
  font-size: 0.875rem;
  color: var(--serif-muted-foreground);
}

/* 加载动画过渡 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ============================================
   MAIN CONTAINER
   ============================================ */
.serif-about {
  min-height: 100vh;
  background: var(--serif-background);
  color: var(--serif-foreground);
  font-family: var(--serif-font-body);
  transition: background 0.3s ease, color 0.3s ease;
  position: relative;
  overflow-x: hidden;

  &.dark-mode {
    background: var(--serif-background);
    color: var(--serif-foreground);
  }

  /* 减少动画运动（尊重用户偏好设置） */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}

.serif-container {
  max-width: var(--serif-container-max);
  margin: 0 auto;
  padding: 0 2rem;
  will-change: auto;
}

/* ============================================
   HERO SECTION
   ============================================ */
.serif-hero-about {
  padding: 4rem 0 4rem 0;
  text-align: center;
  position: relative;

  /* Subtle noise texture - 优化性能使用纯色备用 */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.3;
    pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");

    @media (prefers-reduced-motion: reduce) {
      display: none;
    }
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

  /* 增强颜色对比度 */
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  font-weight: 600;
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
   INTRODUCTION SECTION
   ============================================ */
.serif-intro-section {
  padding: 6rem 0;
}

.serif-intro-content {
  max-width: 720px;
  margin: 0 auto;
}

.serif-quote-opening {
  position: relative;
  padding: 3rem 0;
  margin-bottom: 4rem;

  /* 增强引用块的可读性 */
  border-left: 4px solid var(--serif-accent);
  padding-left: 2rem;
  background: var(--serif-card);
  border-radius: 0 12px 12px 0;
}

.serif-quote-icon {
  position: absolute;
  top: -1rem;
  left: 1rem;
  width: 48px;
  height: 48px;
  color: var(--serif-accent);
  opacity: 0.15;
  background: var(--serif-background);
  border-radius: 50%;
  padding: 8px;
}

.serif-quote-text {
  font-family: var(--serif-font-display);
  font-size: 1.75rem;
  line-height: 1.8;
  color: var(--serif-foreground);
  padding-left: 0;
  margin: 0;

  /* 改善文本可读性 */
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.serif-mission-block {
  position: relative;
  padding: 3rem 0 0 0;
  text-align: center;
}

.serif-section-label-centered {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.serif-mission-title {
  font-family: var(--serif-font-display);
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: var(--serif-foreground);
  margin-bottom: 1.5rem;
  text-align: center;
}

.serif-mission-text {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--serif-muted-foreground);
  margin: 0;
  text-align: center;

  /* 增强段落可读性 */
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* ============================================
   FEATURES SECTION
   ============================================ */
.serif-features-section {
  padding: 6rem 0 8rem 0;
}

.serif-section-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 4rem;
}

.serif-features-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
  list-style: none;
  padding: 0;
  margin: 0;
}

.serif-feature-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 2rem;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 800px;
  padding: 2rem 2.5rem;
  background: var(--serif-card);
  border: 2px solid var(--serif-border);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  /* 键盘焦点样式 */
  &:focus-visible {
    outline: 3px solid var(--serif-accent);
    outline-offset: 2px;
  }

  &:hover {
    transform: translateX(8px);
    border-color: var(--serif-accent);
    box-shadow: 0 8px 24px rgba(184, 134, 11, 0.15);

    .serif-feature-icon {
      transform: scale(1.1);
      background: var(--serif-accent);
      color: var(--serif-accent-foreground);
    }

    .serif-feature-title {
      color: var(--serif-accent);
    }

    .serif-feature-arrow {
      transform: translateX(4px);
      color: var(--serif-accent);
    }
  }

  &:active {
    transform: translateX(4px);
  }

  /* 高对比度模式支持 */
  @media (prefers-contrast: high) {
    border-width: 3px;
  }
}

.serif-feature-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.serif-feature-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--serif-muted);
  border-radius: 12px;
  color: var(--serif-accent);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  svg {
    width: 28px;
    height: 28px;
  }
}

.serif-feature-content {
  flex: 1;
}

.serif-feature-title {
  font-family: var(--serif-font-display);
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--serif-foreground);
  margin-bottom: 0.75rem;
  transition: color 0.3s ease;
}

.serif-feature-description {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--serif-muted-foreground);
  margin: 0;
}

.serif-feature-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--serif-muted-foreground);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

/* ============================================
   CLOSING SECTION
   ============================================ */
.serif-closing-section {
  padding: 6rem 0 8rem 0;
  background: var(--serif-muted);
  position: relative;

  /* Ambient glow - 性能优化 */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, var(--serif-accent) 0%, transparent 70%);
    opacity: 0.05;
    border-radius: 50%;
    pointer-events: none;

    @media (prefers-reduced-motion: reduce) {
      display: none;
    }
  }
}

.serif-closing-content {
  text-align: center;
  position: relative;
  z-index: 2;
}

.serif-closing-title {
  font-family: var(--serif-font-display);
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1.2;
  color: var(--serif-foreground);
  margin-bottom: 1rem;
}

.serif-closing-text {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--serif-muted-foreground);
  margin-bottom: 2.5rem;
}

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
  min-height: 48px; /* 触摸目标最小尺寸 */
  min-width: 44px; /* 触摸目标最小尺寸 */
  position: relative;
  overflow: hidden;
  border: none;

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

    &:hover,
    &:focus {
      background: var(--serif-accent-secondary);
      box-shadow: 0 6px 20px rgba(184, 134, 11, 0.25);
      transform: translateY(-2px);

      &::before {
        opacity: 1;
      }
    }

    &:active {
      transform: translateY(0);
    }

    /* 键盘焦点样式 */
    &:focus-visible {
      outline: 3px solid var(--serif-foreground);
      outline-offset: 2px;
    }
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }
}

/* ============================================
   ACCESSIBILITY - KEYBOARD NAVIGATION
   ============================================ */
.keyboard-nav-focus {
  outline: 3px solid var(--serif-accent) !important;
  outline-offset: 2px !important;
}

/* ============================================
   RESPONSIVE DESIGN
   ============================================ */
@media (max-width: 1024px) {
  .serif-feature-item {
    grid-template-columns: auto 1fr auto;
    gap: 1.5rem;
    padding: 1.5rem 2rem;
  }

  .serif-feature-arrow {
    width: 36px;
    height: 36px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
}

@media (max-width: 768px) {
  .serif-container {
    padding: 0 1.5rem;
  }

  .serif-hero-about {
    padding: 4rem 0 3rem 0;
  }

  .serif-section-label-hero {
    margin-bottom: 2rem;
    gap: 1rem;

    .serif-line {
      max-width: 60px;
    }
  }

  .serif-section-label,
  .serif-section-label-centered {
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

  .serif-intro-section,
  .serif-features-section,
  .serif-closing-section {
    padding: 4rem 0 6rem 0;
  }

  .serif-quote-text {
    font-size: 1.35rem;
    padding-left: 0;
  }

  .serif-quote-icon {
    position: relative;
    margin-bottom: 1rem;
  }

  .serif-mission-title {
    font-size: 2rem;
  }

  .serif-feature-item {
    grid-template-columns: auto 1fr auto;
    gap: 1rem;
    padding: 1.5rem 1.5rem;
  }

  .serif-feature-arrow {
    width: 32px;
    height: 32px;

    svg {
      width: 16px;
      height: 16px;
    }
  }

  .serif-feature-icon {
    width: 48px;
    height: 48px;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  .serif-feature-title {
    font-size: 1.25rem;
  }

  .serif-feature-description {
    font-size: 0.95rem;
  }

  .serif-closing-title {
    font-size: 2rem;
  }

  .serif-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .serif-hero-title {
    font-size: 2rem;
  }

  .serif-quote-text {
    font-size: 1.15rem;
  }

  .serif-mission-title {
    font-size: 1.75rem;
  }

  .serif-feature-item {
    grid-template-columns: 1fr auto;
    gap: 1rem;
    padding: 1.25rem 1rem;
  }

  .serif-feature-icon-wrapper {
    grid-column: 2;
    grid-row: 1;
  }

  .serif-feature-arrow {
    grid-column: 2;
    grid-row: 2;
  }

  .serif-feature-content {
    grid-column: 1;
    grid-row: 1 / span 2;
  }
}

/* ============================================
   DARK MODE ENHANCEMENTS
   ============================================ */
.serif-about.dark-mode {
  .serif-feature-icon {
    background: var(--serif-muted);
  }

  .serif-hero-title {
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  .serif-quote-opening {
    background: rgba(255, 255, 255, 0.03);
  }
}

/* ============================================
   PERFORMANCE OPTIMIZATIONS
   ============================================ */
/* GPU 加速 */
.serif-feature-item,
.serif-btn,
.loading-spinner {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

/* 内容可见性优化 */
.serif-feature-item,
.serif-btn {
  content-visibility: auto;
  contain-intrinsic-size: auto 150px;
}

/* 减少重绘 */
.serif-hero-about,
.serif-closing-section {
  will-change: auto;
}

/* 打印样式 */
@media print {
  .page-loading-overlay,
  .serif-feature-arrow {
    display: none;
  }

  .serif-about {
    background: white;
    color: black;
  }

  .serif-feature-item {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}
</style>

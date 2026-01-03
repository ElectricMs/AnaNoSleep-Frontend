<template>
  <div class="serif-about" :class="{ 'dark-mode': themeStore.isDarkMode }">
    <!-- Hero Section -->
    <section class="serif-hero-about">
      <div class="serif-container">
        <!-- Section Label -->
        <div class="serif-section-label-hero">
          <span class="serif-line"></span>
          <span class="serif-label-text">ABOUT</span>
          <span class="serif-line"></span>
        </div>

        <h1 class="serif-hero-title">关于我们</h1>
        <p class="serif-hero-subtitle">
          <span class="serif-accent-text">AnaNoSleep</span> —
          专为守望先锋玩家打造的综合性攻略平台
        </p>

        <!-- Decorative Rule -->
        <div class="serif-hero-rule"></div>
      </div>
    </section>

    <!-- Introduction Section -->
    <section class="serif-intro-section">
      <div class="serif-container">
        <div class="serif-intro-content">
          <!-- Opening Quote -->
          <div class="serif-quote-opening">
            <svg class="serif-quote-icon" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
            </svg>
            <p class="serif-quote-text">
              欢迎来到 <span class="serif-accent-text">AnaNoSleep</span>！
              这里是专为守望先锋玩家打造的综合性攻略平台。
              我们致力于为玩家提供最全面、最实用的游戏攻略和教程，
              帮助每一位玩家提升游戏技巧，享受更好的游戏体验。
            </p>
          </div>

          <!-- Mission Statement -->
          <div class="serif-mission-block">
            <div class="serif-section-label-centered">
              <span class="serif-line"></span>
              <span class="serif-label-text">OUR MISSION</span>
              <span class="serif-line"></span>
            </div>

            <h2 class="serif-mission-title">我们的使命</h2>
            <p class="serif-mission-text">
              通过专业的攻略内容和友好的社区环境，帮助玩家从新手成长为高手，
              让每个人都能在守望先锋的世界中找到属于自己的乐趣。
              无论你是刚接触游戏的新玩家，还是希望进一步提升技术的老玩家，
              这里都有适合你的内容。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="serif-features-section">
      <div class="serif-container">
        <!-- Section Label -->
        <div class="serif-section-label">
          <span class="serif-line"></span>
          <span class="serif-label-text">WHAT WE OFFER</span>
          <span class="serif-line"></span>
        </div>

        <!-- Features Grid -->
        <div class="serif-features-grid">
          <router-link
            :to="feature.link"
            class="serif-feature-item"
            v-for="(feature, index) in features"
            :key="index"
          >
            <div class="serif-feature-icon-wrapper">
              <div class="serif-feature-icon" v-html="feature.icon"></div>
            </div>
            <div class="serif-feature-content">
              <h3 class="serif-feature-title">{{ feature.title }}</h3>
              <p class="serif-feature-description">{{ feature.description }}</p>
            </div>
            <div class="serif-feature-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Closing Section -->
    <section class="serif-closing-section">
      <div class="serif-container">
        <div class="serif-closing-content">
          <h2 class="serif-closing-title">开始探索</h2>
          <p class="serif-closing-text">
            加入我们，一起探索守望先锋的精彩世界！
          </p>
          <router-link to="/tutorials" class="serif-btn serif-btn--primary">
            浏览教程
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useThemeStore } from '../stores/theme'

const themeStore = useThemeStore()

const features = ref([
  {
    title: '攻略教程',
    description: '详细的英雄技能解析、对位技巧和实战策略，助你掌握每一个英雄的制胜秘籍',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`,
    link: '/tutorials'
  },
  {
    title: '网页导航',
    description: '精选守望先锋相关网站导航，涵盖数据百科、分析平台、进阶教程等丰富资源',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1 4 10"></path></svg>`,
    link: '/navigation'
  },
  {
    title: 'NKG 战队',
    description: '探索南开大学守望先锋校队 NanKaiGayming 的故事，见证高校电竞的热血与荣耀',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
    link: '/nkg'
  }
])
</script>

<style lang="scss" scoped>
/* ============================================
   SERIF DESIGN SYSTEM - About Styles
   ============================================ */

.serif-about {
  min-height: 100vh;
  background: var(--serif-background);
  color: var(--serif-foreground);
  font-family: var(--serif-font-body);
  transition: background 0.3s ease, color 0.3s ease;
  //padding-top: 60px;

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
.serif-hero-about {
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
}

.serif-quote-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 48px;
  height: 48px;
  color: var(--serif-accent);
  opacity: 0.2;
}

.serif-quote-text {
  font-family: var(--serif-font-display);
  font-size: 1.75rem;
  line-height: 1.8;
  color: var(--serif-foreground);
  padding-left: 4rem;
  margin: 0;
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
  border: 1px solid var(--serif-border);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

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

  /* Ambient glow */
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
    border: none;
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

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }
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

/* Dark Mode Enhancements */
.serif-about.dark-mode {
  .serif-feature-icon {
    background: var(--serif-muted);
  }
}
</style>

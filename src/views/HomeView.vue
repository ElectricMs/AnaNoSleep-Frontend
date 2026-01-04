<template>
  <div class="serif-home" :class="{ 'dark-mode': themeStore.isDarkMode }">
    <!-- Hero Section - Dramatic Serif Typography -->
    <section class="serif-hero" :class="{ 'is-entered': heroEntered }">
      <div class="serif-container">
        <div class="serif-hero-stage">
          <!-- Floating Photos -->
          <div class="serif-floating-gallery" aria-hidden="true">
            <div
              v-for="(img, idx) in heroFloatImages"
              :key="img.src"
              class="serif-float-card"
              :class="`serif-float-card--${idx + 1}`"
            >
              <img :src="img.src" :alt="img.alt" loading="lazy" />
            </div>
          </div>

          <!-- Center Panel -->
          <div class="serif-hero-content serif-hero-panel">
            <div class="serif-label">OVERWATCH GUIDES</div>
            <h1 class="serif-title">
              ANANOSLEEP<span class="serif-period">.</span>COM
            </h1>
            <p class="serif-subtitle">
              在这里探索更多Overwatch
            </p>
            <div class="serif-actions">
              <a href="#home-main" class="serif-btn serif-btn--primary">
                开始探索
              </a>
              <a
                href="https://ow.blizzard.cn/"
                target="_blank"
                rel="noopener noreferrer"
                class="serif-btn serif-btn--outline"
              >
                跳转官网
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content Surface -->
    <div id="home-main" class="serif-main">
    <!-- Section 1: 英雄教学 - Asymmetric Layout -->
    <section class="serif-section serif-section--tutorials">
      <div class="serif-container">
        <!-- Section Label -->
        <div class="serif-section-label">
          <span class="serif-line"></span>
          <span class="serif-label-stack">
            <span class="serif-label-text">WE DEFINE</span>
            <span class="serif-label-subtext">HERO STRATEGY FRAMEWORK</span>
          </span>
          <span class="serif-line"></span>
        </div>

        <!-- Asymmetric Content Grid -->
        <div class="serif-grid-serif">
          <div class="serif-content-main">
            <h2 class="serif-section-title">英雄策略规范</h2>
            <p class="serif-section-description">
              我们尝试建立一套完善优质的入门教学体系，系统性学习对位技巧、技能细节和实战训练，从基础到进阶的完整教学体系。
              <span class="serif-section-description-en">
                A complete learning system—from fundamentals to advanced play—covering matchups, mechanics, and real-match practice.
              </span>
            </p>

            <div class="serif-features">
              <div class="serif-feature-item">
                <div class="serif-feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                </div>
                <div class="serif-feature-content">
                  <h3>对位技巧</h3>
                  <p>压制敌方坦克，阻挡后排，劣势对位抗压</p>
                </div>
              </div>

              <div class="serif-feature-item">
                <div class="serif-feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <div class="serif-feature-content">
                  <h3>技能精进</h3>
                  <p>掌控战场局面，关键开团与保护队友</p>
                </div>
              </div>

              <div class="serif-feature-item">
                <div class="serif-feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div class="serif-feature-content">
                  <h3>实战训练</h3>
                  <p>从理论到实践，完整的训练计划体系</p>
                </div>
              </div>
            </div>

            <router-link to="/tutorials" class="serif-link serif-link--arrow">
              了解英雄教学
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </router-link>
          </div>

          <div class="serif-cards-side">
            <div class="serif-card serif-card--accent-top serif-card--photo-bg-1">
              <div class="serif-card-stat">100+</div>
              <div class="serif-card-label">对位解析</div>
            </div>
            <div class="serif-card serif-card--accent-top serif-card--photo-bg-2">
              <div class="serif-card-stat">50+</div>
              <div class="serif-card-label">技能教学</div>
            </div>
            <div class="serif-card serif-card--accent-top serif-card--photo-bg-3">
              <div class="serif-card-stat">20+</div>
              <div class="serif-card-label">英雄指南</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: 网页导航 - Featured Cards -->
    <section class="serif-section serif-section--navigation">
      <div class="serif-container">
        <!-- Section Label -->
        <div class="serif-section-label">
          <span class="serif-line"></span>
          <span class="serif-label-stack">
            <span class="serif-label-text">WE CREATE</span>
            <span class="serif-label-subtext">CURATED RESOURCE NAVIGATION</span>
          </span>
          <span class="serif-line"></span>
        </div>

        <div class="serif-grid-serif serif-grid-serif--nav">
          <div class="serif-content-main serif-nav-main">
            <h2 class="serif-section-title">网页导航系统</h2>
            <p class="serif-section-description">
              提供强大的信息收集与整合能力。本站收纳众多中外实用守望先锋相关网站，覆盖数据详解、角斗领域教程与电竞选手专访，提供英雄热度查询与专业数据分析。
              <span class="serif-section-description-en">
                A curated directory of essential Overwatch sites—stats, guides, interviews, and meta insights in one place.
              </span>
            </p>

            <router-link to="/navigation" class="serif-link serif-link--arrow">
              探索导航资源
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </router-link>
          </div>

          <div class="serif-nav-aside">
            <div class="serif-highlights">
              <div class="serif-highlight">
                <div class="serif-highlight-number">01</div>
                <div class="serif-highlight-text">
                  <h4>资料百科</h4>
                  <p>新手入门必备资料</p>
                </div>
              </div>
              <div class="serif-highlight">
                <div class="serif-highlight-number">02</div>
                <div class="serif-highlight-text">
                  <h4>数据分析</h4>
                  <p>英雄热度与战局统计</p>
                </div>
              </div>
              <div class="serif-highlight">
                <div class="serif-highlight-number">03</div>
                <div class="serif-highlight-text">
                  <h4>进阶教程</h4>
                  <p>角斗领域深度解析</p>
                </div>
              </div>
            </div>
          </div>

          <div class="serif-nav-gallery">
            <div class="serif-featured-card" @click="navigateToNavigation">
              <img src="/src/assets/images/wiki.png" alt="资料百科" class="serif-featured-img">
              <div class="serif-featured-overlay">
                <span class="serif-featured-tag">新手入门</span>
                <h3 class="serif-featured-title">资料百科</h3>
                <div class="serif-featured-subtitle">BEGINNER WIKI</div>
              </div>
            </div>
            <div class="serif-featured-card" @click="navigateToNavigation">
              <img src="/src/assets/images/owtics.png" alt="数据分析" class="serif-featured-img">
              <div class="serif-featured-overlay">
                <span class="serif-featured-tag">进阶提升</span>
                <h3 class="serif-featured-title">数据平台</h3>
                <div class="serif-featured-subtitle">STATS & INSIGHTS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: NKG战队 - Stats & Story -->
    <section class="serif-section serif-section--nkg">
      <div class="serif-container">
        <!-- Section Label -->
        <div class="serif-section-label">
          <span class="serif-line"></span>
          <span class="serif-label-stack">
            <span class="serif-label-text">WE LEAD</span>
            <span class="serif-label-subtext">TEAM STORY & ACHIEVEMENTS</span>
          </span>
          <span class="serif-line"></span>
        </div>

        <div class="serif-grid-serif">
          <div class="serif-content-main">
            <h2 class="serif-section-title">NanKaiGayming</h2>
            <p class="serif-section-description">
              当一个故事快要结束的时候，我们总会想到他的开始。
              南开大学守望先锋高校战队，自2023年起参加守望先锋高校联赛、朱诺杯高校赛、OWCS预选赛等多项赛事。
              <span class="serif-section-description-en">
                A collegiate Overwatch team from Nankai University, competing since 2023 across major tournaments and qualifiers.
              </span>
            </p>

            <div class="serif-quote">
              <svg class="serif-quote-mark" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
              </svg>
              <p class="serif-quote-text">
                2025年11月，NKG战队在第二届宿舍英雄天津站中取得冠军，展现锋芒。
              </p>
            </div>

            <router-link to="/nkg" class="serif-link serif-link--arrow">
              了解战队故事
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </router-link>
          </div>

          <div class="serif-stats-side">
            <div class="serif-stats-grid">
              <div class="serif-stat-card">
                <div class="serif-stat-value">60+</div>
                <div class="serif-stat-label">正赛经历</div>
                <div class="serif-stat-label-en">OFFICIAL MATCHES</div>
              </div>
              <div class="serif-stat-card">
                <div class="serif-stat-value">7+</div>
                <div class="serif-stat-label">赛事赛季</div>
                <div class="serif-stat-label-en">SEASONS</div>
              </div>
              <div class="serif-stat-card">
                <div class="serif-stat-value">17</div>
                <div class="serif-stat-label">战队成员</div>
                <div class="serif-stat-label-en">MEMBERS</div>
              </div>
              <div class="serif-stat-card serif-stat-card--primary">
                <div class="serif-stat-value">1</div>
                <div class="serif-stat-label">赛事冠军</div>
                <div class="serif-stat-label-en">CHAMPION</div>
              </div>
              <div class="serif-stat-card serif-stat-card--full">
                <img src="/src/assets/images/champ.webp" alt="NKG Team" class="serif-stat-img">
                <div class="serif-stat-overlay">
                  <span>Team Moments</span>
                </div>
              </div>
              <!--
              <div class="serif-stat-card serif-stat-card--full">
                <img src="/src/assets/images/NKG_Real.jpg" alt="NKG Photo" class="serif-stat-img">
                <div class="serif-stat-overlay">
                  <span>Team Photo</span>
                </div>
              </div>
            -->
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '../stores/theme'

const themeStore = useThemeStore()
const router = useRouter()
const heroEntered = ref(false)
const imagesLoaded = ref(false)

// 导航到网页导航页面
const navigateToNavigation = () => {
  router.push('/navigation')
}

// 图片路径配置 - 使用 new URL 确保构建时包含所有图片
const imagePaths = {
  // 卡片背景图 - 立即加载(首屏可见)
  cardBgs: [
    new URL('../assets/images/family.webp', import.meta.url).href,
    new URL('../assets/images/vendetta.webp', import.meta.url).href,
    new URL('../assets/images/wuyang.webp', import.meta.url).href
  ],
  // 浮动图片 - 使用 new URL 确保被 Vite 构建系统检测到
  floatImages: [
    { src: new URL('../assets/images/display/junodva.jpg', import.meta.url).href, alt: 'Juno & D.Va' },
    { src: new URL('../assets/images/display/daotian.jpg', import.meta.url).href, alt: 'Daotian' },
    { src: new URL('../assets/images/display/luciecho.jpg', import.meta.url).href, alt: 'Lucio & Echo' },
    { src: new URL('../assets/images/display/route66.jpg', import.meta.url).href, alt: 'Route 66' },
    { src: new URL('../assets/images/display/ram.jpg', import.meta.url).href, alt: 'Ramattra' },
    { src: new URL('../assets/images/display/homeview-bg1.jpg', import.meta.url).href, alt: 'Home Background' },
    { src: new URL('../assets/images/display/kiriko.jpg', import.meta.url).href, alt: 'Kiriko' },
    { src: new URL('../assets/images/display/kiriko2.jpg', import.meta.url).href, alt: 'Kiriko (Alt)' },
    { src: new URL('../assets/images/display/kirimercy.jpg', import.meta.url).href, alt: 'Kiriko & Mercy' },
    { src: new URL('../assets/images/display/kirimercy2.jpg', import.meta.url).href, alt: 'Kiriko & Mercy (Alt)' }
  ]
}

// 浮动图片数组 - 初始为空,通过懒加载填充
const heroFloatImages = ref([])

// 懒加载图片
const lazyLoadImages = () => {
  // 首屏加载后延迟200ms再加载装饰性图片
  setTimeout(() => {
    // 先加载图片到数组
    heroFloatImages.value = imagePaths.floatImages.map((img, index) => ({
      src: img.src, // 已经在 imagePaths 中使用 new URL 处理过了
      alt: img.alt,
      // 给每张图片一个延迟,避免同时加载
      delay: index * 100
    }))

    // 等待 DOM 更新后，再触发动画
    // 这样确保图片已经渲染到 DOM 上
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        imagesLoaded.value = true
        heroEntered.value = true
      })
    })
  }, 200)
}

onMounted(() => {
  // 立即设置CSS变量(首屏需要的背景图)
  document.documentElement.style.setProperty('--card-bg-1', `url('${imagePaths.cardBgs[0]}')`)
  document.documentElement.style.setProperty('--card-bg-2', `url('${imagePaths.cardBgs[1]}')`)
  document.documentElement.style.setProperty('--card-bg-3', `url('${imagePaths.cardBgs[2]}')`)

  // 懒加载装饰性图片，图片加载完成后触发动画
  lazyLoadImages()
})

onUnmounted(() => {
})
</script>

<style lang="scss" scoped>
/* ============================================
   SERIF DESIGN SYSTEM - HomeView Styles
   ============================================ */

.serif-home {
  min-height: 100vh;
  background: var(--serif-background);
  color: var(--serif-foreground);
  font-family: var(--serif-font-body);
  transition: background 0.3s ease, color 0.3s ease;
  position: relative;
  /* 桌面端宽度变窄时：不压缩内容，直接裁切两侧 */
  overflow-x: hidden;

  /* 全局纸纹理叠加层 - 30% 不透明度 */
  &::before {
    content: '';
    position: fixed;
    inset: 0;
    opacity: 0.08; /* 降低全局材质感，避免正文区域“脏/糙” */
    pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='global-noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23global-noise)'/%3E%3C/svg%3E");
    z-index: 9999;
  }

  &.dark-mode {
    background: var(--serif-background);
    color: var(--serif-foreground);

    /* 深色模式下的纹理稍微淡一些 */
    &::before {
      opacity: 0.06;
    }
  }
}

/* Container */
.serif-container {
  /* 桌面端固定宽度：视口变窄时不缩放/不挤压，改为被裁切；<=768px 再切换移动端 */
  width: var(--serif-container-max);
  max-width: none;
  margin: 0 auto;
  /* 收紧容器的上下留白（主要用于正文 sections），横向保持舒适边距 */
  padding: 0rem 2rem;
}

.serif-main {
  position: relative;
  z-index: 2;
  scroll-margin-top: calc(var(--app-navbar-height, 60px) + 16px);
  /* 正文用“暖灰纸面”来和 Hero 深色舞台拉开差异 */
  background:
    radial-gradient(900px circle at 12% -10%, rgba(184, 134, 11, 0.08), transparent 55%),
    radial-gradient(900px circle at 88% 0%, rgba(26, 26, 26, 0.04), transparent 60%),
    linear-gradient(180deg, #F5F3F0 0%, #FAFAF8 55%, #FAFAF8 100%);
  border-top: 1px solid var(--serif-border);
  box-shadow: 0 -1px 0 rgba(26, 26, 26, 0.06);

  /* 让“材质”更优雅：只在正文内加很淡的噪点，而不是全局强噪点 */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.06;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper-noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper-noise)'/%3E%3C/svg%3E");
  }
}

/* ============================================
   HERO SECTION - Editorial Elegance
   ============================================ */
.serif-hero {
  /* 局部覆盖 token：让 Hero 变成深色舞台，正文保持浅色 */
  --serif-foreground: #FAFAF8;
  --serif-muted-foreground: rgba(250, 250, 248, 0.72);
  --serif-border: rgba(250, 250, 248, 0.14);
  --serif-card: rgba(255, 255, 255, 0.08);
  --serif-muted: rgba(255, 255, 255, 0.06);

  /* 标题区域高度：更克制（更小） */
  min-height: calc(44vh + var(--app-navbar-height, 60px));
  display: flex;
  align-items: center;
  padding: calc(3.5rem + var(--app-navbar-height, 60px)) 0 2.5rem 0;
  position: relative;
  margin-top: calc(var(--app-navbar-height, 60px) * -1);
  color: var(--serif-foreground);
  background:
    radial-gradient(900px circle at 18% 20%, rgba(184, 134, 11, 0.18), transparent 60%),
    radial-gradient(1000px circle at 82% 30%, rgba(113, 26, 95, 0.22), transparent 62%),
    linear-gradient(180deg, #070710 0%, #120b2a 55%, #0b0b14 100%);

  /* Paper texture overlay - 30% opacity for print quality */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.18;
    pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    z-index: 1;
  }

  /* Ambient glow - 2% opacity for atmospheric depth */
  &::after {
    content: '';
    position: absolute;
    top: 15%;
    right: 8%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, var(--serif-accent) 0%, transparent 70%);
    opacity: 0.06;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
  }
}

.serif-hero-stage {
  position: relative;
  min-height: calc(44vh + var(--app-navbar-height, 60px));
  display: grid;
  align-items: center;
  justify-items: center;
}

.serif-floating-gallery {
  position: absolute;
  inset: -2rem 0 -2rem 0;
  z-index: 1;
  pointer-events: none;
}

.serif-float-card {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 220px;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(250, 250, 248, 0.14);
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  filter: saturate(1.05) contrast(1.02);
  --rot: 0deg;
  --x: 0px;
  --y: 0px;
  --scatter-delay: 0ms;
  --float-dur: 7.5s;
  --alpha: 1;
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) rotate(0deg) scale(0.2);
  transition:
    transform 1100ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 1100ms cubic-bezier(0.22, 0.8, 0.2, 1);
  transition-delay: var(--scatter-delay);

  img {
    display: block;
    width: 100%;
    height: 150px;
    object-fit: cover;
    opacity: 0.92;
  }
}

@keyframes serifFloatCard {
  0% {
    transform: translate3d(calc(-50% + var(--x)), calc(-50% + var(--y)), 0) rotate(var(--rot)) scale(1);
  }
  50% {
    transform: translate3d(calc(-50% + var(--x)), calc(-50% + var(--y) - 14px), 0) rotate(var(--rot)) scale(1);
  }
  100% {
    transform: translate3d(calc(-50% + var(--x)), calc(-50% + var(--y)), 0) rotate(var(--rot)) scale(1);
  }
}

.serif-hero.is-entered .serif-float-card {
  opacity: var(--alpha);
  transform: translate3d(calc(-50% + var(--x)), calc(-50% + var(--y)), 0) rotate(var(--rot)) scale(1);
  animation: serifFloatCard var(--float-dur) ease-in-out infinite;
  animation-delay: calc(var(--scatter-delay) + 1100ms);
}

.serif-float-card--1 {
  width: 240px;
  --rot: -6deg;
  --x: -520px;
  --y: -100px;
  --scatter-delay: 0ms;
  --float-dur: 8.2s;
}

.serif-float-card--2 {
  width: 190px;
  --rot: 4deg;
  --x: -240px;
  --y: -170px;
  --scatter-delay: 80ms;
  --float-dur: 7.4s;
  --alpha: 0.9;
}

.serif-float-card--3 {
  width: 260px;
  --rot: 6deg;
  --x: 680px;
  --y: 180px;
  --scatter-delay: 140ms;
  --float-dur: 9s;
}

.serif-float-card--4 {
  width: 200px;
  --rot: -3deg;
  --x: 200px;
  --y: 220px;
  --scatter-delay: 220ms;
  --float-dur: 7.2s;
  --alpha: 0.88;
}

.serif-float-card--5 {
  width: 210px;
  --rot: 3deg;
  --x: 390px;
  --y: 30px;
  --scatter-delay: 300ms;
  --float-dur: 8.8s;
  --alpha: 0.86;
}

.serif-float-card--6 {
  width: 260px;
  --rot: -5deg;
  --x: -420px;
  --y: 120px;
  --scatter-delay: 360ms;
  --float-dur: 9.4s;
  --alpha: 0.9;
}

.serif-float-card--7 {
  width: 160px;
  --rot: -8deg;
  --x: -680px;
  --y: 120px;
  --scatter-delay: 120ms;
  --float-dur: 8.6s;
  --alpha: 0.75;
}

.serif-float-card--8 {
  width: 190px;
  --rot: 8deg;
  --x: 650px;
  --y: -70px;
  --scatter-delay: 180ms;
  --float-dur: 9.2s;
  --alpha: 0.75;
}

.serif-float-card--9 {
  width: 280px;
  --rot: 10deg;
  --x: 400px;
  --y: -160px;
  --scatter-delay: 260ms;
  --float-dur: 7.8s;
  --alpha: 0.7;
}

.serif-float-card--10 {
  width: 160px;
  --rot: -10deg;
  --x: -740px;
  --y: -180px;
  --scatter-delay: 200ms;
  --float-dur: 7.6s;
  --alpha: 0.7;
}

@media (prefers-reduced-motion: reduce) {
  .serif-float-card {
    transition: none;
    animation: none !important;
    opacity: var(--alpha);
    transform: translate3d(calc(-50% + var(--x)), calc(-50% + var(--y)), 0) rotate(var(--rot)) scale(1);
  }
}

.serif-hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 680px;
  margin: 0 auto;

  /* 添加装饰性细线 */
  &::after {
    content: '';
    position: absolute;
    bottom: -1.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: var(--serif-accent);
    opacity: 0.3;
  }
}

.serif-hero-panel {
  /* 去掉面板背景：让文字“浮”在舞台上，图片围绕 */
  padding: 1.25rem 0 1.75rem;
  border-radius: 0;
  border: none;
  background: transparent;
  backdrop-filter: none;
  box-shadow: none;
}

.serif-label {
  font-family: var(--serif-font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--serif-accent);
  margin-bottom: 1.5rem;
}

.serif-title {
  font-family: var(--serif-font-display);
  /* 桌面端固定字号，避免随宽度缩小 */
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--serif-foreground);
  margin-bottom: 2rem;
}

.serif-period {
  color: var(--serif-accent);
}

.serif-subtitle {
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--serif-muted-foreground);
  margin-bottom: 3rem;
  letter-spacing: 0.01em;
}

.serif-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.serif-actions--section {
  justify-content: flex-start;
}

/* Buttons - Restrained Elegance */
.serif-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  font-family: var(--serif-font-body);
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-decoration: none;
  border-radius: 6px; /* 更符合 Serif 风格的较小圆角 */
  transition: all 200ms ease-out; /* 200ms 克制过渡 */
  min-height: 48px;
  position: relative;
  overflow: hidden;
  touch-action: manipulation; /* 更好的触摸响应 */

  /* Subtle background gradient */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.1) 100%);
    opacity: 0;
    transition: opacity 200ms ease;
  }

  &.serif-btn--primary {
    background: var(--serif-accent);
    color: var(--serif-accent-foreground);
    border: none;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);

    &:hover {
      background: var(--serif-accent-secondary);
      box-shadow: 0 4px 12px rgba(184, 134, 11, 0.15);
      transform: translateY(-1px); /* 克制的微小提升 */

      &::before {
        opacity: 1;
      }
    }

    &:active {
      transform: translateY(0); /* 点击时返回 */
    }
  }

  &.serif-btn--outline {
    background: transparent;
    color: var(--serif-foreground);
    border: 1px solid var(--serif-foreground); /* 1px 细边框 */

    &:hover {
      background: var(--serif-muted);
      border-color: var(--serif-accent);
      color: var(--serif-accent);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
    }
  }
}

/* Hero Images - Editorial Layout */
.serif-hero-images {
  display: none;
}

.serif-image-card {
  position: absolute;
  border-radius: 8px; /* 更小的圆角更优雅 */
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08); /* 更克制的阴影 */
  border: 1px solid var(--serif-border);
  transition: all 200ms ease-out; /* 200ms 克制过渡 */

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter 200ms ease; /* 只改变滤镜，不改变 transform */
  }

  /* 克制的悬停效果 - 无 translate/lift，只有阴影和背景色调变化 */
  &:hover {
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12); /* 增强阴影 */
    border-color: var(--serif-accent); /* 边框颜色变为金色 */

    /* 背景色调变化 - 使用 ::after 伪元素 */
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at center, rgba(184, 134, 11, 0.03), transparent 70%);
      opacity: 1;
    }
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, rgba(184, 134, 11, 0), transparent 70%);
    opacity: 0;
    transition: opacity 200ms ease;
    pointer-events: none;
  }

  &--main {
    width: 320px;
    height: 240px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) translateZ(20px);
    z-index: 3;
  }

  &--secondary {
    width: 200px;
    height: 150px;
    top: 10%;
    left: 15%;
    transform: rotate(-3deg) translateZ(-20px);
    z-index: 2;
  }

  &--tertiary {
    width: 220px;
    height: 165px;
    bottom: 10%;
    right: 15%;
    transform: rotate(2deg) translateZ(-30px);
    z-index: 2;
  }
}

/* ============================================
   SECTIONS - Generous Whitespace
   ============================================ */
.serif-section {
  padding: 4rem 0; /* 进一步收紧 section 间距 */
  border-top: 1px solid var(--serif-border);
  position: relative;

  /* 为每个 section 添加纸纹理 */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.08; /* 更克制的纹理，避免“脏” */
    pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    z-index: 0;
  }

  > .serif-container {
    position: relative;
    z-index: 1;
  }
}

.serif-section-label {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
}

.serif-line {
  flex: 1;
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

.serif-label-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.serif-label-subtext {
  font-family: var(--serif-font-mono);
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--serif-muted-foreground);
  opacity: 0.9;
  white-space: nowrap;
}

/* Asymmetric Grid */
.serif-grid-serif {
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 4rem;
  align-items: start;
}

.serif-content-main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.serif-section-title {
  font-family: var(--serif-font-display);
  /* 桌面端固定字号，避免随宽度缩小 */
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: var(--serif-foreground);
  margin-bottom: 1rem;
}

.serif-section-description {
  font-size: 1.125rem;
  line-height: 1.75;
  color: var(--serif-muted-foreground);
  letter-spacing: 0.01em;
}

.serif-section-description-en {
  display: block;
  margin-top: 0.9rem;
  font-family: var(--serif-font-mono);
  font-size: 0.8125rem;
  line-height: 1.6;
  letter-spacing: 0.08em;
  color: color-mix(in srgb, var(--serif-muted-foreground) 88%, var(--serif-foreground));
}

/* ============================================
   SECTION 1: TUTORIALS
   ============================================ */
.serif-features {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.serif-feature-item {
  display: flex;
  align-items: start;
  gap: 1.5rem;
}

.serif-feature-icon {
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--serif-muted);
  border-radius: 8px; /* 更小的圆角 */
  color: var(--serif-accent);
  transition: all 200ms ease-out; /* 200ms 克制过渡 */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04); /* 更克制的阴影 */

  svg {
    width: 26px;
    height: 26px;
    /* 移除 svg 的 transform 变换 */
  }
}

/* 克制的悬停效果 - 只改变背景色调和阴影 */
.serif-feature-item:hover .serif-feature-icon {
  background: radial-gradient(circle at center, rgba(184, 134, 11, 0.08), transparent 70%);
  box-shadow: 0 2px 8px rgba(184, 134, 11, 0.12); /* 金色阴影 */
}

.serif-feature-content {
  flex: 1;
}

.serif-feature-content h3 {
  font-family: var(--serif-font-display);
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--serif-foreground);
  margin-bottom: 0.5rem;
}

.serif-feature-content p {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--serif-muted-foreground);
}

.serif-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--serif-font-body);
  font-size: 1rem;
  font-weight: 500;
  color: var(--serif-accent);
  text-decoration: none;
  transition: color 200ms ease-out; /* 只过渡颜色 */
  position: relative;

  /* 添加下划线效果 */
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--serif-accent);
    transition: width 200ms ease-out;
  }

  svg {
    transition: transform 200ms ease-out;
  }

  &:hover {
    color: var(--serif-accent-secondary);

    &::after {
      width: 100%; /* 下划线展开 */
    }

    svg {
      transform: translateX(4px); /* 箭头移动 */
    }
  }
}

/* Side Cards */
.serif-cards-side {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.serif-card {
  background: var(--serif-card);
  border: 1px solid var(--serif-border);
  border-radius: 8px; /* 更小的圆角 */
  padding: 2.5rem 2rem;
  text-align: center;
  transition: all 200ms ease-out; /* 200ms 克制过渡 */
  position: relative;
  overflow: hidden;

  /* 背景色调变化 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at top right, rgba(184, 134, 11, 0.03), transparent 60%);
    opacity: 0;
    transition: opacity 200ms ease;
    pointer-events: none;
  }

  &--accent-top {
    border-top: 2px solid var(--serif-accent); /* 2px 细线更优雅 */
  }

  /* 克制的悬停效果 - 无 translate/lift */
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06); /* 增强阴影 */
    border-color: var(--serif-accent); /* 边框变为金色 */

    &::before {
      opacity: 1; /* 背景色调变化 */
    }
  }
}

/* Side Cards: semi-transparent photo backgrounds */
.serif-card--photo-bg-1::after,
.serif-card--photo-bg-2::after,
.serif-card--photo-bg-3::after {
  content: '';
  position: absolute;
  inset: 0;
  background-position: center;
  background-size: cover;
  opacity: 0.3;
  filter: saturate(1.05) contrast(1.02);
  pointer-events: none;
  z-index: 0;
}

/* readability overlay (keeps text clear) */
.serif-card--photo-bg-1::before,
.serif-card--photo-bg-2::before,
.serif-card--photo-bg-3::before {
  /* override hover-only behavior */
  opacity: 1;
  z-index: 0;
  background: var(--photo-overlay, linear-gradient(
      180deg,
      rgba(250, 250, 248, 0.92) 0%,
      rgba(250, 250, 248, 0.78) 45%,
      rgba(250, 250, 248, 0.62) 100%
    ));
}

.serif-card--photo-bg-1::after {
  background-image: var(--card-bg-1);
}
.serif-card--photo-bg-2::after {
  background-image: var(--card-bg-2);
}
.serif-card--photo-bg-3::after {
  background-image: var(--card-bg-3);
}

/* Text readability on photo cards (light mode) */
.serif-card--photo-bg-1,
.serif-card--photo-bg-2,
.serif-card--photo-bg-3 {
  --photo-overlay: linear-gradient(
      180deg,
      rgba(250, 250, 248, 0.92) 0%,
      rgba(250, 250, 248, 0.78) 45%,
      rgba(250, 250, 248, 0.62) 100%
    ),
    radial-gradient(circle at top right, rgba(184, 134, 11, 0.07), transparent 60%);
}

.serif-card--photo-bg-1 .serif-card-stat,
.serif-card--photo-bg-2 .serif-card-stat,
.serif-card--photo-bg-3 .serif-card-stat {
  color: var(--serif-foreground);
  text-shadow: 0 2px 10px rgba(26, 26, 26, 0.12);
}

.serif-card--photo-bg-1 .serif-card-label,
.serif-card--photo-bg-2 .serif-card-label,
.serif-card--photo-bg-3 .serif-card-label {
  color: color-mix(in srgb, var(--serif-foreground) 88%, var(--serif-muted-foreground));
  text-shadow: 0 2px 10px rgba(26, 26, 26, 0.12);
}

.serif-card-stat {
  font-family: var(--serif-font-display);
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1;
  color: var(--serif-foreground);
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 1;
}

.serif-card-label {
  font-family: var(--serif-font-mono);
  font-size: 0.9rem;
  font-weight: 550;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--serif-muted-foreground);
  position: relative;
  z-index: 1;
}

/* ============================================
   SECTION 2: NAVIGATION
   ============================================ */
.serif-highlights {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.serif-highlight {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.serif-highlight-number {
  font-family: var(--serif-font-display);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--serif-accent);
  opacity: 0.3;
  flex-shrink: 0;
}

.serif-highlight-text h4 {
  font-family: var(--serif-font-display);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--serif-foreground);
  margin-bottom: 0.25rem;
}

.serif-highlight-text p {
  font-size: 1rem;
  color: var(--serif-muted-foreground);
}

/* Featured Images */
.serif-image-side {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.serif-featured-card {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--serif-border);
  aspect-ratio: 16 / 10;
  background: var(--serif-muted);
  transition: all 200ms ease-out; /* 200ms 克制过渡 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04); /* 更克制的阴影 */
  cursor: pointer; /* 鼠标悬停时显示手型光标 */

  /* 克制的悬停效果 */
  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08); /* 增强阴影 */
    border-color: var(--serif-accent); /* 边框变为金色 */
    transform: translateY(-2px); /* 轻微上移效果 */
  }

  /* 顶部金色细线，呼应全站 rule line 系统 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--serif-accent);
    opacity: 0.55;
    z-index: 2;
  }
}

/* 导航区更稳的布局：右侧放 highlights，下方放图片卡（不拉伸、比例可控），同时保持文字列宽与其它 section 一致 */
.serif-grid-serif--nav {
  grid-auto-rows: min-content;
  /* 关键：缩小“第一行(文案/高亮)”到“第二行(图片卡)”之间的行间距 */
  column-gap: 4rem;
  row-gap: 0.75rem;
}

.serif-nav-aside {
  align-self: start;
}

.serif-nav-gallery {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 0;
}

@media (max-width: 768px) {
  .serif-nav-gallery {
    grid-template-columns: 1fr;
  }
}

.serif-featured-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.95);
  transition: filter 200ms ease; /* 只改变滤镜 */
}

.serif-featured-card:hover .serif-featured-img {
  filter: brightness(0.88); /* 克制的亮度变化 */
}

.serif-featured-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.78), transparent 55%);
  transition: all 0.3s ease;
}

.serif-featured-card:hover .serif-featured-overlay {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent 60%);
}

.serif-featured-tag {
  font-family: var(--serif-font-mono);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--serif-accent);
  background: rgba(255, 255, 255, 0.92);
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
  display: inline-block;
  margin-bottom: 0.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
}

.serif-featured-title {
  font-family: var(--serif-font-display);
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.serif-featured-subtitle {
  margin-top: 0.6rem;
  font-family: var(--serif-font-mono);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(250, 250, 248, 0.82);
  opacity: 0.95;
}

/* ============================================
   SECTION 3: NKG
   ============================================ */
.serif-quote {
  position: relative;
  background: var(--serif-muted);
  border-left: 3px solid var(--serif-accent);
  padding: 2rem;
  margin: 1rem 0;
  border-radius: 0 8px 8px 0;
}

.serif-quote-mark {
  position: absolute;
  top: 1rem;
  left: 1rem;
  width: 32px;
  height: 32px;
  color: var(--serif-accent);
  opacity: 0.2;
}

.serif-quote-text {
  font-family: var(--serif-font-display);
  font-size: 1.25rem;
  line-height: 1.6;
  font-style: italic;
  color: var(--serif-foreground);
  padding-left: 2rem;
}

/* Stats Grid */
.serif-stats-side {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.serif-stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.serif-stat-card {
  background: var(--serif-card);
  border: 1px solid var(--serif-border);
  border-radius: 8px; /* 更小的圆角 */
  padding: 1.5rem 1.25rem;
  text-align: center;
  transition: all 200ms ease-out; /* 200ms 克制过渡 */
  position: relative;
  overflow: hidden;

  /* 背景色调变化 */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, rgba(184, 134, 11, 0.04), transparent 70%);
    opacity: 0;
    transition: opacity 200ms ease;
    pointer-events: none;
  }

  &--primary {
    background: color-mix(in srgb, var(--serif-accent) 8%, var(--serif-card));
    border-color: color-mix(in srgb, var(--serif-accent) 65%, var(--serif-border));
    border-width: 1px;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 2px;
      background: var(--serif-accent);
      opacity: 0.9;
    }
  }

  &--full {
    grid-column: span 2;
    padding: 0;
    overflow: hidden;
    aspect-ratio: 16 / 9;
    position: relative;
  }

  /* 克制的悬停效果 */
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06); /* 增强阴影 */

    &::before {
      opacity: 1; /* 背景色调变化 */
    }
  }

  &:not(.serif-stat-card--full) {
    &:hover {
      border-color: var(--serif-accent); /* 边框变为金色 */
    }
  }
}

.serif-stat-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--serif-accent) 65%, var(--serif-border));
  background: color-mix(in srgb, var(--serif-accent) 12%, transparent);
  color: var(--serif-accent);
  font-family: var(--serif-font-mono);
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
  position: relative;
  z-index: 1;
}

.serif-stat-value {
  font-family: var(--serif-font-display);
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1;
  color: var(--serif-foreground);
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 1;
}

.serif-stat-label {
  font-family: var(--serif-font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--serif-muted-foreground);
  position: relative;
  z-index: 1;
}

.serif-stat-label-en {
  margin-top: 0.45rem;
  font-family: var(--serif-font-mono);
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--serif-muted-foreground) 70%, var(--serif-foreground));
  opacity: 0.9;
  position: relative;
  z-index: 1;
}

.serif-stat-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 200ms ease; /* 只改变滤镜 */
  opacity: 0.8;
}

.serif-stat-card--full:hover .serif-stat-img {
  filter: brightness(0.92); /* 克制的亮度变化 */
}

.serif-stat-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.25rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent 60%);
  color: white;
  font-family: var(--serif-font-mono);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.serif-stat-card--full:hover .serif-stat-overlay {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.95), transparent 70%);
  padding: 1.5rem;
}

/* ============================================
   RESPONSIVE DESIGN
   ============================================ */
@media (max-width: 768px) {
  .serif-container {
    width: auto;
    max-width: var(--serif-container-max);
    padding: 0.25rem 1.5rem;
  }

  .serif-hero {
    padding: calc(3rem + var(--app-navbar-height, 80px)) 0 2.25rem 0;
    min-height: calc(44vh + var(--app-navbar-height, 80px));
    margin-top: calc(var(--app-navbar-height, 80px) * -1);
  }

  .serif-title {
    font-size: 2.5rem;
  }

  .serif-subtitle {
    font-size: 1rem;
  }

  .serif-actions {
    flex-direction: column;
    gap: 1rem;
  }

  .serif-btn {
    width: 100%;
    padding: 0.875rem 2rem;
  }

  /* 首页 Section 1（教程）移动端标题与标签居中 */
  .serif-section--tutorials {
    .serif-section-label {
      justify-content: center;
      text-align: center;
    }

    .serif-label-stack {
      align-items: center;
    }

    .serif-section-title {
      text-align: center;
    }
  }

  /* 首页 Section 2（导航）移动端标题与标签居中 */
  .serif-section--navigation {
    .serif-section-label {
      justify-content: center;
      text-align: center;
    }

    .serif-label-stack {
      align-items: center;
    }

    .serif-section-title {
      text-align: center;
    }
  }

  /* 首页 Section 3（NKG）移动端标题与标签居中 */
  .serif-section--nkg {
    .serif-section-label {
      justify-content: center;
      text-align: center;
    }

    .serif-label-stack {
      align-items: center;
    }

    .serif-section-title {
      text-align: center;
    }
  }

  .serif-hero-panel {
    padding: 2.25rem 1.5rem 2.75rem;
  }

  /* 移动端减少浮动图片数量，避免拥挤 */
  .serif-float-card {
    width: 160px;

    img {
      height: 120px;
    }
  }

  .serif-float-card--2,
  .serif-float-card--4,
  .serif-float-card--5 {
    display: none;
  }

  .serif-float-card--7,
  .serif-float-card--8,
  .serif-float-card--9,
  .serif-float-card--10 {
    display: none;
  }

  .serif-float-card--1 {
    --x: -170px;
    --y: -80px;
  }

  .serif-float-card--3 {
    --x: 160px;
    --y: -70px;
  }

  .serif-float-card--6 {
    --x: 50px;
    --y: 120px;
  }

  .serif-section {
    padding: 4.25rem 0;
  }

  .serif-grid-serif {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .serif-stats-grid {
    grid-template-columns: 1fr;
  }

  .serif-stat-card--full {
    grid-column: span 1;
  }

  .serif-section-label {
    margin-bottom: 3rem;
    flex-wrap: wrap;

    .serif-line {
      display: none; /* 移动端隐藏横线，只保留文字 */
    }
  }

  .serif-label-text {
    font-size: 0.625rem;
  }

  .serif-label-subtext {
    font-size: 0.55rem;
    letter-spacing: 0.16em;
    white-space: normal;
    text-align: center;
  }

  .serif-section-description-en {
    font-size: 0.75rem;
    letter-spacing: 0.06em;
  }
}

/* 平板优化 */
/* 移除 769–1024 的“中间态”压缩：桌面端保持固定版式，<=768 直接切换移动端 */

/* Dark Mode Adjustments - Editorial Elegance */
.serif-home.dark-mode {
  /* 正文区域：暗色“纸面”背景，避免沿用浅色渐变导致发灰 */
  .serif-main {
    background:
      radial-gradient(900px circle at 12% -10%, rgba(184, 134, 11, 0.10), transparent 55%),
      radial-gradient(900px circle at 88% 0%, rgba(250, 250, 248, 0.05), transparent 60%),
      linear-gradient(
        180deg,
        color-mix(in srgb, var(--serif-background) 84%, #000) 0%,
        var(--serif-background) 60%,
        var(--serif-background) 100%
      );
    border-top-color: var(--serif-border);
    box-shadow: 0 -1px 0 rgba(250, 250, 248, 0.04);

    &::before {
      opacity: 0.04;
    }
  }

  /* section 纹理更克制，避免暗色下发脏 */
  .serif-section::before {
    opacity: 0.04;
  }

  /* featured tag：去掉亮白底，改为暗底金字 */
  .serif-featured-tag {
    background: rgba(15, 15, 15, 0.72);
    border: 1px solid var(--serif-border);
    box-shadow: none;
  }

  /* 照片背景 side cards：夜间改为暗色遮罩 + 文字更亮 */
  .serif-card--photo-bg-1,
  .serif-card--photo-bg-2,
  .serif-card--photo-bg-3 {
    --photo-overlay: linear-gradient(
        180deg,
        rgba(10, 10, 12, 0.78) 0%,
        rgba(10, 10, 12, 0.62) 55%,
        rgba(10, 10, 12, 0.46) 100%
      ),
      radial-gradient(circle at top right, rgba(184, 134, 11, 0.12), transparent 60%);
  }

  .serif-card--photo-bg-1 .serif-card-stat,
  .serif-card--photo-bg-2 .serif-card-stat,
  .serif-card--photo-bg-3 .serif-card-stat {
    color: rgba(250, 250, 248, 0.95);
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.55);
  }

  .serif-card--photo-bg-1 .serif-card-label,
  .serif-card--photo-bg-2 .serif-card-label,
  .serif-card--photo-bg-3 .serif-card-label {
    color: rgba(250, 250, 248, 0.88);
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.45);
  }

  /* navigation highlights 的大数字暗色下更可见一点 */
  .serif-highlight-number {
    opacity: 0.45;
  }

  /* 确保深色模式下的背景和边框颜色正确 */
  .serif-card,
  .serif-stat-card,
  .serif-featured-card {
    background: var(--serif-card);
    border-color: var(--serif-border);

    &:hover {
      border-color: var(--serif-accent);
    }
  }

  .serif-feature-icon {
    background: var(--serif-muted);
  }

  .serif-quote {
    background: var(--serif-muted);
    border-left-color: var(--serif-accent);
  }

  /* 深色模式下的图片卡片阴影 - 更克制 */
  .serif-image-card,
  .serif-featured-card,
  .serif-card,
  .serif-stat-card {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15); /* 更克制的阴影 */

    &:hover {
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2); /* 微妙增强 */
    }
  }

  /* 深色模式下的 Hero 区域优化 */
  .serif-hero {
    /* 深色模式下的氛围光晕更明显 */
    &::after {
      opacity: 0.03; /* 增加到 3% */
    }
  }
}

/* 深色模式下的按钮优化 */
.serif-home.dark-mode {
  .serif-btn--outline {
    border-color: var(--serif-border);
    color: var(--serif-foreground);

    &:hover {
      background: var(--serif-muted);
      border-color: var(--serif-accent);
      color: var(--serif-accent);
      box-shadow: 0 4px 12px rgba(184, 134, 11, 0.1);
    }
  }
}

/* 深色模式下的链接优化 */
.serif-home.dark-mode {
  .serif-link {
    color: var(--serif-accent);

    &:hover {
      color: var(--serif-accent-secondary);
    }
  }
}

/* 深色模式下的标题优化 */
.serif-home.dark-mode {
  .serif-section-title,
  .serif-title,
  .serif-feature-content h3,
  .serif-highlight-text h4 {
    color: var(--serif-foreground);
  }
}
</style>

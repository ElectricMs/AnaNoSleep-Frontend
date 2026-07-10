<template>
  <div id="home-main" class="serif-main">
    <section class="serif-section serif-section--tutorials">
      <div class="serif-container">
        <div class="serif-section-label">
          <span class="serif-line"></span>
          <span class="serif-label-stack">
            <span class="serif-label-text">WE DEFINE</span>
            <span class="serif-label-subtext">HERO STRATEGY FRAMEWORK</span>
          </span>
          <span class="serif-line"></span>
        </div>

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

          <div ref="cardsPanel" class="serif-cards-side" :style="cardBackgroundStyle">
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

    <section ref="navigationSection" class="serif-section serif-section--navigation">
      <div class="serif-container">
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
                <div class="serif-highlight-text"><h4>资料百科</h4><p>新手入门必备资料</p></div>
              </div>
              <div class="serif-highlight">
                <div class="serif-highlight-number">02</div>
                <div class="serif-highlight-text"><h4>数据分析</h4><p>英雄热度与战局统计</p></div>
              </div>
              <div class="serif-highlight">
                <div class="serif-highlight-number">03</div>
                <div class="serif-highlight-text"><h4>进阶教程</h4><p>角斗领域深度解析</p></div>
              </div>
            </div>
          </div>

          <div class="serif-nav-gallery">
            <div class="serif-featured-card" @click="navigateToNavigation">
              <img v-if="navigationImagesReady" src="/src/assets/images/wiki.png" alt="资料百科" class="serif-featured-img" loading="lazy" decoding="async" fetchpriority="low">
              <div class="serif-featured-overlay">
                <span class="serif-featured-tag">新手入门</span>
                <h3 class="serif-featured-title">资料百科</h3>
                <div class="serif-featured-subtitle">BEGINNER WIKI</div>
              </div>
            </div>
            <div class="serif-featured-card" @click="navigateToNavigation">
              <img v-if="navigationImagesReady" src="/src/assets/images/owtics.png" alt="数据分析" class="serif-featured-img" loading="lazy" decoding="async" fetchpriority="low">
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

    <section ref="nkgSection" class="serif-section serif-section--nkg">
      <div class="serif-container">
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
              <p class="serif-quote-text">2025年11月，NKG战队在第二届宿舍英雄天津站中取得冠军，展现锋芒。</p>
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
              <div class="serif-stat-card"><div class="serif-stat-value">60+</div><div class="serif-stat-label">正赛经历</div><div class="serif-stat-label-en">OFFICIAL MATCHES</div></div>
              <div class="serif-stat-card"><div class="serif-stat-value">7+</div><div class="serif-stat-label">赛事赛季</div><div class="serif-stat-label-en">SEASONS</div></div>
              <div class="serif-stat-card"><div class="serif-stat-value">17</div><div class="serif-stat-label">战队成员</div><div class="serif-stat-label-en">MEMBERS</div></div>
              <div class="serif-stat-card serif-stat-card--primary"><div class="serif-stat-value">1</div><div class="serif-stat-label">赛事冠军</div><div class="serif-stat-label-en">CHAMPION</div></div>
              <div class="serif-stat-card serif-stat-card--full">
                <img v-if="nkgImageReady" src="/src/assets/images/champ.webp" alt="NKG Team" class="serif-stat-img" loading="lazy" decoding="async" fetchpriority="low">
                <div class="serif-stat-overlay"><span>Team Moments</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const cardsPanel = ref(null)
const navigationSection = ref(null)
const nkgSection = ref(null)
const cardBackgroundsReady = ref(false)
const navigationImagesReady = ref(false)
const nkgImageReady = ref(false)
let cardsObserver = null
let deferredImagesObserver = null

const cardBackgrounds = [
  new URL('../../assets/images/family.webp', import.meta.url).href,
  new URL('../../assets/images/vendetta.webp', import.meta.url).href,
  new URL('../../assets/images/wuyang.webp', import.meta.url).href
]

const cardBackgroundStyle = computed(() => cardBackgroundsReady.value
  ? {
      '--card-bg-1': `url('${cardBackgrounds[0]}')`,
      '--card-bg-2': `url('${cardBackgrounds[1]}')`,
      '--card-bg-3': `url('${cardBackgrounds[2]}')`
    }
  : {})

const navigateToNavigation = () => router.push('/navigation')

onMounted(() => {
  if (!('IntersectionObserver' in window)) {
    cardBackgroundsReady.value = true
    navigationImagesReady.value = true
    nkgImageReady.value = true
    return
  }

  cardsObserver = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return
    cardBackgroundsReady.value = true
    cardsObserver?.disconnect()
  }, { rootMargin: '160px 0px' })
  cardsObserver.observe(cardsPanel.value)

  deferredImagesObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      if (entry.target === navigationSection.value) navigationImagesReady.value = true
      if (entry.target === nkgSection.value) nkgImageReady.value = true
      deferredImagesObserver?.unobserve(entry.target)
    }
  }, { rootMargin: '200px 0px' })
  deferredImagesObserver.observe(navigationSection.value)
  deferredImagesObserver.observe(nkgSection.value)
})

onUnmounted(() => {
  cardsObserver?.disconnect()
  deferredImagesObserver?.disconnect()
})
</script>

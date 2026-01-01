<template>
  <div class="serif-navigation" :class="{ 'dark-mode': themeStore.isDarkMode }">
    <!-- Hero Section - Editorial Typography -->
    <section class="serif-hero-navigation">
      <div class="serif-container">
        <!-- Section Label -->
        <div class="serif-section-label-hero">
          <span class="serif-line"></span>
          <span class="serif-label-text">DISCOVER</span>
          <span class="serif-line"></span>
        </div>

        <h1 class="serif-hero-title">网页导航</h1>
        <p class="serif-hero-subtitle">
          探索守望先锋的精彩世界——从数据百科到角斗教程，
          <span class="serif-accent-text">精选资源</span>助你进阶
        </p>

        <!-- Decorative Rule -->
        <div class="serif-hero-rule"></div>
      </div>
    </section>

    <!-- Navigation Rows - Editorial List Layout -->
    <section class="serif-rows-section">
      <div class="serif-container">
        <div class="serif-rows">
          <div
            v-for="(item, index) in navigationDataWithIds"
            :key="item.id"
            :ref="el => setCardRef(el, index)"
            class="serif-nav-row"
            :class="{ 'serif-animate-in': visibleCards[index] }"
            @click="handleNavigation(item.link)"
          >
            <!-- Row Number -->
            <div class="serif-row-number">
              <span class="serif-number-text">{{ String(index + 1).padStart(2, '0') }}</span>
            </div>

            <!-- Row Image -->
            <div class="serif-row-image-wrapper">
              <img
                :src="item.image"
                :alt="item.title"
                class="serif-row-image"
                loading="lazy"
              />
            </div>

            <!-- Row Content -->
            <div class="serif-row-content">
              <!-- Category Label -->
              <span class="serif-row-category">{{ getCategoryLabel(item.category) }}</span>

              <!-- Title -->
              <h3 class="serif-row-title">{{ item.title }}</h3>

              <!-- Description -->
              <p class="serif-row-description">{{ item.description }}</p>
            </div>

            <!-- Row Arrow -->
            <div class="serif-row-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '../stores/theme'
import { useNavigationStore } from '../stores/navigation'

const themeStore = useThemeStore()
const navigationStore = useNavigationStore()
const router = useRouter()

// Generate unique ID
const generateId = (prefix, index) => {
  return `${prefix}-${index}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Add IDs to navigation items
const navigationDataWithIds = computed(() => {
  return navigationStore.navigationData.map((item, index) => ({
    ...item,
    id: generateId('nav', index)
  }))
})

// Dynamic grid class based on item count
const gridClass = computed(() => {
  const itemCount = navigationDataWithIds.value.length
  const classes = []

  if (itemCount === 1) {
    classes.push('serif-grid-single')
  } else if (itemCount === 2) {
    classes.push('serif-grid-two')
  }

  return classes.join(' ')
})

// Animation states
const visibleCards = ref({})
const cardRefs = ref([])

// Set card refs
const setCardRef = (el, index) => {
  if (el) {
    cardRefs.value[index] = el
  }
}

// Intersection Observer
let observer = null

const setupObserver = () => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const cardIndex = cardRefs.value.findIndex(ref => ref === entry.target)
        if (cardIndex !== -1) {
          visibleCards.value[cardIndex] = true
        }
        observer.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  })

  cardRefs.value.forEach(card => {
    if (card) {
      observer.observe(card)
    }
  })
}

// Get category label
const getCategoryLabel = (category) => {
  const labels = {
    'wiki': '资料百科',
    'data': '数据分析',
    'guide': '进阶教程',
    'news': '新闻资讯',
    'community': '社区论坛',
    'tools': '实用工具'
  }
  return labels[category] || '其他资源'
}

// Handle navigation
const handleNavigation = (link) => {
  const userConfirmed = confirm(`即将跳转到: ${link}\n\n点击"确定"继续，点击"取消"返回`)

  if (userConfirmed) {
    performNavigation(link)
  }
}

const performNavigation = (link) => {
  if (link.startsWith('/')) {
    router.push(link)
  } else if (link.startsWith('http')) {
    window.open(link, '_blank', 'noopener,noreferrer')
  }
}

onMounted(() => {
  setTimeout(setupObserver, 100)
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style lang="scss" scoped>
/* ============================================
   SERIF DESIGN SYSTEM - Navigation Styles
   ============================================ */

.serif-navigation {
  min-height: 100vh;
  background: var(--serif-background);
  color: var(--serif-foreground);
  font-family: var(--serif-font-body);
  transition: background 0.3s ease, color 0.3s ease;
  //padding-top: 60px; /* Account for fixed navbar */

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
.serif-hero-navigation {
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

  /* Decorative end marks */
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
   ROWS SECTION - Editorial List Layout
   ============================================ */
.serif-rows-section {
  padding: 4rem 0 8rem 0;
}

.serif-rows {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.serif-nav-row {
  display: grid;
  grid-template-columns: auto 240px 1fr auto;
  gap: 2rem;
  align-items: center;
  background: var(--serif-card);
  border: 1px solid var(--serif-border);
  border-left: 3px solid var(--serif-accent);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;

  /* Animation initial state */
  opacity: 0;
  transform: translateX(-40px);

  &.serif-animate-in {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    transform: translateX(8px);
    border-color: var(--serif-accent);

    .serif-row-image {
      transform: scale(1.05);
    }

    .serif-row-arrow {
      color: var(--serif-accent);
      transform: translateX(4px);
    }

    .serif-row-title {
      color: var(--serif-accent);
    }
  }
}

/* Dark mode row adjustments */
.serif-navigation.dark-mode {
  .serif-nav-row {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

    &:hover {
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }
  }
}

/* Row Number */
.serif-row-number {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--serif-font-display);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--serif-border);
  line-height: 1;
  min-width: 60px;
}

.serif-number-text {
  opacity: 0.3;
  transition: opacity 0.3s ease;
}

.serif-nav-row:hover .serif-number-text {
  opacity: 0.6;
}

/* Row Image */
.serif-row-image-wrapper {
  width: 240px;
  height: 150px;
  border-radius: 8px;
  overflow: hidden;
  background: var(--serif-muted);
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.serif-row-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Row Content */
.serif-row-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 0; /* Prevent flex overflow */
}

.serif-row-category {
  font-family: var(--serif-font-mono);
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--serif-accent);
  display: inline-block;
  align-self: flex-start;
  padding: 0.25rem 0.75rem;
  background: rgba(184, 134, 11, 0.08);
  border-radius: 4px;
}

.serif-row-title {
  font-family: var(--serif-font-display);
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--serif-foreground);
  margin: 0;
  transition: color 0.3s ease;
}

.serif-row-description {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--serif-muted-foreground);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Row Arrow */
.serif-row-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--serif-muted);
  color: var(--serif-muted-foreground);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

.serif-nav-row:hover .serif-row-arrow {
  background: var(--serif-accent);
  color: var(--serif-accent-foreground);
}

/* ============================================
   RESPONSIVE DESIGN
   ============================================ */
@media (max-width: 1200px) {
  .serif-nav-row {
    grid-template-columns: auto 200px 1fr auto;
    gap: 1.5rem;
    padding: 1.5rem;
  }

  .serif-row-image-wrapper {
    width: 200px;
    height: 125px;
  }

  .serif-row-title {
    font-size: 1.5rem;
  }

  .serif-row-number {
    font-size: 2rem;
    min-width: 50px;
  }
}

@media (max-width: 1024px) {
  .serif-nav-row {
    grid-template-columns: auto 180px 1fr auto;
    gap: 1.5rem;
  }

  .serif-row-image-wrapper {
    width: 180px;
    height: 110px;
  }

  .serif-row-title {
    font-size: 1.35rem;
  }

  .serif-hero-title {
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .serif-container {
    padding: 0 1.5rem;
  }

  .serif-hero-navigation {
    padding: 4rem 0 3rem 0;
  }

  .serif-section-label-hero {
    margin-bottom: 2rem;
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

  .serif-rows-section {
    padding: 3rem 0 6rem 0;
  }

  .serif-rows {
    gap: 1.5rem;
  }

  .serif-nav-row {
    grid-template-columns: auto 1fr auto;
    grid-template-areas:
      "number content arrow"
      "image image image";
    gap: 1rem;
    padding: 1.5rem;

    /* Animation from left */
    transform: translateX(-30px);
  }

  .serif-row-number {
    grid-area: number;
    font-size: 1.75rem;
    min-width: 40px;
  }

  .serif-row-image-wrapper {
    grid-area: image;
    width: 100%;
    height: 180px;
    order: 3;
  }

  .serif-row-content {
    grid-area: content;
  }

  .serif-row-arrow {
    grid-area: arrow;
    width: 40px;
    height: 40px;
  }

  .serif-row-title {
    font-size: 1.25rem;
  }

  .serif-row-description {
    font-size: 0.9rem;
    -webkit-line-clamp: 3;
  }
}

/* Dark Mode Enhancements */
.serif-navigation.dark-mode {
  .serif-row-category {
    background: rgba(184, 134, 11, 0.15);
  }

  .serif-row-arrow {
    background: rgba(255, 255, 255, 0.05);
  }

  .serif-nav-row:hover .serif-row-arrow {
    background: var(--serif-accent);
    color: var(--serif-accent-foreground);
  }
}
</style>

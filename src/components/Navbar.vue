<template>
  <nav class="navbar" :class="{ 
    'navbar-scrolled': isScrolled, 
    'dark-mode': themeStore.isDarkMode,
    'non-home-page': !isHomePage,
    'mobile-menu-open': isMobileMenuOpen
  }">
    <div class="nav-container">
      <!-- Brand -->
      <router-link to="/" class="nav-brand" aria-label="AnaNoSleep 首页">
        <img class="nav-brand-logo" src="/logo.png" alt="AnaNoSleep" />
        <span class="nav-brand-text">AnaNoSleep</span>
      </router-link>
      
      <!-- 桌面端导航菜单 -->
      <div class="nav-menu desktop-menu">
        <router-link 
          v-for="route in routes" 
          :key="route.name"
          :to="route.path" 
          class="nav-link"
          :class="{ 
            active: $route.name === route.name,
            'nkg-link': route.name === 'nkg'
          }"
        >
          {{ route.meta.title }}
        </router-link>
      </div>
      
      <div class="nav-toggle">
        <!-- 桌面端主题切换按钮 -->
        <button @click="themeStore.toggleTheme" class="theme-toggle desktop-theme-toggle" :title="themeStore.isDarkMode ? '切换到日间模式' : '切换到夜间模式'">
          <!-- Sun Icon (Show in Dark Mode to switch to Day) -->
          <svg v-if="themeStore.isDarkMode" class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <!-- Moon Icon (Show in Day Mode to switch to Night) -->
          <svg v-else class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>
        
        <!-- 移动端汉堡菜单按钮 -->
        <button @click="toggleMobileMenu" class="mobile-menu-toggle">
          <span class="hamburger-line" :class="{ 'active': isMobileMenuOpen }"></span>
          <span class="hamburger-line" :class="{ 'active': isMobileMenuOpen }"></span>
          <span class="hamburger-line" :class="{ 'active': isMobileMenuOpen }"></span>
        </button>
      </div>
    </div>
    
    <!-- 移动端导航菜单 -->
    <div class="mobile-menu" :class="{ 'active': isMobileMenuOpen }">
      <router-link 
        v-for="route in routes" 
        :key="route.name"
        :to="route.path" 
        class="mobile-nav-link"
        :class="{ 
          active: $route.name === route.name,
          'nkg-link': route.name === 'nkg'
        }"
        @click="closeMobileMenu"
      >
        {{ route.meta.title }}
      </router-link>
      
      <!-- 移动端主题切换按钮 -->
      <div class="mobile-toggles">
        <button @click="themeStore.toggleTheme" class="mobile-theme-toggle">
          <svg v-if="themeStore.isDarkMode" class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <svg v-else class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
          <span>{{ themeStore.isDarkMode ? '日间模式' : '夜间模式' }}</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useThemeStore } from '../stores/theme'

const router = useRouter()
const route = useRoute()
const themeStore = useThemeStore()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const routes = router.getRoutes().filter(route => route.meta?.title && route.meta?.showInNav !== false)

// 判断是否为首页
const isHomePage = computed(() => route.name === 'home')

const handleScroll = () => {
  isScrolled.value = window.scrollY > 100
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: var(--app-navbar-height, 60px);
  transition: background 200ms ease-out, border-color 200ms ease-out, box-shadow 200ms ease-out;
  background: transparent;
  border-bottom: 1px solid transparent;
  --nav-fg: var(--serif-foreground);
  --nav-muted: var(--serif-muted-foreground);
  --nav-border: var(--serif-border);
  --nav-card: var(--serif-card);
  --nav-toggle-bg: color-mix(in srgb, var(--serif-muted) 75%, transparent);

  // 非首页时默认有背景
  &.non-home-page {
    background: color-mix(in srgb, var(--serif-background) 92%, transparent);
    backdrop-filter: blur(10px);
    border-bottom-color: color-mix(in srgb, var(--serif-accent) 55%, var(--serif-border));
    box-shadow: 0 1px 2px rgba(26, 26, 26, 0.04);
  }

  &.navbar-scrolled {
    background: color-mix(in srgb, var(--serif-background) 92%, transparent);
    backdrop-filter: blur(10px);
    border-bottom-color: color-mix(in srgb, var(--serif-accent) 55%, var(--serif-border));
    box-shadow: 0 1px 2px rgba(26, 26, 26, 0.04);
  }

  // 当移动端菜单展开时，导航栏背景变为白色
  &.mobile-menu-open {
    background: color-mix(in srgb, var(--serif-background) 92%, transparent);
    backdrop-filter: blur(10px);
    border-bottom-color: color-mix(in srgb, var(--serif-accent) 55%, var(--serif-border));
    box-shadow: 0 1px 2px rgba(26, 26, 26, 0.04);
  }

  /* 首页 Hero 深色背景时（未滚动/未打开菜单）提高对比度 */
  &:not(.navbar-scrolled):not(.non-home-page):not(.mobile-menu-open) {
    --nav-fg: rgba(250, 250, 248, 0.92);
    --nav-muted: rgba(250, 250, 248, 0.78);
    --nav-border: rgba(250, 250, 248, 0.14);
    --nav-card: rgba(255, 255, 255, 0.08);
    --nav-toggle-bg: rgba(255, 255, 255, 0.06);
  }
}

.nav-container {
  max-width: var(--serif-container-max);
  margin: 0 auto;
  height: 100%;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1.5rem;
}

.nav-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--nav-fg);
  min-height: 44px;
}

.nav-brand-logo {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid var(--nav-border);
  background: var(--nav-card);
}

.nav-brand-text {
  font-family: var(--serif-font-display);
  font-size: 1.125rem;
  letter-spacing: -0.01em;
}


.nav-menu {
  display: flex;
  gap: 1.75rem;
  justify-content: center;
}

.nav-toggle {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  justify-content: flex-end;
}

.nav-link {
  text-decoration: none;
  color: var(--nav-muted);
  font-family: var(--serif-font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  transition: color 200ms ease-out;
  position: relative;
  padding: 0.25rem 0;
  min-height: 44px;
  display: inline-flex;
  align-items: center;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 10px;
    height: 1px;
    background: var(--serif-accent);
    opacity: 0;
    transform: scaleX(0.6);
    transform-origin: center;
    transition: opacity 200ms ease-out, transform 200ms ease-out;
  }

  &:hover,
  &.active {
    color: var(--nav-fg);

    &::after {
      opacity: 0.6;
      transform: scaleX(1);
    }
  }

  // NKG链接特殊样式
  &.nkg-link {
    &:hover,
    &.active {
      color: #711a5f;
      &::after {
        background: #711a5f;
        opacity: 0.5;
      }
    }
  }
}

.theme-toggle {
  background: var(--nav-toggle-bg);
  border: 1px solid var(--nav-border);
  color: var(--nav-fg);
  width: 38px;
  height: 38px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 200ms ease-out, border-color 200ms ease-out, transform 200ms ease-out;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 22px;
    height: 22px;
    transition: transform 200ms ease-out;
  }

  &:hover {
    background: color-mix(in srgb, var(--nav-toggle-bg) 92%, transparent);
    border-color: color-mix(in srgb, var(--serif-accent) 60%, var(--nav-border));
    transform: translateY(-1px);
    svg {
      transform: rotate(10deg) scale(1.05);
    }
  }
}

// 桌面端主题切换按钮
.desktop-theme-toggle {
  display: flex;
}

.mobile-toggles {
  display: flex;
  gap: 1rem;
  padding: 0 2rem;
  margin-top: 1rem;
  
  .mobile-theme-toggle {
    margin: 0; // 重置原来的 margin
    flex: 1;
    justify-content: center;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}

// 移动端主题切换按钮
.mobile-theme-toggle {
  display: none;
  background: var(--serif-card);
  border: 1px solid var(--serif-border);
  color: var(--serif-foreground);
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  margin: 1rem 2rem 0;
  width: auto;
  align-self: flex-start;
  opacity: 0;
  transition: opacity 0.3s ease 0.3s;
  
  svg {
    width: 18px;
    height: 18px;
    margin-right: 6px;
  }

  &:hover {
    border-color: color-mix(in srgb, var(--serif-accent) 60%, var(--serif-border));
    
    svg {
      stroke: currentColor;
    }
  }
}

// 当菜单激活时，主题切换按钮的渐入效果
.mobile-menu.active .mobile-theme-toggle {
  opacity: 1;
}

// 主题按钮颜色跟随 navbar 的对比度变量（见 .navbar 内 --nav-*）

.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.8rem;
  margin-left: 1rem;
  align-items: center;
  justify-content: center;
  user-select: none; // 禁止文本选择
  cursor: default;   // 鼠标保持默认箭头样式
}

.hamburger-line {
  width: 30px;
  height: 3px;
  background: var(--nav-fg);
  margin: 4px 0;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.hamburger-line.active:nth-child(1) {
  transform: rotate(45deg) translate(9.5px, 7px);
}

.hamburger-line.active:nth-child(2) {
  opacity: 0;
}

.hamburger-line.active:nth-child(3) {
  transform: rotate(-45deg) translate(9.5px, -7px);
}

.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: color-mix(in srgb, var(--serif-background) 96%, transparent);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--serif-border);
  box-shadow: 0 4px 12px rgba(26, 26, 26, 0.06);
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0;
  transform: translateY(-10px);
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  max-height: 0;
  overflow: hidden;

  &.active {
    transform: translateY(-2px);
    opacity: 1;
    visibility: visible;
    max-height: 500px;
    box-shadow: 0 8px 24px rgba(26, 26, 26, 0.08);
  }
}

.mobile-nav-link {
  text-decoration: none;
  color: var(--serif-muted-foreground);
  font-family: var(--serif-font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 1rem 2rem;
  transition: color 200ms ease-out, background 200ms ease-out;
  border-bottom: 1px solid var(--serif-border);
  opacity: 0;
  transition: opacity 0.3s ease;

  // 为每个链接添加不同的延迟
  &:nth-child(1) {
    transition-delay: 0.1s;
  }
  
  &:nth-child(2) {
    transition-delay: 0.15s;
  }
  
  &:nth-child(3) {
    transition-delay: 0.2s;
  }
  
  &:nth-child(4) {
    transition-delay: 0.25s;
  }

  &:hover,
  &.active {
    background: color-mix(in srgb, var(--serif-muted) 70%, transparent);
    color: var(--serif-foreground);
  }

  // NKG链接在移动端的特殊样式
  &.nkg-link {
    &:hover,
    &.active {
      background: color-mix(in srgb, #711a5f 10%, transparent);
      color: #711a5f;
    }
  }
}

// 当菜单激活时，链接的渐入效果
.mobile-menu.active .mobile-nav-link {
  opacity: 1;
}

// 响应式设计
@media (max-width: 768px) {
  .navbar {
    height: var(--app-navbar-height, 80px);
  }

  .nav-container {
    padding: 0 1rem;
    grid-template-columns: 1fr auto;
    gap: 1rem;
  }
  
  .desktop-menu {
    display: none;
  }
  
  .desktop-theme-toggle {
    display: none;
  }
  
  .nav-toggle {
    justify-content: flex-end;
  }

  .mobile-menu-toggle {
    display: flex;
  }
  
  .mobile-theme-toggle {
    display: block;
  }

  .nav-brand-text {
    display: none;
  }
}
</style>


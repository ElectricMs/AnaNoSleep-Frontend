<template>
  <nav class="navbar" :class="{ 
    'navbar-scrolled': isScrolled, 
    'dark-mode': themeStore.isDarkMode,
    'non-home-page': !isHomePage,
    'mobile-menu-open': isMobileMenuOpen
  }">
    <div class="nav-container">
      
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
  //padding: 1rem 0;
  height: 70px;
  transition: all 0.3s ease;
  background: transparent;

  // 非首页时默认有背景
  &.non-home-page {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);

    &.dark-mode {
      background: rgba(26, 26, 26, 0.95);
      box-shadow: 0 2px 20px rgba(255, 255, 255, 0.1);
    }
  }

  &.navbar-scrolled {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);

    &.dark-mode {
      background: rgba(26, 26, 26, 0.95);
      box-shadow: 0 2px 20px rgba(255, 255, 255, 0.1);
    }
  }

  // 当移动端菜单展开时，导航栏背景变为白色
  &.mobile-menu-open {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);

    &.dark-mode {
      background: rgba(26, 26, 26, 0.95);
      box-shadow: 0 2px 20px rgba(255, 255, 255, 0.1);
    }

// 汉堡按钮在菜单展开时变为深色
    .hamburger-line {
      background: #333 !important;
    }

    &.dark-mode .hamburger-line {
      background: #e0e0e0 !important;
    }
  }
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
  position: relative;
  height: 100%;
}


.nav-menu {
  display: flex;
  gap: 2rem;
}

.nav-toggle {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
}

.nav-link {
  text-decoration: none;
  color: #fff;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.5rem 1rem;
  border-radius: 25px;

  &:hover,
  &.active {
    background: rgba(255, 107, 53, 0.2);
    color: #ED6516;
  }

  // NKG链接特殊样式
  &.nkg-link {
    &:hover,
    &.active {
      background: rgba(113, 26, 95, 0.2);
      color: #711a5f;
    }
  }
}

// 非首页时导航链接保持黑色
.navbar.non-home-page .nav-link {
  color: #333;

  // NKG链接在非首页时的特殊样式
  &.nkg-link {
    &:hover,
    &.active {
      background: rgba(113, 26, 95, 0.2);
      color: #711a5f;
    }
  }
}

// 非首页时夜间模式下导航链接保持浅色
.navbar.non-home-page.dark-mode .nav-link {
  color: #e0e0e0;

  // NKG链接在非首页夜间模式时的特殊样式
  &.nkg-link {
    &:hover,
    &.active {
      background: rgba(113, 26, 95, 0.3);
      color: #8b2a6b;
    }
  }
}

.navbar-scrolled .nav-link {
  color: #333;

  &:hover,
  &.active {
    background: rgba(255, 107, 53, 0.2);
    color: #ED6516;
  }

  // NKG链接在滚动状态时的特殊样式
  &.nkg-link {
    &:hover,
    &.active {
      background: rgba(113, 26, 95, 0.2);
      color: #711a5f;
    }
  }
}

// 滚动后夜间模式下导航链接保持浅色
.navbar.dark-mode.navbar-scrolled .nav-link {
  color: #e0e0e0;

  // NKG链接在滚动夜间模式时的特殊样式
  &.nkg-link {
    &:hover,
    &.active {
      background: rgba(113, 26, 95, 0.3);
      color: #8b2a6b;
    }
  }
}

.theme-toggle {
  background: transparent;
  border: none;
  color: #fff;
  padding: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 22px;
    height: 22px;
    transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    
    svg {
      transform: rotate(20deg) scale(1.1);
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
  background: rgba(255, 107, 53, 0.1);
  border: 1px solid rgba(255, 107, 53, 0.5);
  color: #ED6516;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
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
    background: #ED6516;
    color: #fff;
    
    svg {
      stroke: #fff;
    }
  }
}

// 当菜单激活时，主题切换按钮的渐入效果
.mobile-menu.active .mobile-theme-toggle {
  opacity: 1;
}

// 非首页时主题切换按钮样式
.navbar.non-home-page .theme-toggle {
  color: #333; // 默认深色图标
  
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
}

.navbar-scrolled .theme-toggle {
  color: #333; // 默认深色图标
  
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
}

// 暗色模式下的按钮颜色
.navbar.dark-mode .theme-toggle {
  color: #e0e0e0;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
}

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
  height: 4px;
  background: #fff;
  margin: 4px 0;
  transition: all 0.3s ease;
  border-radius: 2px;
}

// 在暗色模式下，即使是透明导航栏，汉堡按钮也应该是白色的
.navbar.dark-mode .hamburger-line {
  background: #fff;
}

// 非首页时汉堡菜单按钮保持黑色
.navbar.non-home-page .hamburger-line {
  background: #333;
}

.navbar.non-home-page.dark-mode .hamburger-line {
  background: #e0e0e0;
}

.navbar-scrolled .hamburger-line {
  background: #333;
}

// 移动端汉堡按钮在夜间模式下的颜色（覆盖上面的规则）
.navbar.dark-mode.non-home-page .hamburger-line,
.navbar.dark-mode.navbar-scrolled .hamburger-line {
  background: #e0e0e0;
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
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
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
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
  }
}

.navbar.dark-mode .mobile-menu {
  background: rgba(26, 26, 26, 0.95);
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
  
  &.active {
    box-shadow: 0 6px 25px rgba(255, 255, 255, 0.15);
  }
}

.mobile-nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 1rem 2rem;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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
    background: rgba(255, 107, 53, 0.1);
    color: #ED6516;
  }

  // NKG链接在移动端的特殊样式
  &.nkg-link {
    &:hover,
    &.active {
      background: rgba(113, 26, 95, 0.1);
      color: #711a5f;
    }
  }
}

// 当菜单激活时，链接的渐入效果
.mobile-menu.active .mobile-nav-link {
  opacity: 1;
}

.navbar.dark-mode .mobile-nav-link {
  color: #e0e0e0;
  border-bottom-color: rgba(255, 255, 255, 0.1);

  // NKG链接在夜间模式移动端的特殊样式
  &.nkg-link {
    &:hover,
    &.active {
      background: rgba(113, 26, 95, 0.2);
      color: #8b2a6b;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .navbar {
    //padding: 1rem 0;
    height: 80px;
  }

  .nav-container {
    padding: 0 1rem;
  }
  
  .desktop-menu {
    display: none;
  }
  
  .desktop-theme-toggle {
    display: none;
  }
  
  .nav-toggle {
    right: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
  }

  .mobile-menu-toggle {
    display: flex;
  }
  
  .mobile-theme-toggle {
    display: block;
  }
}
</style>


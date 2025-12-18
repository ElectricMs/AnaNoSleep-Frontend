<template>
  <div id="app" :class="{ 'dark-mode': themeStore.isDarkMode }">
    <!-- 只在非管理页面显示导航栏和页脚 -->
    <template v-if="!isAdminPage">
      <Navbar />
      <router-view />
      <Footer />
    </template>
    <!-- 管理页面只显示内容 -->
    <template v-else>
      <router-view />
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { useThemeStore } from './stores/theme'

const route = useRoute()
const themeStore = useThemeStore()

// 判断是否为管理页面
const isAdminPage = computed(() => {
  return route.path.startsWith('/admin') || route.path === '/login'
})

onMounted(() => {
  // 初始化主题
  themeStore.initTheme()
})
</script>

<style lang="scss">
// 全局样式将在 main.scss 中定义
</style>


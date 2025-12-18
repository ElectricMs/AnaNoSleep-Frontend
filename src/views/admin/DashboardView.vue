<template>
  <div class="dashboard-container">
    <!-- 侧边栏 -->
    <div class="sidebar" :class="{ collapsed: sidebarCollapsed }">
      <div class="sidebar-header">
        <div class="logo">
          <span v-if="!sidebarCollapsed">AnaNoSleep</span>
        </div>
        <el-button 
          text 
          @click="toggleSidebar"
          class="collapse-btn"
        >
          <el-icon><Fold v-if="!sidebarCollapsed" /><Expand v-else /></el-icon>
        </el-button>
      </div>
      
      <el-menu
        :default-active="activeMenu"
        :collapse="sidebarCollapsed"
        :unique-opened="true"
        router
        class="sidebar-menu"
      >
        <el-menu-item index="/admin/dashboard">
          <el-icon><House /></el-icon>
          <template #title>仪表盘</template>
        </el-menu-item>
        
        <el-sub-menu index="content">
          <template #title>
            <el-icon><Document /></el-icon>
            <span>内容管理</span>
          </template>
          <el-menu-item index="/admin/blogs">博客管理</el-menu-item>
          <el-menu-item index="/admin/categories">分类管理</el-menu-item>
          <el-menu-item index="/admin/tags">标签管理</el-menu-item>
        </el-sub-menu>
        
        <el-menu-item v-if="authStore.isAdmin" index="/admin/users">
          <el-icon><User /></el-icon>
          <template #title>用户管理</template>
        </el-menu-item>
      </el-menu>
    </div>
    
    <!-- 主内容区域 -->
    <div class="main-content" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <!-- 顶部导航 -->
      <div class="top-nav">
        <div class="nav-left">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item 
              v-for="item in breadcrumbs" 
              :key="item.path"
              :to="item.path"
            >
              {{ item.title }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        
        <div class="nav-right">
          <el-dropdown @command="handleCommand">
            <div class="user-info">
              <el-avatar :size="32">
                <el-icon><User /></el-icon>
              </el-avatar>
              <span class="username">{{ userInfo?.username || 'Admin' }}</span>
              <el-icon class="arrow-down"><ArrowDown /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">个人设置</el-dropdown-item>
                <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      
      <!-- 内容区域 -->
      <div class="content-area">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useAuthStore } from '../../stores/auth'
import {
  House,
  Document,
  User,
  Fold,
  Expand,
  ArrowDown
} from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

// 状态管理
const sidebarCollapsed = ref(false)
const userInfo = ref(null)
const activeMenu = ref('/admin/dashboard')

// 面包屑导航
const breadcrumbs = computed(() => {
  const matched = route.matched.filter(item => item.meta && item.meta.title)
  const breadcrumbs = []
  
  // 添加首页
  breadcrumbs.push({ title: '首页', path: '/admin/dashboard' })
  
  // 添加当前页面
  matched.forEach(item => {
    if (item.meta.title && item.path !== '/admin/dashboard') {
      breadcrumbs.push({
        title: item.meta.title,
        path: item.path
      })
    }
  })
  
  return breadcrumbs
})

// 切换侧边栏
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

// 处理用户操作
const handleCommand = (command) => {
  switch (command) {
    case 'profile':
      ElMessage.info('个人设置功能开发中...')
      break
    case 'logout':
      handleLogout()
      break
  }
}

// 退出登录
const handleLogout = async () => {
  try {
    await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    // 清除本地存储
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    ElMessage.success('退出成功')
    router.push('/login')
  } catch {
    // 用户取消
  }
}

// 初始化
onMounted(() => {
  // 获取用户信息
  const userStr = localStorage.getItem('user')
  if (userStr) {
    userInfo.value = JSON.parse(userStr)
  }
  
  // 检查登录状态
  const token = localStorage.getItem('token')
  if (!token) {
    ElMessage.warning('请先登录')
    router.push('/login')
    return
  }
  
  // 设置当前激活菜单
  activeMenu.value = route.path
})
</script>

<style lang="scss" scoped>
.dashboard-container {
  display: flex;
  height: 100vh;
  background: #f5f7fa;
}

.sidebar {
  width: 240px;
  background: white;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  
  &.collapsed {
    width: 64px;
  }
}

.sidebar-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid #e6e6e6;
  
  .logo {
    display: flex;
    align-items: center;
    gap: 12px;
    
    img {
      width: 32px;
      height: 32px;
    }
    
    span {
      font-size: 18px;
      font-weight: 600;
      color: #2c3e50;
    }
  }
  
  .collapse-btn {
    padding: 8px;
    color: #606266;
  }
}

.sidebar-menu {
  flex: 1;
  border: none;
  
  :deep(.el-menu-item) {
    height: 48px;
    line-height: 48px;
    
    &.is-active {
      background: #f0f9ff;
      color: #409eff;
    }
  }
  
  :deep(.el-sub-menu__title) {
    height: 48px;
    line-height: 48px;
  }
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s ease;
}

.top-nav {
  height: 60px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: 100;
}

.nav-left {
  :deep(.el-breadcrumb) {
    font-size: 14px;
  }
}

.nav-right {
  .user-info {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 6px;
    transition: background 0.3s ease;
    
    &:hover {
      background: #f5f7fa;
    }
    
    .username {
      font-size: 14px;
      color: #606266;
    }
    
    .arrow-down {
      font-size: 12px;
      color: #c0c4cc;
    }
  }
}

.content-area {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

// 响应式设计
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 1000;
    transform: translateX(-100%);
    
    &.collapsed {
      transform: translateX(0);
      width: 64px;
    }
  }
  
  .main-content {
    width: 100%;
  }
  
  .content-area {
    padding: 16px;
  }
}
</style>

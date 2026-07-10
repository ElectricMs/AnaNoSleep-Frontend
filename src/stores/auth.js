import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../services/api'

export const useAuthStore = defineStore('auth', () => {
  // 状态
  const token = ref(localStorage.getItem('token') || '')
  const user = ref(null)
  const loading = ref(false)
  const sessionVerified = ref(false)

  // 初始化用户信息
  const initUser = () => {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      try {
        user.value = JSON.parse(userStr)
      } catch (error) {
        console.error('解析用户信息失败:', error)
        localStorage.removeItem('user')
      }
    }
  }

  // 计算属性
  const isLoggedIn = computed(() => !!token.value)
  const userRole = computed(() => user.value?.role || 'user')
  const isAdmin = computed(() => userRole.value === 'admin')

  // 登录
  const login = async (credentials) => {
    loading.value = true
    try {
      const response = await api.post('/api/auth/login', credentials)
      const data = response.data

      if (data.success) {
        token.value = data.data.token
        user.value = data.data.user
        sessionVerified.value = true
        
        // 保存到本地存储
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('user', JSON.stringify(data.data.user))
        
        return { success: true, data: data.data }
      } else {
        return { success: false, message: data.message }
      }
    } catch (error) {
      console.error('登录失败:', error)
      return { success: false, message: '登录失败，请检查网络连接' }
    } finally {
      loading.value = false
    }
  }

  // 登出
  const logout = () => {
    token.value = ''
    user.value = null
    sessionVerified.value = false
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  // 更新用户信息
  const updateUser = (userData) => {
    user.value = { ...user.value, ...userData }
    localStorage.setItem('user', JSON.stringify(user.value))
  }

  // 检查 token 是否有效
  const checkToken = async () => {
    if (!token.value) return false

    try {
      const response = await api.get('/api/auth/verify')
      const data = response.data
      if (data.success) {
        user.value = data.data.user
        sessionVerified.value = true
        localStorage.setItem('user', JSON.stringify(data.data.user))
        return true
      }
      
      // Token 无效，清除登录状态
      logout()
      return false
    } catch (error) {
      console.error('Token 验证失败:', error)
      logout()
      return false
    }
  }

  const ensureAuthenticated = async () => {
    if (!token.value) return false
    if (sessionVerified.value) return true
    return checkToken()
  }

  // 初始化
  initUser()

  return {
    // 状态
    token,
    user,
    loading,
    
    // 计算属性
    isLoggedIn,
    userRole,
    isAdmin,
    
    // 方法
    login,
    logout,
    updateUser,
    checkToken,
    ensureAuthenticated
  }
})

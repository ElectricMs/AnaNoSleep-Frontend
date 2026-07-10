import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../services/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(false)
  const sessionChecked = ref(false)
  let sessionCheckPromise = null
  let legacyToken = localStorage.getItem('token') || ''

  const isLoggedIn = computed(() => !!user.value)
  const userRole = computed(() => user.value?.role || 'user')
  const isAdmin = computed(() => userRole.value === 'admin')

  const clearSession = () => {
    legacyToken = ''
    user.value = null
    sessionChecked.value = true
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const login = async (credentials) => {
    loading.value = true
    try {
      const response = await api.post('/api/auth/login', credentials)
      const data = response.data

      if (data.success) {
        user.value = data.data.user
        sessionChecked.value = true
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        return { success: true, data: { user: data.data.user } }
      }

      return { success: false, message: data.message }
    } catch (error) {
      console.error('登录失败:', error)
      return { success: false, message: error.data?.message || '登录失败，请检查网络连接' }
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      await api.post('/api/auth/logout')
    } catch (error) {
      if (error.status !== 401) {
        console.error('登出请求失败:', error)
      }
    } finally {
      clearSession()
    }
  }

  const updateUser = (userData) => {
    user.value = user.value ? { ...user.value, ...userData } : userData
  }

  const checkSession = async () => {
    try {
      const response = await api.get('/api/auth/me')
      if (response.data.success) {
        user.value = response.data.data
        sessionChecked.value = true
        return true
      }
    } catch (error) {
      if (error.status !== 401) {
        console.error('会话验证失败:', error)
      }
    }

    clearSession()
    return false
  }

  const migrateLegacySession = async () => {
    const token = legacyToken
    legacyToken = ''
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    if (!token) return false

    try {
      await api.post('/api/auth/refresh', undefined, {
        headers: { Authorization: `Bearer ${token}` }
      })
      return checkSession()
    } catch (error) {
      if (error.status !== 401) {
        console.error('旧会话迁移失败:', error)
      }
      clearSession()
      return false
    }
  }

  const ensureAuthenticated = async () => {
    if (sessionChecked.value) return isLoggedIn.value
    if (!sessionCheckPromise) {
      sessionCheckPromise = (legacyToken ? migrateLegacySession() : checkSession()).finally(() => {
        sessionCheckPromise = null
      })
    }
    return sessionCheckPromise
  }

  return {
    user,
    loading,
    isLoggedIn,
    userRole,
    isAdmin,
    login,
    logout,
    clearSession,
    updateUser,
    checkSession,
    ensureAuthenticated
  }
})

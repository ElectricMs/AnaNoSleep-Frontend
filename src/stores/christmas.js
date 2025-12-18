import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChristmasStore = defineStore('christmas', () => {
  // 默认开启圣诞模式
  const isChristmasMode = ref(true)

  // 切换圣诞模式
  const toggleChristmasMode = () => {
    isChristmasMode.value = !isChristmasMode.value
    // 可以选择保存到 localStorage
    localStorage.setItem('christmasMode', isChristmasMode.value)
  }

  // 初始化（如果需要从 localStorage 读取）
  const initChristmasMode = () => {
    const saved = localStorage.getItem('christmasMode')
    if (saved !== null) {
      isChristmasMode.value = saved === 'true'
    }
  }

  return {
    isChristmasMode,
    toggleChristmasMode,
    initChristmasMode
  }
})


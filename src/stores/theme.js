import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDarkMode: false
  }),

  actions: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode
      this.saveTheme()
      this.applyTheme()
    },

    initTheme() {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme === 'dark') {
        this.isDarkMode = true
      }
      this.applyTheme()
    },

    saveTheme() {
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light')
    },

    applyTheme() {
      if (this.isDarkMode) {
        document.body.classList.add('dark-mode')
      } else {
        document.body.classList.remove('dark-mode')
      }
    }
  }
})


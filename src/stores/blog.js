import { defineStore } from 'pinia'

export const useBlogStore = defineStore('blog', {
  state: () => ({
    blogs: [],
    currentBlog: null,
    loading: false,
    error: null,
    pagination: {
      page: 1,
      pageSize: 10,
      total: 0,
      totalPages: 0
    }
  }),

  getters: {
    publishedBlogs: (state) => state.blogs.filter(blog => blog.status === 'published'),
    getBlogById: (state) => (id) => state.blogs.find(blog => blog.id === id)
  },

  actions: {
    async fetchBlogs(options = {}) {
      this.loading = true
      this.error = null
      
      try {
        const params = new URLSearchParams({
          page: options.page || this.pagination.page,
          pageSize: options.pageSize || this.pagination.pageSize,
          status: 'published', // 只获取已发布的博客
          ...options
        })

        const response = await fetch(`/api/blogs?${params}`)
        const result = await response.json()

        if (result.success) {
          this.blogs = result.data.list || result.data
          this.pagination = {
            page: result.data.pagination?.page || result.pagination?.page || 1,
            pageSize: result.data.pagination?.pageSize || result.pagination?.pageSize || 10,
            total: result.data.pagination?.total || result.pagination?.total || 0,
            totalPages: result.data.pagination?.totalPages || result.pagination?.totalPages || 0
          }
        } else {
          this.error = result.message || '获取博客列表失败'
        }
      } catch (error) {
        this.error = '网络错误，请稍后重试'
        console.error('获取博客列表失败:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchBlogById(id) {
      this.loading = true
      this.error = null
      
      try {
        const response = await fetch(`/api/blogs/${id}`)
        const result = await response.json()

        if (result.success) {
          this.currentBlog = result.data
          return result.data
        } else {
          this.error = result.message || '获取博客详情失败'
          return null
        }
      } catch (error) {
        this.error = '网络错误，请稍后重试'
        console.error('获取博客详情失败:', error)
        return null
      } finally {
        this.loading = false
      }
    },

    async likeBlog(id) {
      try {
        const response = await fetch(`/api/blogs/${id}/like`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const result = await response.json()

        if (result.success) {
          // 更新本地博客的点赞数
          const blog = this.blogs.find(b => b.id === id)
          if (blog) {
            blog.likeCount += 1
          }
          if (this.currentBlog && this.currentBlog.id === id) {
            this.currentBlog.likeCount += 1
          }
        }
        
        return result
      } catch (error) {
        console.error('点赞失败:', error)
        return { success: false, message: '点赞失败' }
      }
    },

    clearCurrentBlog() {
      this.currentBlog = null
    },

    clearError() {
      this.error = null
    }
  }
})

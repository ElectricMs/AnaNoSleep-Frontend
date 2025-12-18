<template>
  <div class="dashboard-home">
    <div class="welcome-section">
      <h1>欢迎回来，{{ userInfo?.username || 'Admin' }}！</h1>
      <p>这是您的博客管理系统仪表盘</p>
    </div>
    
    <!-- 统计卡片 -->
    <div class="stats-grid">
      <el-card class="stat-card" shadow="hover">
        <div class="stat-content">
          <div class="stat-icon blogs">
            <el-icon><Document /></el-icon>
          </div>
          <div class="stat-info">
            <div class="stat-number">{{ stats.blogs || 0 }}</div>
            <div class="stat-label">博客文章</div>
          </div>
        </div>
      </el-card>
      
      <el-card class="stat-card" shadow="hover">
        <div class="stat-content">
          <div class="stat-icon categories">
            <el-icon><Folder /></el-icon>
          </div>
          <div class="stat-info">
            <div class="stat-number">{{ stats.categories || 0 }}</div>
            <div class="stat-label">分类</div>
          </div>
        </div>
      </el-card>
      
      <el-card class="stat-card" shadow="hover">
        <div class="stat-content">
          <div class="stat-icon tags">
            <el-icon><Collection /></el-icon>
          </div>
          <div class="stat-info">
            <div class="stat-number">{{ stats.tags || 0 }}</div>
            <div class="stat-label">标签</div>
          </div>
        </div>
      </el-card>
      
      <el-card v-if="authStore.isAdmin" class="stat-card" shadow="hover">
        <div class="stat-content">
          <div class="stat-icon users">
            <el-icon><User /></el-icon>
          </div>
          <div class="stat-info">
            <div class="stat-number">{{ stats.users || 0 }}</div>
            <div class="stat-label">用户</div>
          </div>
        </div>
      </el-card>
    </div>
    
    <!-- 快捷操作 -->
    <div class="quick-actions">
      <h2>快捷操作</h2>
      <div class="actions-grid">
        <el-card class="action-card" shadow="hover" @click="$router.push('/admin/blogs')">
          <div class="action-content">
            <el-icon class="action-icon"><Plus /></el-icon>
            <div class="action-text">写博客</div>
          </div>
        </el-card>
        
        <el-card class="action-card" shadow="hover" @click="$router.push('/admin/categories')">
          <div class="action-content">
            <el-icon class="action-icon"><FolderAdd /></el-icon>
            <div class="action-text">管理分类</div>
          </div>
        </el-card>
        
        <el-card class="action-card" shadow="hover" @click="$router.push('/admin/tags')">
          <div class="action-content">
            <el-icon class="action-icon"><CollectionTag /></el-icon>
            <div class="action-text">管理标签</div>
          </div>
        </el-card>
        
        <el-card v-if="authStore.isAdmin" class="action-card" shadow="hover" @click="$router.push('/admin/users')">
          <div class="action-content">
            <el-icon class="action-icon"><UserFilled /></el-icon>
            <div class="action-text">用户管理</div>
          </div>
        </el-card>
      </div>
    </div>
    
    <!-- 最近博客 -->
    <div class="recent-section">
      <div class="section-header">
        <h2>最近博客</h2>
        <el-button type="text" @click="$router.push('/admin/blogs')">查看全部</el-button>
      </div>
      
      <el-card shadow="hover">
        <div v-if="recentBlogs.length === 0" class="empty-state">
          <el-empty description="暂无博客数据" />
        </div>
        
        <div v-else class="blog-list">
          <div 
            v-for="blog in recentBlogs" 
            :key="blog.id" 
            class="blog-item"
            @click="handleBlogClick(blog)"
          >
            <div class="blog-info">
              <h3 class="blog-title">{{ blog.title }}</h3>
              <p class="blog-summary">{{ blog.excerpt || '暂无摘要' }}</p>
              <div class="blog-meta">
                <el-tag :type="blog.status === 'published' ? 'success' : 'warning'" size="small">
                  {{ blog.status === 'published' ? '已发布' : '草稿' }}
                </el-tag>
                <span class="blog-date">{{ formatDate(blog.createdAt) }}</span>
              </div>
            </div>
            <div class="blog-actions">
              <el-button size="small" @click.stop="handleEditBlog(blog)">
                <el-icon><Edit /></el-icon>
                编辑
              </el-button>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  Document,
  Folder,
  Collection,
  User,
  Plus,
  FolderAdd,
  CollectionTag,
  UserFilled,
  Edit
} from '@element-plus/icons-vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// 状态管理
const userInfo = ref(null)
const stats = reactive({
  blogs: 0,
  categories: 0,
  tags: 0,
  users: 0
})
const recentBlogs = ref([])

// 获取认证头
const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// 获取统计数据
const fetchStats = async () => {
  try {
    // 获取博客数量 - 使用博客管理接口，会根据用户权限自动过滤
    const blogsResponse = await axios.get('/api/blogs/manage', {
      params: { page: 1, pageSize: 1 },
      headers: getAuthHeaders()
    })
    if (blogsResponse.data.success) {
      stats.blogs = blogsResponse.data.data.pagination.total
    }
    
    // 获取分类数量
    const categoriesResponse = await axios.get('/api/categories', {
      params: { page: 1, pageSize: 1 },
      headers: getAuthHeaders()
    })
    if (categoriesResponse.data.success) {
      stats.categories = categoriesResponse.data.data.pagination.total
    }
    
    // 获取标签数量
    const tagsResponse = await axios.get('/api/tags', {
      params: { page: 1, pageSize: 1 },
      headers: getAuthHeaders()
    })
    if (tagsResponse.data.success) {
      stats.tags = tagsResponse.data.data.pagination.total
    }
    
    // 只有管理员才能获取用户数量
    if (authStore.isAdmin) {
      const usersResponse = await axios.get('/api/users', {
        params: { page: 1, pageSize: 1 },
        headers: getAuthHeaders()
      })
      if (usersResponse.data.success) {
        stats.users = usersResponse.data.data.pagination.total
      }
    }
  } catch (error) {
    console.error('获取统计数据失败:', error)
    ElMessage.error('获取统计数据失败')
  }
}

// 获取最近博客
const fetchRecentBlogs = async () => {
  try {
    const response = await axios.get('/api/blogs/manage', {
      params: { page: 1, pageSize: 5 },
      headers: getAuthHeaders()
    })
    
    if (response.data.success) {
      recentBlogs.value = response.data.data.list
    }
  } catch (error) {
    console.error('获取最近博客失败:', error)
  }
}

// 博客点击处理
const handleBlogClick = (blog) => {
  // 可以跳转到博客详情页或编辑页
  ElMessage.info('博客详情功能开发中...')
}

// 编辑博客
const handleEditBlog = (blog) => {
  router.push(`/admin/blogs?edit=${blog.id}`)
}

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

// 初始化
onMounted(() => {
  // 获取用户信息
  const userStr = localStorage.getItem('user')
  if (userStr) {
    userInfo.value = JSON.parse(userStr)
  }
  
  // 获取数据
  fetchStats()
  fetchRecentBlogs()
})
</script>

<style lang="scss" scoped>
.dashboard-home {
  .welcome-section {
    margin-bottom: 32px;
    
    h1 {
      margin: 0 0 8px 0;
      color: #2c3e50;
      font-size: 28px;
      font-weight: 600;
    }
    
    p {
      margin: 0;
      color: #7f8c8d;
      font-size: 16px;
    }
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 32px;
    
    .stat-card {
      .stat-content {
        display: flex;
        align-items: center;
        gap: 16px;
        
        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: white;
          
          &.blogs {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
          
          &.categories {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          }
          
          &.tags {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          }
          
          &.users {
            background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
          }
        }
        
        .stat-info {
          .stat-number {
            font-size: 32px;
            font-weight: 700;
            color: #2c3e50;
            line-height: 1;
          }
          
          .stat-label {
            font-size: 14px;
            color: #7f8c8d;
            margin-top: 4px;
          }
        }
      }
    }
  }
  
  .quick-actions {
    margin-bottom: 32px;
    
    h2 {
      margin: 0 0 20px 0;
      color: #2c3e50;
      font-size: 20px;
      font-weight: 600;
    }
    
    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      
      .action-card {
        cursor: pointer;
        transition: transform 0.2s ease;
        
        &:hover {
          transform: translateY(-2px);
        }
        
        .action-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 20px;
          
          .action-icon {
            font-size: 32px;
            color: #409eff;
          }
          
          .action-text {
            font-size: 16px;
            color: #2c3e50;
            font-weight: 500;
          }
        }
      }
    }
  }
  
  .recent-section {
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      
      h2 {
        margin: 0;
        color: #2c3e50;
        font-size: 20px;
        font-weight: 600;
      }
    }
    
    .blog-list {
      .blog-item {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 16px 0;
        border-bottom: 1px solid #f0f0f0;
        cursor: pointer;
        transition: background 0.2s ease;
        
        &:last-child {
          border-bottom: none;
        }
        
        &:hover {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 16px;
          margin: 0 -16px;
        }
        
        .blog-info {
          flex: 1;
          
          .blog-title {
            margin: 0 0 8px 0;
            font-size: 16px;
            font-weight: 600;
            color: #2c3e50;
          }
          
          .blog-summary {
            margin: 0 0 12px 0;
            color: #666;
            line-height: 1.5;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          .blog-meta {
            display: flex;
            align-items: center;
            gap: 12px;
            
            .blog-date {
              font-size: 12px;
              color: #999;
            }
          }
        }
        
        .blog-actions {
          margin-left: 16px;
        }
      }
    }
    
    .empty-state {
      padding: 40px 0;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .dashboard-home {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
    
    .actions-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .recent-section {
      .section-header {
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
      }
      
      .blog-item {
        flex-direction: column;
        gap: 12px;
        
        .blog-actions {
          margin-left: 0;
          align-self: flex-start;
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .dashboard-home {
    .stats-grid {
      grid-template-columns: 1fr;
    }
    
    .actions-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>

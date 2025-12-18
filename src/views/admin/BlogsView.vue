<template>
  <div class="blogs-container">
    <div class="page-header">
      <h2>博客管理</h2>
      <el-button type="primary" @click="showAddDialog = true">
        <el-icon><Plus /></el-icon>
        新增博客
      </el-button>
    </div>
    
    <!-- 搜索和筛选 -->
    <div class="search-bar">
      <el-row :gutter="16">
        <el-col :span="8">
          <el-input
            v-model="searchForm.keyword"
            placeholder="搜索博客标题或内容"
            clearable
            @keyup.enter="handleSearch"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-select
            v-model="searchForm.categoryId"
            placeholder="选择分类"
            clearable
            @change="handleSearch"
          >
            <el-option
              v-for="category in categories"
              :key="category.id"
              :label="category.name"
              :value="category.id"
            />
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select
            v-model="searchForm.status"
            placeholder="选择状态"
            clearable
            @change="handleSearch"
          >
            <el-option label="全部" value="all" />
            <el-option label="已发布" value="published" />
            <el-option label="草稿" value="draft" />
            <el-option label="已归档" value="archived" />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="handleSearch">
            <el-icon><Search /></el-icon>
            搜索
          </el-button>
        </el-col>
      </el-row>
    </div>
    
    <!-- 博客列表 -->
    <div class="blogs-list">
      <el-card
        v-for="blog in blogs"
        :key="blog.id"
        class="blog-card"
        shadow="hover"
      >
        <template #header>
          <div class="blog-header">
            <h3 class="blog-title">{{ blog.title }}</h3>
            <div class="blog-actions">
              <el-tag :type="getStatusInfo(blog.status).type">
                {{ getStatusInfo(blog.status).text }}
              </el-tag>
              <el-button-group>
                <el-button 
                  size="small" 
                  :type="getToggleButtonType(blog.status)"
                  @click="handleToggleStatus(blog)"
                  v-if="blog.status !== 'deleted'"
                >
                  <el-icon>
                    <component :is="getToggleButtonIcon(blog.status)" />
                  </el-icon>
                  {{ getToggleButtonText(blog.status) }}
                </el-button>
                <el-button size="small" @click="handleEdit(blog)">
                  <el-icon><Edit /></el-icon>
                  编辑
                </el-button>
                <el-button size="small" type="danger" @click="handleDelete(blog)">
                  <el-icon><Delete /></el-icon>
                  删除
                </el-button>
              </el-button-group>
            </div>
          </div>
        </template>
        
        <div class="blog-content">
          <!-- 封面图片 -->
          <div v-if="blog.featuredImage" class="blog-cover">
            <img 
              :src="blog.featuredImage" 
              :alt="blog.title" 
              class="cover-image"
              @error="handleImageError"
              @load="handleImageLoad"
            />
          </div>
          
          <p class="blog-summary">{{ blog.excerpt || '暂无摘要' }}</p>
          <div class="blog-meta">
            <div class="meta-item">
              <el-icon><Calendar /></el-icon>
              <span>{{ formatDate(blog.createdAt) }}</span>
            </div>
            <div class="meta-item" v-if="blog.category">
              <el-icon><Folder /></el-icon>
              <span>{{ blog.category.name }}</span>
            </div>
            <div class="meta-item" v-if="blog.tags && blog.tags.length">
              <el-icon><Collection /></el-icon>
              <el-tag
                v-for="tag in blog.tags.slice(0, 3)"
                :key="tag.id"
                size="small"
                class="tag-item"
              >
                {{ tag.name }}
              </el-tag>
            </div>
          </div>
        </div>
      </el-card>
      
      <!-- 空状态 -->
      <el-empty v-if="blogs.length === 0 && !loading" description="暂无博客数据" />
    </div>
    
    <!-- 分页 -->
    <div class="pagination" v-if="total > 0">
      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    
    <!-- 添加/编辑博客对话框 -->
    <el-dialog
      v-model="showAddDialog"
      :title="editingBlog ? '编辑博客' : '新增博客'"
      width="80%"
      :close-on-click-modal="false"
    >
      <el-form
        :model="blogForm"
        :rules="blogRules"
        ref="blogFormRef"
        label-width="80px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="blogForm.title" placeholder="请输入博客标题" />
        </el-form-item>
        
        <el-form-item label="分类" prop="categoryId">
          <el-select v-model="blogForm.categoryId" placeholder="请选择分类">
            <el-option
              v-for="category in categories"
              :key="category.id"
              :label="category.name"
              :value="category.id"
            />
          </el-select>
        </el-form-item>
        
        <el-form-item label="标签" prop="tags">
          <el-select
            v-model="blogForm.tags"
            multiple
            filterable
            allow-create
            placeholder="请选择或输入标签"
            style="width: 100%"
          >
            <el-option
              v-for="tag in tags"
              :key="tag.id"
              :label="tag.name"
              :value="tag.id"
            />
          </el-select>
        </el-form-item>
        
        <el-form-item label="封面图片" prop="featuredImage">
          <div class="cover-upload-container">
            <el-upload
              class="cover-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="handleCoverSuccess"
              :on-error="handleCoverError"
              :before-upload="beforeCoverUpload"
              accept="image/*"
            >
              <div v-if="blogForm.featuredImage" class="cover-preview">
                <img 
                  :src="blogForm.featuredImage" 
                  class="cover-image" 
                  @error="handleImageError"
                  @load="handleImageLoad"
                />
                <div class="cover-overlay">
                  <el-icon class="cover-icon"><Edit /></el-icon>
                </div>
              </div>
              <div v-else class="cover-placeholder">
                <el-icon class="cover-icon"><Plus /></el-icon>
                <div class="cover-text">点击上传封面图片</div>
              </div>
            </el-upload>
            <div class="cover-tips">
              <p>建议尺寸：1200x630px，支持 JPG、PNG 格式</p>
              <el-button 
                v-if="blogForm.featuredImage" 
                type="danger" 
                size="small" 
                @click="removeCover"
              >
                移除封面
              </el-button>
            </div>
          </div>
        </el-form-item>
        
        <el-form-item label="摘要" prop="excerpt">
          <el-input
            v-model="blogForm.excerpt"
            type="textarea"
            :rows="3"
            placeholder="请输入博客摘要（可选）"
            maxlength="500"
            show-word-limit
          />
        </el-form-item>
        
        <el-form-item label="内容" prop="content">
          <RichTextEditor v-model="blogForm.content" />
        </el-form-item>
        
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="blogForm.status">
            <el-radio label="draft">草稿</el-radio>
            <el-radio label="published">发布</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      
      <template #footer>
        <el-button @click="showAddDialog = false">取消</el-button>
        <el-button type="primary" @click="handleSave" :loading="saving">
          {{ saving ? '保存中...' : '保存' }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Plus,
  Search,
  Edit,
  Delete,
  Calendar,
  Folder,
  Collection
} from '@element-plus/icons-vue'
import axios from 'axios'
import RichTextEditor from '../../components/RichTextEditor.vue'

// 状态管理
const loading = ref(false)
const saving = ref(false)
const blogs = ref([])
const categories = ref([])
const tags = ref([])
const total = ref(0)
const showAddDialog = ref(false)
const editingBlog = ref(null)
const blogFormRef = ref()

// 搜索表单
const searchForm = reactive({
  keyword: '',
  categoryId: '',
  status: 'all'  // 默认显示所有状态的博客
})

// 分页信息
const pagination = reactive({
  page: 1,
  pageSize: 10
})

// 博客表单
const blogForm = reactive({
  title: '',
  categoryId: '',
  tags: [],
  content: '',
  excerpt: '',
  status: 'draft',
  featuredImage: ''
})

// 表单验证规则
const blogRules = {
  title: [
    { required: true, message: '请输入博客标题', trigger: 'blur' },
    { min: 1, max: 200, message: '标题长度在 1 到 200 个字符', trigger: 'blur' }
  ],
  categoryId: [
    { required: true, message: '请选择分类', trigger: 'change' }
  ],
  content: [
    { required: true, message: '请输入博客内容', trigger: 'blur' }
  ]
}

// 获取认证头
const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  console.log('获取到的token:', token ? '存在' : '不存在')
  if (token) {
    console.log('token长度:', token.length)
    console.log('token前10个字符:', token.substring(0, 10))
  }
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// 上传相关配置
const uploadUrl = '/api/upload'

// 封面图片上传相关方法
const handleCoverSuccess = (response) => {
  console.log('=== 封面图片上传响应 ===')
  console.log('完整响应:', response)
  console.log('响应类型:', typeof response)
  console.log('响应键:', Object.keys(response))
  
  if (response.success) {
    blogForm.featuredImage = response.data.url
    console.log('✅ 设置封面图片URL:', response.data.url)
    console.log('✅ blogForm.featuredImage 现在是:', blogForm.featuredImage)
    ElMessage.success('封面图片上传成功')
  } else {
    console.log('❌ 上传失败:', response.message)
    ElMessage.error(response.message || '封面图片上传失败')
  }
}

const handleCoverError = (error) => {
  console.error('封面图片上传失败:', error)
  console.error('错误详情:', {
    message: error.message,
    status: error.status,
    response: error.response
  })
  
  let errorMessage = '封面图片上传失败'
  if (error.status === 401) {
    errorMessage = '认证失败，请重新登录'
  } else if (error.status === 413) {
    errorMessage = '文件过大，请选择小于5MB的图片'
  } else if (error.status === 415) {
    errorMessage = '不支持的文件格式，请选择JPG、PNG、GIF或WebP格式'
  }
  
  ElMessage.error(errorMessage)
}

const beforeCoverUpload = (file) => {
  // 检查是否已登录
  const token = localStorage.getItem('token')
  if (!token) {
    ElMessage.error('请先登录后再上传图片')
    return false
  }
  
  const isImage = file.type.startsWith('image/')
  const isLt5M = file.size / 1024 / 1024 < 5

  if (!isImage) {
    ElMessage.error('只能上传图片文件!')
    return false
  }
  if (!isLt5M) {
    ElMessage.error('图片大小不能超过 5MB!')
    return false
  }
  return true
}

const removeCover = () => {
  blogForm.featuredImage = ''
  ElMessage.success('封面图片已移除')
}

// 图片加载处理
const handleImageLoad = (event) => {
  console.log('图片加载成功:', event.target.src)
  console.log('图片尺寸:', event.target.naturalWidth, 'x', event.target.naturalHeight)
  console.log('图片元素:', event.target)
}

const handleImageError = (event) => {
  console.error('图片加载失败:', event.target.src)
  console.error('错误详情:', event)
  console.error('错误类型:', event.type)
  ElMessage.error('图片加载失败，请检查图片URL是否正确')
}


// 获取博客列表
const fetchBlogs = async () => {
  try {
    loading.value = true
    const params = {
      page: pagination.page,
      pageSize: pagination.pageSize,
      ...searchForm
    }
    
    // 使用博客管理接口，该接口会根据用户权限自动过滤博客
    const response = await axios.get('/api/blogs/manage', {
      params,
      headers: getAuthHeaders()
    })
    
    if (response.data.success) {
      blogs.value = response.data.data.list
      total.value = response.data.data.pagination.total
      console.log('获取到的博客列表:', blogs.value)
    }
  } catch (error) {
    console.error('获取博客列表失败:', error)
    const errorMessage = error.response?.data?.message || error.message || '获取博客列表失败'
    ElMessage.error(errorMessage)
  } finally {
    loading.value = false
  }
}

// 获取分类列表
const fetchCategories = async () => {
  try {
    const response = await axios.get('/api/categories')
    if (response.data.success) {
      categories.value = response.data.data.list
    }
  } catch (error) {
    console.error('获取分类列表失败:', error)
  }
}

// 获取标签列表
const fetchTags = async () => {
  try {
    const response = await axios.get('/api/tags/all')
    if (response.data.success) {
      tags.value = response.data.data
    }
  } catch (error) {
    console.error('获取标签列表失败:', error)
  }
}

// 搜索处理
const handleSearch = () => {
  pagination.page = 1
  fetchBlogs()
}

// 分页处理
const handleSizeChange = (size) => {
  pagination.pageSize = size
  pagination.page = 1
  fetchBlogs()
}

const handleCurrentChange = (page) => {
  pagination.page = page
  fetchBlogs()
}

// 编辑博客
const handleEdit = (blog) => {
  console.log('编辑博客数据:', blog)
  editingBlog.value = blog
  Object.assign(blogForm, {
    title: blog.title,
    categoryId: blog.categoryId,
    tags: blog.tags?.map(tag => tag.id) || [],
    content: blog.content,
    excerpt: blog.excerpt || '',
    status: blog.status,
    featuredImage: blog.featuredImage || ''
  })
  showAddDialog.value = true
}

// 切换博客状态
const handleToggleStatus = async (blog) => {
  try {
    let newStatus, actionText
    
    switch (blog.status) {
      case 'draft':
        newStatus = 'published'
        actionText = '发布'
        break
      case 'published':
        newStatus = 'draft'
        actionText = '设为草稿'
        break
      case 'archived':
        newStatus = 'published'
        actionText = '恢复发布'
        break
      default:
        newStatus = 'published'
        actionText = '发布'
    }
    
    await ElMessageBox.confirm(
      `确定要${actionText}博客"${blog.title}"吗？`,
      `确认${actionText}`,
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }
    )
    
    await axios.patch(`/api/blogs/${blog.id}/status`, {
      status: newStatus
    }, {
      headers: getAuthHeaders()
    })
    
    ElMessage.success(`${actionText}成功`)
    fetchBlogs()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('状态切换失败:', error)
      const errorMessage = error.response?.data?.message || error.message || '状态切换失败'
      ElMessage.error(errorMessage)
    }
  }
}

// 删除博客
const handleDelete = async (blog) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除博客"${blog.title}"吗？`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    await axios.delete(`/api/blogs/${blog.id}`, {
      headers: getAuthHeaders()
    })
    
    ElMessage.success('删除成功')
    fetchBlogs()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除博客失败:', error)
      ElMessage.error('删除博客失败')
    }
  }
}

// 保存博客
const handleSave = async () => {
  if (!blogFormRef.value) return
  
  try {
    await blogFormRef.value.validate()
    saving.value = true
    
    const url = editingBlog.value 
      ? `/api/blogs/${editingBlog.value.id}`
      : '/api/blogs'
    
    const method = editingBlog.value ? 'put' : 'post'
    
    // 确保数据类型正确
    if (!blogForm.categoryId) {
      ElMessage.error('请选择分类')
      return
    }
    
    const submitData = {
      title: blogForm.title,
      content: blogForm.content,
      excerpt: blogForm.excerpt || null,
      categoryId: parseInt(blogForm.categoryId),
      tags: blogForm.tags.map(tag => parseInt(tag)).filter(tag => !isNaN(tag)),
      status: blogForm.status,
      featuredImage: blogForm.featuredImage || null
    }
    
    console.log('=== 博客保存数据 ===')
    console.log('blogForm.featuredImage:', blogForm.featuredImage)
    console.log('submitData.featuredImage:', submitData.featuredImage)
    console.log('完整提交数据:', JSON.stringify(submitData, null, 2))
    
    await axios[method](url, submitData, {
      headers: getAuthHeaders()
    })
    
    ElMessage.success(editingBlog.value ? '更新成功' : '创建成功')
    showAddDialog.value = false
    resetForm()
    fetchBlogs()
  } catch (error) {
    console.error('保存博客失败:', error)
    const errorMessage = error.response?.data?.message || error.message || '保存博客失败'
    ElMessage.error(errorMessage)
  } finally {
    saving.value = false
  }
}

// 重置表单
const resetForm = () => {
  editingBlog.value = null
  Object.assign(blogForm, {
    title: '',
    categoryId: '',
    tags: [],
    content: '',
    excerpt: '',
    status: 'draft',
    featuredImage: ''
  })
  if (blogFormRef.value) {
    blogFormRef.value.resetFields()
  }
}

// 状态映射
const getStatusInfo = (status) => {
  const statusMap = {
    'draft': { text: '草稿', type: 'warning', color: '#e6a23c' },
    'published': { text: '已发布', type: 'success', color: '#67c23a' },
    'archived': { text: '已归档', type: 'info', color: '#909399' },
    'deleted': { text: '已删除', type: 'danger', color: '#f56c6c' }
  }
  return statusMap[status] || { text: '未知', type: 'info', color: '#909399' }
}

// 获取状态切换按钮类型
const getToggleButtonType = (status) => {
  const typeMap = {
    'draft': 'success',
    'published': 'warning',
    'archived': 'primary'
  }
  return typeMap[status] || 'primary'
}

// 获取状态切换按钮图标
const getToggleButtonIcon = (status) => {
  const iconMap = {
    'draft': 'Check',
    'published': 'View',
    'archived': 'Refresh'
  }
  return iconMap[status] || 'Check'
}

// 获取状态切换按钮文本
const getToggleButtonText = (status) => {
  const textMap = {
    'draft': '发布',
    'published': '设为草稿',
    'archived': '恢复'
  }
  return textMap[status] || '发布'
}

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 初始化
onMounted(() => {
  fetchBlogs()
  fetchCategories()
  fetchTags()
})
</script>

<style lang="scss" scoped>
.blogs-container {
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    
    h2 {
      margin: 0;
      color: #2c3e50;
      font-size: 24px;
      font-weight: 600;
    }
  }
  
  .search-bar {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 24px;
  }
  
  .blogs-list {
    .blog-card {
      margin-bottom: 16px;
      
      .blog-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .blog-title {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #2c3e50;
        }
        
        .blog-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
      }
      
      .blog-content {
        .blog-cover {
          margin-bottom: 16px;
          
          .cover-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
        }
        
        .blog-summary {
          color: #666;
          line-height: 1.6;
          margin-bottom: 16px;
        }
        
        .blog-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 14px;
          color: #999;
          
          .meta-item {
            display: flex;
            align-items: center;
            gap: 4px;
            
            .tag-item {
              margin-left: 4px;
            }
          }
        }
      }
    }
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 24px;
  }
}

// 封面图片上传样式
.cover-upload-container {
  .cover-uploader {
    .cover-preview {
      position: relative;
      width: 200px;
      height: 120px;
      border: 2px dashed #d9d9d9;
      border-radius: 6px;
      overflow: hidden;
      cursor: pointer;
      transition: border-color 0.3s;
      
      &:hover {
        border-color: #409eff;
      }
      
      .cover-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .cover-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s;
        
        .cover-icon {
          color: white;
          font-size: 24px;
        }
      }
      
      &:hover .cover-overlay {
        opacity: 1;
      }
    }
    
    .cover-placeholder {
      width: 200px;
      height: 120px;
      border: 2px dashed #d9d9d9;
      border-radius: 6px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: border-color 0.3s;
      
      &:hover {
        border-color: #409eff;
      }
      
      .cover-icon {
        font-size: 28px;
        color: #8c939d;
        margin-bottom: 8px;
      }
      
      .cover-text {
        color: #8c939d;
        font-size: 14px;
      }
    }
  }
  
  .cover-tips {
    margin-top: 8px;
    
    p {
      margin: 0 0 8px 0;
      font-size: 12px;
      color: #999;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .blogs-container {
    .page-header {
      flex-direction: column;
      gap: 16px;
      align-items: stretch;
    }
    
    .search-bar {
      .el-row {
        .el-col {
          margin-bottom: 12px;
        }
      }
    }
    
    .blog-card {
      .blog-header {
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
        
        .blog-actions {
          justify-content: center;
        }
      }
      
      .blog-content {
        .blog-meta {
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
        }
      }
    }
  }
}
</style>

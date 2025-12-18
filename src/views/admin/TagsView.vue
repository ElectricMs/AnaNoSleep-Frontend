<template>
  <div class="tags-container">
    <!-- 权限检查 -->
    <div v-if="!isAdmin" class="permission-denied">
      <el-result
        icon="warning"
        title="权限不足"
        sub-title="只有管理员可以访问标签管理功能"
      >
        <template #extra>
          <el-button type="primary" @click="$router.push('/admin/dashboard')">
            返回管理面板
          </el-button>
        </template>
      </el-result>
    </div>
    
    <!-- 标签管理内容 -->
    <div v-else>
      <div class="page-header">
        <h2>标签管理</h2>
        <el-button type="primary" @click="showAddDialog = true">
          <el-icon><Plus /></el-icon>
          新增标签
        </el-button>
      </div>
    
    <!-- 搜索栏 -->
    <div class="search-bar">
      <el-input
        v-model="searchKeyword"
        placeholder="搜索标签名称"
        clearable
        @keyup.enter="handleSearch"
        style="width: 300px"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
      <el-button type="primary" @click="handleSearch">
        <el-icon><Search /></el-icon>
        搜索
      </el-button>
    </div>
    
    <!-- 标签列表 -->
    <div class="tags-list">
      <el-table
        :data="filteredTags"
        v-loading="loading"
        style="width: 100%"
        row-key="id"
      >
        <el-table-column prop="name" label="标签名称" min-width="120">
          <template #default="{ row }">
            <div class="tag-name">
              <span 
                class="color-dot" 
                :style="{ backgroundColor: row.color || '#909399' }"
              ></span>
              {{ row.name }}
            </div>
          </template>
        </el-table-column>
        
        <el-table-column prop="slug" label="别名" min-width="100" />
        
        <el-table-column prop="description" label="描述" min-width="200" show-overflow-tooltip />
        
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'danger'">
              {{ row.status === 'active' ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        
        <el-table-column prop="createdAt" label="创建时间" width="160">
          <template #default="{ row }">
            {{ formatDate(row.createdAt) }}
          </template>
        </el-table-column>
        
        <el-table-column label="操作" width="160" align="center" fixed="right">
          <template #default="{ row }">
            <el-button-group>
              <el-button size="small" @click="handleEdit(row)">
                <el-icon><Edit /></el-icon>
                编辑
              </el-button>
              <el-button size="small" type="danger" @click="handleDelete(row)">
                <el-icon><Delete /></el-icon>
                删除
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- 空状态 -->
      <el-empty v-if="filteredTags.length === 0 && !loading" description="暂无标签数据" />
    </div>
    
    <!-- 标签云视图 -->
    <div class="tags-cloud" v-if="!searchKeyword && tags.length > 0">
      <h3>标签云</h3>
      <div class="cloud-container">
        <el-tag
          v-for="tag in tags"
          :key="tag.id"
          :color="tag.color || '#909399'"
          :style="getTagStyle(tag)"
          class="cloud-tag"
          @click="handleTagClick(tag)"
        >
          {{ tag.name }}
        </el-tag>
      </div>
    </div>
    
    <!-- 添加/编辑标签对话框 -->
    <el-dialog
      v-model="showAddDialog"
      :title="editingTag ? '编辑标签' : '新增标签'"
      width="500px"
      :close-on-click-modal="false"
    >
      <el-form
        :model="tagForm"
        :rules="tagRules"
        ref="tagFormRef"
        label-width="80px"
      >
        <el-form-item label="标签名称" prop="name">
          <el-input 
            v-model="tagForm.name" 
            placeholder="请输入标签名称"
            @input="generateSlug"
          />
        </el-form-item>
        
        <el-form-item label="别名" prop="slug">
          <el-input 
            v-model="tagForm.slug" 
            placeholder="请输入别名（用于URL）"
          />
        </el-form-item>
        
        <el-form-item label="描述" prop="description">
          <el-input
            v-model="tagForm.description"
            type="textarea"
            :rows="3"
            placeholder="请输入标签描述"
          />
        </el-form-item>
        
        <el-form-item label="颜色" prop="color">
          <el-color-picker v-model="tagForm.color" />
        </el-form-item>
        
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="tagForm.status">
            <el-radio label="active">启用</el-radio>
            <el-radio label="inactive">禁用</el-radio>
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
    </div> <!-- 结束标签管理内容 -->
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Edit, Delete, Search } from '@element-plus/icons-vue'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

// 权限检查
const authStore = useAuthStore()
const isAdmin = authStore.isAdmin

// 状态管理
const loading = ref(false)
const saving = ref(false)
const tags = ref([])
const searchKeyword = ref('')
const showAddDialog = ref(false)
const editingTag = ref(null)
const tagFormRef = ref()

// 标签表单
const tagForm = reactive({
  name: '',
  slug: '',
  description: '',
  color: '#909399',
  status: 'active'
})

// 表单验证规则
const tagRules = {
  name: [
    { required: true, message: '请输入标签名称', trigger: 'blur' },
    { min: 1, max: 30, message: '标签名称长度在 1 到 30 个字符', trigger: 'blur' }
  ],
  slug: [
    { required: true, message: '请输入别名', trigger: 'blur' },
    { pattern: /^[a-z0-9-]+$/, message: '别名只能包含小写字母、数字和连字符', trigger: 'blur' }
  ]
}

// 过滤后的标签
const filteredTags = computed(() => {
  if (!searchKeyword.value) return tags.value
  return tags.value.filter(tag => 
    tag.name.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
    tag.slug.toLowerCase().includes(searchKeyword.value.toLowerCase())
  )
})

// 获取认证头
const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// 获取标签列表
const fetchTags = async () => {
  try {
    loading.value = true
    const response = await axios.get('/api/tags', {
      headers: getAuthHeaders()
    })
    
    if (response.data.success) {
      // 处理分页响应格式
      if (response.data.data && response.data.data.list) {
        tags.value = response.data.data.list
      } else {
        tags.value = response.data.data || []
      }
    }
  } catch (error) {
    console.error('获取标签列表失败:', error)
    ElMessage.error('获取标签列表失败')
  } finally {
    loading.value = false
  }
}

// 生成别名
const generateSlug = () => {
  if (!editingTag.value) {
    tagForm.slug = tagForm.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim()
  }
}

// 获取标签云样式
const getTagStyle = (tag) => {
  // 根据标签名称长度生成不同的大小
  const size = Math.max(12, Math.min(20, 16 - tag.name.length * 0.5))
  return {
    fontSize: `${size}px`,
    margin: '4px 8px'
  }
}

// 标签云点击
const handleTagClick = (tag) => {
  searchKeyword.value = tag.name
}

// 搜索处理
const handleSearch = () => {
  // 搜索逻辑已在 computed 中处理
}

// 编辑标签
const handleEdit = (tag) => {
  editingTag.value = tag
  Object.assign(tagForm, {
    name: tag.name,
    slug: tag.slug,
    description: tag.description || '',
    color: tag.color || '#909399',
    status: tag.status
  })
  showAddDialog.value = true
}

// 删除标签
const handleDelete = async (tag) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除标签"${tag.name}"吗？`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    await axios.delete(`/api/tags/${tag.id}`, {
      headers: getAuthHeaders()
    })
    
    ElMessage.success('删除成功')
    fetchTags()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除标签失败:', error)
      ElMessage.error('删除标签失败')
    }
  }
}

// 保存标签
const handleSave = async () => {
  if (!tagFormRef.value) return
  
  try {
    await tagFormRef.value.validate()
    saving.value = true
    
    const url = editingTag.value 
      ? `/api/tags/${editingTag.value.id}`
      : '/api/tags'
    
    const method = editingTag.value ? 'put' : 'post'
    
    await axios[method](url, tagForm, {
      headers: getAuthHeaders()
    })
    
    ElMessage.success(editingTag.value ? '更新成功' : '创建成功')
    showAddDialog.value = false
    resetForm()
    fetchTags()
  } catch (error) {
    console.error('保存标签失败:', error)
    ElMessage.error('保存标签失败')
  } finally {
    saving.value = false
  }
}

// 重置表单
const resetForm = () => {
  editingTag.value = null
  Object.assign(tagForm, {
    name: '',
    slug: '',
    description: '',
    color: '#909399',
    status: 'active'
  })
  if (tagFormRef.value) {
    tagFormRef.value.resetFields()
  }
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
  fetchTags()
})
</script>

<style lang="scss" scoped>
.tags-container {
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
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
  }
  
  .tags-list {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin-bottom: 24px;
    
    .tag-name {
      display: flex;
      align-items: center;
      gap: 8px;
      
      .color-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        display: inline-block;
      }
    }
  }
  
  .tags-cloud {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 24px;
    
    h3 {
      margin: 0 0 16px 0;
      color: #2c3e50;
      font-size: 18px;
      font-weight: 600;
    }
    
    .cloud-container {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      
      .cloud-tag {
        cursor: pointer;
        transition: transform 0.2s ease;
        
        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .tags-container {
    .page-header {
      flex-direction: column;
      gap: 16px;
      align-items: stretch;
    }
    
    .search-bar {
      flex-direction: column;
    }
  }
}
</style>

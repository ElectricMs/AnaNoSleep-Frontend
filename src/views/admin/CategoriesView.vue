<template>
  <div class="categories-container">
    <!-- 权限检查 -->
    <div v-if="!isAdmin" class="permission-denied">
      <el-result
        icon="warning"
        title="权限不足"
        sub-title="只有管理员可以访问分类管理功能"
      >
        <template #extra>
          <el-button type="primary" @click="$router.push('/admin/dashboard')">
            返回管理面板
          </el-button>
        </template>
      </el-result>
    </div>
    
    <!-- 分类管理内容 -->
    <div v-else>
      <div class="page-header">
        <h2>分类管理</h2>
        <el-button type="primary" @click="showAddDialog = true">
          <el-icon><Plus /></el-icon>
          新增分类
        </el-button>
      </div>
    
    <!-- 分类列表 -->
    <div class="categories-list">
      <el-table
        :data="categories"
        v-loading="loading"
        style="width: 100%"
        row-key="id"
      >
        <el-table-column prop="name" label="分类名称" min-width="120">
          <template #default="{ row }">
            <div class="category-name">
              <span 
                class="color-dot" 
                :style="{ backgroundColor: row.color || '#409eff' }"
              ></span>
              {{ row.name }}
            </div>
          </template>
        </el-table-column>
        
        <el-table-column prop="slug" label="别名" min-width="100" />
        
        <el-table-column prop="description" label="描述" min-width="200" show-overflow-tooltip />
        
        <el-table-column prop="sortOrder" label="排序" width="80" align="center" />
        
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
      <el-empty v-if="categories.length === 0 && !loading" description="暂无分类数据" />
    </div>
    
    <!-- 添加/编辑分类对话框 -->
    <el-dialog
      v-model="showAddDialog"
      :title="editingCategory ? '编辑分类' : '新增分类'"
      width="500px"
      :close-on-click-modal="false"
    >
      <el-form
        :model="categoryForm"
        :rules="categoryRules"
        ref="categoryFormRef"
        label-width="80px"
      >
        <el-form-item label="分类名称" prop="name">
          <el-input 
            v-model="categoryForm.name" 
            placeholder="请输入分类名称"
            @input="generateSlug"
          />
        </el-form-item>
        
        <el-form-item label="别名" prop="slug">
          <el-input 
            v-model="categoryForm.slug" 
            placeholder="请输入别名（用于URL）"
          />
        </el-form-item>
        
        <el-form-item label="描述" prop="description">
          <el-input
            v-model="categoryForm.description"
            type="textarea"
            :rows="3"
            placeholder="请输入分类描述"
          />
        </el-form-item>
        
        <el-form-item label="颜色" prop="color">
          <el-color-picker v-model="categoryForm.color" />
        </el-form-item>
        
        <el-form-item label="图标" prop="icon">
          <el-input 
            v-model="categoryForm.icon" 
            placeholder="请输入图标名称（可选）"
          />
        </el-form-item>
        
        <el-form-item label="排序" prop="sortOrder">
          <el-input-number 
            v-model="categoryForm.sortOrder" 
            :min="0"
            :max="999"
            placeholder="排序值"
          />
        </el-form-item>
        
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="categoryForm.status">
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
    </div> <!-- 结束分类管理内容 -->
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

// 权限检查
const authStore = useAuthStore()
const isAdmin = authStore.isAdmin

// 状态管理
const loading = ref(false)
const saving = ref(false)
const categories = ref([])
const showAddDialog = ref(false)
const editingCategory = ref(null)
const categoryFormRef = ref()

// 分类表单
const categoryForm = reactive({
  name: '',
  slug: '',
  description: '',
  color: '#409eff',
  icon: '',
  sortOrder: 0,
  status: 'active'
})

// 表单验证规则
const categoryRules = {
  name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    { min: 1, max: 50, message: '分类名称长度在 1 到 50 个字符', trigger: 'blur' }
  ],
  slug: [
    { required: true, message: '请输入别名', trigger: 'blur' },
    { pattern: /^[a-z0-9-]+$/, message: '别名只能包含小写字母、数字和连字符', trigger: 'blur' }
  ]
}

// 获取认证头
const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// 获取分类列表
const fetchCategories = async () => {
  try {
    loading.value = true
    const response = await axios.get('/api/categories', {
      headers: getAuthHeaders()
    })
    
    if (response.data.success) {
      categories.value = response.data.data.list
    }
  } catch (error) {
    console.error('获取分类列表失败:', error)
    ElMessage.error('获取分类列表失败')
  } finally {
    loading.value = false
  }
}

// 生成别名
const generateSlug = () => {
  if (!editingCategory.value) {
    categoryForm.slug = categoryForm.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim()
  }
}

// 编辑分类
const handleEdit = (category) => {
  editingCategory.value = category
  Object.assign(categoryForm, {
    name: category.name,
    slug: category.slug,
    description: category.description || '',
    color: category.color || '#409eff',
    icon: category.icon || '',
    sortOrder: category.sortOrder || 0,
    status: category.status
  })
  showAddDialog.value = true
}

// 删除分类
const handleDelete = async (category) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除分类"${category.name}"吗？`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    await axios.delete(`/api/categories/${category.id}`, {
      headers: getAuthHeaders()
    })
    
    ElMessage.success('删除成功')
    fetchCategories()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除分类失败:', error)
      ElMessage.error('删除分类失败')
    }
  }
}

// 保存分类
const handleSave = async () => {
  if (!categoryFormRef.value) return
  
  try {
    await categoryFormRef.value.validate()
    saving.value = true
    
    const url = editingCategory.value 
      ? `/api/categories/${editingCategory.value.id}`
      : '/api/categories'
    
    const method = editingCategory.value ? 'put' : 'post'
    
    await axios[method](url, categoryForm, {
      headers: getAuthHeaders()
    })
    
    ElMessage.success(editingCategory.value ? '更新成功' : '创建成功')
    showAddDialog.value = false
    resetForm()
    fetchCategories()
  } catch (error) {
    console.error('保存分类失败:', error)
    ElMessage.error('保存分类失败')
  } finally {
    saving.value = false
  }
}

// 重置表单
const resetForm = () => {
  editingCategory.value = null
  Object.assign(categoryForm, {
    name: '',
    slug: '',
    description: '',
    color: '#409eff',
    icon: '',
    sortOrder: 0,
    status: 'active'
  })
  if (categoryFormRef.value) {
    categoryFormRef.value.resetFields()
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
  fetchCategories()
})
</script>

<style lang="scss" scoped>
.categories-container {
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
  
  .categories-list {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    
    .category-name {
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
}

// 响应式设计
@media (max-width: 768px) {
  .categories-container {
    .page-header {
      flex-direction: column;
      gap: 16px;
      align-items: stretch;
    }
  }
}
</style>

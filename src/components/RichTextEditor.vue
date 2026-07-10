<template>
  <div class="rich-text-editor">
    <Toolbar 
      :editor="editorRef" 
      :defaultConfig="toolbarConfig" 
      :mode="mode"
      style="border-bottom: 1px solid #ccc" 
    />
    <Editor 
      :defaultConfig="editorConfig" 
      :mode="mode" 
      v-model="valueHtml" 
      style="height: 400px; overflow-y: hidden"
      @onCreated="handleCreated" 
      @onChange="handleChange" 
    />
  </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css'
import { ref, shallowRef, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import api from '../services/api'

// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef()

// 工具栏配置
const toolbarConfig = { 
  excludeKeys: ['uploadVideo'] // 屏蔽掉上传视频的功能
}

const uploadRichImage = async (file, insertFn) => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await api.post('/api/upload/rich-editor', formData)
  const result = response.data
  const imageUrl = result?.data?.url

  if (result?.errno !== 0 || !imageUrl) {
    const message = result?.message || '图片上传失败'
    throw new Error(message)
  }

  insertFn(imageUrl, file.name, imageUrl)
}

// 编辑器配置
const editorConfig = { 
  placeholder: '请输入内容...',
  MENU_CONF: {
    // 上传图片配置
    uploadImage: {
      base64LimitSize: 10 * 1024, // 小于10kb的图片直接保存为base64
      server: '/api/upload/rich-editor', // 上传接口
      fieldName: 'file', // 上传文件的字段名
      maxFileSize: 2 * 1024 * 1024, // 最大文件大小 2MB
      allowedFileTypes: ['image/*'], // 允许的文件类型
      customUpload: uploadRichImage,
      // 上传失败后的回调
      onFailed: (file, res) => {
        console.error('图片上传失败', res)
      }
    },
    // 插入图片配置
    insertImage: {
      parseImageSrc: (src) => {
        return src
      }
    }
  }
}

const mode = ref('default')
const valueHtml = ref('')

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])
let initFinished = false
let syncingFromParent = false
let focusTimer = null
let initTimer = null

const focusEditor = () => {
  const editor = editorRef.value
  if (!editor || editor.isDestroyed) return

  nextTick(() => {
    focusTimer = setTimeout(() => {
      if (!editor.isDestroyed) {
        editor.focus(true)
        editor.updateView()
      }
    }, 0)
  })
}

onMounted(() => {
  // 延迟初始化，确保编辑器完全加载
  initTimer = setTimeout(() => {
    valueHtml.value = props.modelValue
    initFinished = true
  }, 200)
})

// 组件销毁时，及时销毁编辑器
onBeforeUnmount(() => {
  clearTimeout(focusTimer)
  clearTimeout(initTimer)
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== valueHtml.value) {
      syncingFromParent = true
      valueHtml.value = newValue || ''
      nextTick(() => {
        syncingFromParent = false
      })
    }
  }
)

// 编辑器回调函数
const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

const handleChange = () => {
  if (initFinished && !syncingFromParent) {
    // 初始化完成后才触发更新事件
    emit('update:modelValue', valueHtml.value)
  }
}

defineExpose({
  focus: focusEditor
})
</script>

<style lang="scss" scoped>
.rich-text-editor {
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  
  // 深色模式支持
  :deep(.w-e-text-container) {
    background-color: #fff;
    color: #333;
  }
  
  :deep(.w-e-toolbar) {
    background-color: #f5f5f5;
    border-bottom: 1px solid #e0e0e0;
  }
}

// 深色模式样式
.dark-mode .rich-text-editor {
  :deep(.w-e-text-container) {
    background-color: #2d2d2d;
    color: #e0e0e0;
  }
  
  :deep(.w-e-toolbar) {
    background-color: #3d3d3d;
    border-bottom: 1px solid #555;
  }
  
  :deep(.w-e-toolbar-item) {
    color: #e0e0e0;
    
    &:hover {
      background-color: #555;
    }
  }
}
</style>

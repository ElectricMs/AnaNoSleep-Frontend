import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// 懒加载组件 - 实现代码分割
const HomeView = () => import('../views/HomeView.vue')
const NavigationView = () => import('../views/NavigationView.vue')
const TutorialsView = () => import('../views/TutorialsView.vue')
const NKGView = () => import('../views/NKGView.vue')
const BlogView = () => import('../views/BlogView.vue')
const AboutView = () => import('../views/AboutView.vue')
const LoginView = () => import('../views/LoginView.vue')

// 管理页面单独分块
const DashboardView = () => import('../views/admin/DashboardView.vue')
const AdminHomeView = () => import('../views/admin/HomeView.vue')
const BlogsView = () => import('../views/admin/BlogsView.vue')
const CategoriesView = () => import('../views/admin/CategoriesView.vue')
const TagsView = () => import('../views/admin/TagsView.vue')
const UsersView = () => import('../views/admin/UsersView.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: '首页', showInNav: true }
  },
  {
    path: '/tutorials',
    name: 'tutorials',
    component: TutorialsView,
    meta: { title: '攻略教程', showInNav: true }
  },
  {
    path: '/blog/:id',
    name: 'blog',
    component: BlogView,
    meta: { title: '博客详情', showInNav: false }
  },
  {
    path: '/navigation',
    name: 'navigation',
    component: NavigationView,
    meta: { title: '网页导航', showInNav: true }
  },
  {
    path: '/nkg',
    name: 'nkg',
    component: NKGView,
    meta: { title: 'NKG', showInNav: true }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: { title: '关于我们', showInNav: false }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { title: '登录', showInNav: false }
  },
  {
    path: '/admin',
    component: DashboardView,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/admin/dashboard'
      },
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: AdminHomeView,
        meta: { title: '仪表盘', showInNav: false }
      },
      {
        path: 'blogs',
        name: 'admin-blogs',
        component: BlogsView,
        meta: { title: '博客管理', showInNav: false }
      },
      {
        path: 'categories',
        name: 'admin-categories',
        component: CategoriesView,
        meta: { title: '分类管理', showInNav: false }
      },
      {
        path: 'tags',
        name: 'admin-tags',
        component: TagsView,
        meta: { title: '标签管理', showInNav: false }
      },
      {
        path: 'users',
        name: 'admin-users',
        component: UsersView,
        meta: { title: '用户管理', showInNav: false, requiresAdmin: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 路由守卫 - 设置页面标题和认证检查
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    // 根据是否为管理页面设置不同的标题后缀
    const suffix = to.path.startsWith('/admin') ? 'AnaNoSleep 控制台' : 'AnaNoSleep'
    document.title = `${to.meta.title} - ${suffix}`
  }
  
  // 检查是否需要认证
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token')
    if (!token) {
      next('/login')
      return
    }
  }
  
  // 检查是否需要管理员权限
  if (to.meta.requiresAdmin) {
    const authStore = useAuthStore()
    if (!authStore.isAdmin) {
      // 非管理员用户重定向到仪表盘
      next('/admin/dashboard')
      return
    }
  }
  
  // 如果已登录且访问登录页，重定向到控制台
  if (to.path === '/login') {
    const token = localStorage.getItem('token')
    if (token) {
      next('/admin/dashboard')
      return
    }
  }
  
  next()
})

export default router


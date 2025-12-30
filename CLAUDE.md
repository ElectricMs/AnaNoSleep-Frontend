# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 用户介绍

我叫Electricm，是产品经理，几乎不懂代码。

Electricm正在探索claude code的用法，你可以多帮帮他。

Electricm平时喜欢用中文。

## Project Overview

AnaNoSleep & NankaiGayming is a Vue 3 single-page application for an Overwatch-themed community website with both public content and an admin dashboard. The site is deployed at https://www.ananosleep.com/ with SSL certification and ICP备案 for Chinese deployment.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on port 3000, auto-opens browser)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- **Frontend**: Vue 3 (Composition API), Vue Router 4, Pinia 3
- **Build Tool**: Vite 7
- **UI Library**: Element Plus 2 with icons
- **HTTP**: Axios 1 with interceptors for auth
- **Styling**: Sass/SCSS
- **Animation**: GSAP 3 (available but not extensively used)
- **Rich Text Editor**: WangEditor 5

## Architecture

### State Management (Pinia)

Located in `src/stores/`:

- **auth.js**: JWT-based authentication with localStorage persistence
  - Token management with automatic validation
  - Role-based access control (admin vs user)
  - Auto-logout on 401 responses via axios interceptor
  - Computed properties: `isLoggedIn`, `isAdmin`, `userRole`

- **theme.js**: Dark/light mode toggle with localStorage persistence

- **blog.js**: Blog content and categories state

- **navigation.js**: Navigation state management

### Routing System

All routes use lazy-loaded components for code splitting. Key routing features:

- **Public routes**: `/` (home), `/tutorials`, `/navigation`, `/nkg`, `/about`
- **Admin routes**: `/admin/*` (requires authentication)
- **Admin-only routes**: `/admin/users` (requires admin role)
- **Route guards** in `src/router/index.js`:
  - Sets page titles dynamically
  - Checks authentication for protected routes
  - Verifies admin role for admin-only routes
  - Redirects logged-in users away from login page
  - Auto-redirect to login on 401 errors
- **Scroll behavior**: Preserves or resets scroll position on navigation

### API Configuration

- **Development**: API calls proxy to `http://localhost:8080` via Vite proxy (see `vite.config.js`)
- **Production**: API base URL is `https://www.ananosleep.com/` (see `src/main.js`)
- **Axios interceptors** (`src/main.js:24-51`):
  - Request interceptor: Automatically adds `Bearer` token to Authorization header
  - Response interceptor: Handles 401 errors, clears auth state, redirects to login

### Authentication Flow

1. Login via `/api/auth/login` returns JWT token and user data
2. Token stored in `localStorage` as `token`
3. User info stored as JSON string in `localStorage` as `user`
4. Auth store initializes from localStorage on app load
5. All axios requests include automatic token injection
6. Token verification via `/api/auth/verify` endpoint
7. Automatic logout and redirect on 401 responses

### Theme System

- CSS variables in `src/assets/css/main.scss` for theming
- Theme state managed by Pinia store
- Persisted across sessions via localStorage
- Smooth transitions between themes

### Project Structure

```
src/
├── assets/
│   ├── css/main.scss          # Global styles and theme variables
│   └── images/                # Overwatch-related images (19+ assets)
├── components/
│   ├── Navbar.vue             # Main navigation with theme toggle
│   ├── Footer.vue             # Page footer
│   └── RichTextEditor.vue     # Admin content editor
├── composables/               # Empty - ready for Vue composables
├── data/
│   └── nkgMembersData.js      # Static NKG team member data
├── router/index.js            # Vue Router config with guards
├── stores/                    # Pinia stores (auth, theme, blog, navigation)
├── views/
│   ├── HomeView.vue           # Landing page with hero section
│   ├── AboutView.vue          # About page
│   ├── BlogView.vue           # Blog post display
│   ├── NavigationView.vue     # Links/navigation page
│   ├── TutorialsView.vue      # Guides/tutorials page
│   ├── NKGView.vue            # Team members page
│   ├── LoginView.vue          # Authentication page
│   └── admin/                 # Protected admin dashboard
│       ├── DashboardView.vue  # Admin layout wrapper
│       ├── HomeView.vue       # Admin dashboard
│       ├── BlogsView.vue      # Blog CRUD management
│       ├── CategoriesView.vue # Category management
│       ├── TagsView.vue       # Tag management
│       └── UsersView.vue      # User management (admin-only)
└── main.js                    # App entry point with axios config
```

### Vite Configuration

- **Path alias**: `@` maps to `src/`
- **Dev server**: Port 3000, auto-opens browser
- **Proxy**: `/api` → `http://localhost:8080` in development
- **Build optimization**: Manual chunks for vendor libraries (vue, router, pinia, axios)
- **Chunk size warning**: Threshold increased to 1000 KB

## Key Patterns

### Component Lazy Loading
All route components use dynamic imports: `component: () => import('../views/SomeView.vue')`

### Admin Dashboard
- Nested routes under `/admin` with `DashboardView` as layout wrapper
- Child routes render in `<router-view>` within dashboard
- Role-based access via `meta.requiresAdmin` property

### Error Handling
- 401 responses trigger automatic logout and redirect to login
- Token validation happens on store initialization and route changes
- localStorage errors are caught and handled gracefully

### Static Data
Team member information is stored in `src/data/nkgMembersData.js` as a JavaScript module, not fetched from API.

## Notes

- GSAP is installed but not heavily utilized; available for advanced animations
- Christmas decorations feature exists but can be disabled (currently disabled as of Dec 27, 2025)
- The project includes Chinese documentation (`滚动驱动叙事介绍.md`) about Apple-style scroll-driven animations
- ICP备案 and SSL certificate are configured for production deployment
- Both AnaNoSleep and NKG branding present throughout the site

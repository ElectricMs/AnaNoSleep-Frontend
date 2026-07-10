import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from './auth'

const jsonResponse = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { 'Content-Type': 'application/json' }
})

describe('auth store', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
    vi.stubGlobal('fetch', vi.fn())
  })

  it('keeps authenticated state in memory without persisting the JWT', async () => {
    fetch.mockResolvedValue(jsonResponse({
      success: true,
      data: {
        user: { id: 1, role: 'admin' }
      }
    }))
    const store = useAuthStore()

    const result = await store.login({ username: 'admin', password: 'secret' })

    expect(result.success).toBe(true)
    expect(store.isAdmin).toBe(true)
    expect(localStorage.getItem('token')).toBeNull()
    expect(localStorage.getItem('user')).toBeNull()
  })

  it('restores the session from the HttpOnly cookie through /me', async () => {
    fetch.mockResolvedValue(jsonResponse({
      success: true,
      data: { id: 1, role: 'admin' }
    }))
    const store = useAuthStore()

    expect(await store.ensureAuthenticated()).toBe(true)
    expect(store.isAdmin).toBe(true)
    expect(fetch).toHaveBeenCalledWith('/api/auth/me', expect.objectContaining({
      credentials: 'include'
    }))
  })
})

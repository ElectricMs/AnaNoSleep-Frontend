import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from './auth'

const jsonResponse = (data) => new Response(JSON.stringify(data), {
  status: 200,
  headers: { 'Content-Type': 'application/json' }
})

describe('auth store', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
    vi.stubGlobal('fetch', vi.fn())
  })

  it('keeps Pinia state and persistent login state in sync', async () => {
    fetch.mockResolvedValue(jsonResponse({
      success: true,
      data: {
        token: 'session-token',
        user: { id: 1, role: 'admin' }
      }
    }))
    const store = useAuthStore()

    const result = await store.login({ username: 'admin', password: 'secret' })

    expect(result.success).toBe(true)
    expect(store.isAdmin).toBe(true)
    expect(localStorage.getItem('token')).toBe('session-token')

    store.logout()
    expect(store.isLoggedIn).toBe(false)
    expect(localStorage.getItem('token')).toBeNull()
  })
})

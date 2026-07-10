import { beforeEach, describe, expect, it, vi } from 'vitest'
import api, { ApiError, setUnauthorizedHandler } from './api'

const jsonResponse = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { 'Content-Type': 'application/json' }
})

describe('api client', () => {
  beforeEach(() => {
    localStorage.clear()
    document.cookie = 'ananosleep_csrf=; Max-Age=0; path=/'
    setUnauthorizedHandler(null)
    vi.stubGlobal('fetch', vi.fn())
  })

  it('sends cookies, query parameters and CSRF headers without reading localStorage tokens', async () => {
    localStorage.setItem('token', 'legacy-token-that-must-be-ignored')
    document.cookie = 'ananosleep_csrf=test-csrf; path=/'
    fetch.mockResolvedValue(jsonResponse({ success: true }))

    await api.post('/api/blogs', { title: 'test' }, { params: { page: 2, keyword: '' } })

    expect(fetch).toHaveBeenCalledWith('/api/blogs?page=2', expect.objectContaining({
      credentials: 'include',
      headers: expect.objectContaining({
        'Content-Type': 'application/json',
        'X-CSRF-Token': 'test-csrf'
      })
    }))
    expect(fetch.mock.calls[0][1].headers.Authorization).toBeUndefined()
  })

  it('normalizes API errors and invokes the unauthorized handler', async () => {
    const onUnauthorized = vi.fn()
    setUnauthorizedHandler(onUnauthorized)
    fetch.mockResolvedValue(jsonResponse({ message: '登录已过期' }, 401))

    await expect(api.get('/api/private')).rejects.toMatchObject({
      name: 'ApiError',
      status: 401,
      response: { data: { message: '登录已过期' } }
    })
    expect(onUnauthorized).toHaveBeenCalledOnce()
    expect(ApiError.prototype).toBeInstanceOf(Error)
  })
})

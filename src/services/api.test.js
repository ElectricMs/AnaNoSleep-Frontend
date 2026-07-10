import { beforeEach, describe, expect, it, vi } from 'vitest'
import api, { ApiError, setUnauthorizedHandler } from './api'

const jsonResponse = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { 'Content-Type': 'application/json' }
})

describe('api client', () => {
  beforeEach(() => {
    localStorage.clear()
    setUnauthorizedHandler(null)
    vi.stubGlobal('fetch', vi.fn())
  })

  it('adds query parameters and the current bearer token', async () => {
    localStorage.setItem('token', 'test-token')
    fetch.mockResolvedValue(jsonResponse({ success: true }))

    await api.get('/api/blogs', { params: { page: 2, keyword: '' } })

    expect(fetch).toHaveBeenCalledWith('/api/blogs?page=2', expect.objectContaining({
      headers: expect.objectContaining({ Authorization: 'Bearer test-token' })
    }))
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

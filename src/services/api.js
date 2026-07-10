const DEFAULT_TIMEOUT = 10000

let unauthorizedHandler = null

export class ApiError extends Error {
  constructor(message, status = 0, data = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
    this.response = status ? { status, data } : undefined
  }
}

export const setUnauthorizedHandler = (handler) => {
  unauthorizedHandler = handler
}

export const getAuthHeaders = (headers = {}) => {
  const token = localStorage.getItem('token')
  return token
    ? { ...headers, Authorization: `Bearer ${token}` }
    : { ...headers }
}

const appendParams = (url, params) => {
  if (!params) return url

  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value))
    }
  })

  const query = searchParams.toString()
  if (!query) return url
  return `${url}${url.includes('?') ? '&' : '?'}${query}`
}

const parseResponse = async (response) => {
  if (response.status === 204) return null

  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    return response.json()
  }

  const text = await response.text()
  return text || null
}

export const request = async (url, options = {}) => {
  const {
    method = 'GET',
    params,
    body,
    headers = {},
    signal,
    timeout = DEFAULT_TIMEOUT
  } = options

  const controller = new AbortController()
  const abortFromCaller = () => controller.abort(signal?.reason)
  signal?.addEventListener('abort', abortFromCaller, { once: true })
  const timeoutId = setTimeout(() => controller.abort(new DOMException('请求超时', 'TimeoutError')), timeout)

  const requestHeaders = getAuthHeaders(headers)
  const isFormData = body instanceof FormData
  if (body !== undefined && !isFormData && !requestHeaders['Content-Type']) {
    requestHeaders['Content-Type'] = 'application/json'
  }

  try {
    const response = await fetch(appendParams(url, params), {
      method,
      headers: requestHeaders,
      body: body === undefined || isFormData ? body : JSON.stringify(body),
      signal: controller.signal
    })
    const data = await parseResponse(response)

    if (!response.ok) {
      if (response.status === 401) unauthorizedHandler?.()
      throw new ApiError(data?.message || `请求失败（${response.status}）`, response.status, data)
    }

    return { data, status: response.status, headers: response.headers }
  } finally {
    clearTimeout(timeoutId)
    signal?.removeEventListener('abort', abortFromCaller)
  }
}

const api = {
  get: (url, config = {}) => request(url, { ...config, method: 'GET' }),
  post: (url, body, config = {}) => request(url, { ...config, method: 'POST', body }),
  put: (url, body, config = {}) => request(url, { ...config, method: 'PUT', body }),
  patch: (url, body, config = {}) => request(url, { ...config, method: 'PATCH', body }),
  delete: (url, config = {}) => request(url, { ...config, method: 'DELETE' })
}

export default api

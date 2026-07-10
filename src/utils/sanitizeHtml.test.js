import { describe, expect, it } from 'vitest'
import { sanitizeBlogHtml } from './sanitizeHtml'

describe('sanitizeBlogHtml', () => {
  it('keeps supported rich text while removing executable markup', () => {
    const result = sanitizeBlogHtml(`
      <p class="lead">正文<strong>重点</strong></p>
      <img src="x" onerror="alert(1)">
      <a href="javascript:alert(1)">危险链接</a>
      <script>alert(1)</script>
    `)

    expect(result).toContain('<strong>重点</strong>')
    expect(result).not.toContain('onerror')
    expect(result).not.toContain('javascript:')
    expect(result).not.toContain('<script')
  })
})

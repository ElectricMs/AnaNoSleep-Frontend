import DOMPurify from 'dompurify'

const ALLOWED_TAGS = [
  'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'blockquote', 'pre', 'code',
  'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'img', 'span',
  'div', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'hr'
]

const ALLOWED_ATTR = [
  'href', 'name', 'target', 'rel', 'src', 'alt', 'title', 'width', 'height',
  'class', 'colspan', 'rowspan'
]

export const sanitizeBlogHtml = (html) => DOMPurify.sanitize(html, {
  ALLOWED_TAGS,
  ALLOWED_ATTR,
  ALLOW_DATA_ATTR: false
})

const createStorage = () => {
  const values = new Map()

  return {
    getItem: (key) => values.get(String(key)) ?? null,
    setItem: (key, value) => values.set(String(key), String(value)),
    removeItem: (key) => values.delete(String(key)),
    clear: () => values.clear(),
    key: (index) => [...values.keys()][index] ?? null,
    get length() {
      return values.size
    }
  }
}

Object.defineProperty(globalThis, 'localStorage', {
  configurable: true,
  value: createStorage()
})

Object.defineProperty(globalThis, 'sessionStorage', {
  configurable: true,
  value: createStorage()
})

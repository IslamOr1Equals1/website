export interface CacheAdapter {
  get<T>(key: string): Promise<T | null>
  set<T>(key: string, value: T, options?: CacheSetOptions): Promise<void>
  invalidate(key: string): Promise<void>
  invalidateTag(tag: string): Promise<void>
}

export interface CacheSetOptions {
  ttl?: number
  tags?: string[]
}

interface CacheEntry<T> {
  value: T
  expiresAt: number | null
  tags: string[]
}

class InMemoryAdapter implements CacheAdapter {
  private store = new Map<string, CacheEntry<unknown>>()
  private tagIndex = new Map<string, Set<string>>()

  async get<T>(key: string): Promise<T | null> {
    const entry = this.store.get(key) as CacheEntry<T> | undefined
    if (!entry) return null
    if (entry.expiresAt !== null && Date.now() > entry.expiresAt) {
      this.store.delete(key)
      return null
    }
    return entry.value
  }

  async set<T>(key: string, value: T, options?: CacheSetOptions): Promise<void> {
    const tags = options?.tags ?? []
    this.store.set(key, {
      value,
      expiresAt: options?.ttl ? Date.now() + options.ttl * 1000 : null,
      tags,
    })
    for (const tag of tags) {
      if (!this.tagIndex.has(tag)) this.tagIndex.set(tag, new Set())
      this.tagIndex.get(tag)!.add(key)
    }
  }

  async invalidate(key: string): Promise<void> {
    this.store.delete(key)
  }

  async invalidateTag(tag: string): Promise<void> {
    const keys = this.tagIndex.get(tag)
    if (!keys) return
    for (const key of keys) {
      this.store.delete(key)
    }
    this.tagIndex.delete(tag)
  }
}

export const cache: CacheAdapter = new InMemoryAdapter()

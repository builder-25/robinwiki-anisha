import { describe, it, expect, vi } from 'vitest'
import { checkSlugCollision, disambiguateSlug } from '../slug'

describe('disambiguateSlug', () => {
  it('returns "my-slug-2" for attempt 2', () => {
    expect(disambiguateSlug('my-slug', 2)).toBe('my-slug-2')
  })
})

describe('checkSlugCollision', () => {
  it('returns original slug if no collision', async () => {
    const exists = vi.fn().mockResolvedValue(false)
    const result = await checkSlugCollision('my-slug', exists)
    expect(result).toBe('my-slug')
  })

  it('returns slug-2 if original collides', async () => {
    const exists = vi
      .fn()
      .mockResolvedValueOnce(true) // my-slug exists
      .mockResolvedValueOnce(false) // my-slug-2 free
    const result = await checkSlugCollision('my-slug', exists)
    expect(result).toBe('my-slug-2')
  })

  it('returns slug-3 if slug and slug-2 both taken', async () => {
    const exists = vi
      .fn()
      .mockResolvedValueOnce(true) // my-slug exists
      .mockResolvedValueOnce(true) // my-slug-2 exists
      .mockResolvedValueOnce(false) // my-slug-3 free
    const result = await checkSlugCollision('my-slug', exists)
    expect(result).toBe('my-slug-3')
  })

  it('throws after 10 attempts', async () => {
    const exists = vi.fn().mockResolvedValue(true)
    await expect(checkSlugCollision('my-slug', exists)).rejects.toThrow()
  })
})

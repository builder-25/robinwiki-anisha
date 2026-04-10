import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { generateSlug, disambiguateSlug } from '../slug'

const fixturesPath = path.resolve(__dirname, '../../../../fixtures/identity-cases.json')
const fixtures = JSON.parse(fs.readFileSync(fixturesPath, 'utf-8'))

describe('generateSlug', () => {
  it('converts "Moving to Nairobi!" to "moving-to-nairobi"', () => {
    expect(generateSlug('Moving to Nairobi!')).toBe('moving-to-nairobi')
  })

  it('handles diacritics', () => {
    expect(generateSlug('Caf\u00e9 M\u00fcnchen')).toBe('cafe-munchen')
  })

  it('handles special chars', () => {
    expect(generateSlug("Dr. Smith's Notes (2026)")).toBe('dr-smiths-notes-2026')
  })

  it('trims leading/trailing hyphens', () => {
    expect(generateSlug('  --hello--world--  ')).toBe('hello-world')
  })

  it('returns "untitled" for empty string', () => {
    expect(generateSlug('')).toBe('untitled')
  })

  it('returns "untitled" for all-special-chars input', () => {
    expect(generateSlug('!!!@@@###')).toBe('untitled')
  })

  it('truncates to MAX_SLUG_LENGTH (50) without trailing hyphen', () => {
    const result = generateSlug(
      'this-is-a-very-long-title-that-should-be-truncated-at-the-maximum-slug-length-boundary'
    )
    expect(result.length).toBeLessThanOrEqual(50)
    expect(result).not.toMatch(/-$/)
  })

  it('collapses multiple spaces into single hyphen', () => {
    expect(generateSlug('Hello   World')).toBe('hello-world')
  })

  it('passes all golden fixture slug cases', () => {
    for (const fixture of fixtures.slugs) {
      expect(generateSlug(fixture.input)).toBe(fixture.expected)
    }
  })
})

describe('disambiguateSlug', () => {
  it('appends numeric suffix', () => {
    expect(disambiguateSlug('moving-to-nairobi', 2)).toBe('moving-to-nairobi-2')
  })

  it('appends different suffix numbers', () => {
    expect(disambiguateSlug('test', 10)).toBe('test-10')
  })
})

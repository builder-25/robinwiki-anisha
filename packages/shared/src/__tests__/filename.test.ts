import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { composeFilename, parseFilename } from '../filename'

const fixturesPath = path.resolve(__dirname, '../../../../fixtures/identity-cases.json')
const fixtures = JSON.parse(fs.readFileSync(fixturesPath, 'utf-8'))

describe('composeFilename', () => {
  it('composes a filename from parts', () => {
    const result = composeFilename({
      date: '20260305',
      slug: 'moving-to-nairobi',
      type: 'frag',
      ulid: '01HZY3Q9R3TSV4RRFFQ69G5FAV',
    })
    expect(result).toBe('20260305-moving-to-nairobi.frag01HZY3Q9R3TSV4RRFFQ69G5FAV.md')
  })
})

describe('parseFilename', () => {
  it('round-trips for all golden fixture filenames', () => {
    for (const fixture of fixtures.filenames) {
      const parsed = parseFilename(fixture.filename)
      const recomposed = composeFilename(parsed)
      expect(recomposed).toBe(fixture.filename)
    }
  })

  it('extracts correct date, slug, type, ulid for each fixture case', () => {
    for (const fixture of fixtures.filenames) {
      const parsed = parseFilename(fixture.filename)
      expect(parsed.date).toBe(fixture.date)
      expect(parsed.slug).toBe(fixture.slug)
      expect(parsed.type).toBe(fixture.type)
      expect(parsed.ulid).toBe(fixture.ulid)
    }
  })

  it('handles slugs with dots (e.g. "dr.smith-consultation")', () => {
    const filename = '20260110-dr.smith-consultation.person01HZY3Q9R5TSV4RRFFQ69G5FAX.md'
    const parsed = parseFilename(filename)
    expect(parsed.slug).toBe('dr.smith-consultation')
    expect(parsed.type).toBe('person')
    expect(parsed.ulid).toBe('01HZY3Q9R5TSV4RRFFQ69G5FAX')
  })

  it('throws on all invalidFilenames from golden fixtures', () => {
    for (const invalid of fixtures.invalidFilenames) {
      expect(() => parseFilename(invalid)).toThrow(/Invalid filename format/)
    }
  })

  it('composeFilename + parseFilename round-trip', () => {
    const parts = {
      date: '20260305',
      slug: 'test-slug',
      type: 'entry' as const,
      ulid: '01HZY3Q9R3TSV4RRFFQ69G5FAV',
    }
    const filename = composeFilename(parts)
    const parsed = parseFilename(filename)
    expect(parsed).toEqual(parts)
  })
})

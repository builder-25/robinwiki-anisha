import type { ObjectType } from './identity.js'

export interface FilenameParts {
  date: string
  slug: string
  type: ObjectType
  ulid: string
}

/** Compose a filename from parts: {date}-{slug}.{type}{ulid}.md */
export function composeFilename(parts: FilenameParts): string {
  return `${parts.date}-${parts.slug}.${parts.type}${parts.ulid}.md`
}

const FILENAME_RE = /^(\d{8})-(.+)\.(entry|frag|thread|person|vault)([0-9A-Z]{26})\.md$/

/** Parse a filename into parts. Throws on invalid format. */
export function parseFilename(filename: string): FilenameParts {
  const match = filename.match(FILENAME_RE)
  if (!match) throw new Error(`Invalid filename format: ${filename}`)
  return {
    date: match[1],
    slug: match[2],
    type: match[3] as ObjectType,
    ulid: match[4],
  }
}

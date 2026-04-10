/** Max slug length (keeps filenames reasonable) */
const MAX_SLUG_LENGTH = 50

/** Generate a slug from a title string */
export function generateSlug(title: string): string {
  const slug = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/['\u2019]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, MAX_SLUG_LENGTH)
    .replace(/-$/, '')

  return slug || 'untitled'
}

/** Disambiguate a slug when collision detected */
export function disambiguateSlug(slug: string, attempt: number): string {
  return `${slug}-${attempt}`
}

/** Max collision attempts before giving up */
const MAX_COLLISION_ATTEMPTS = 10

/**
 * Check for slug collisions and return a disambiguated slug if needed.
 * Tries slug, then slug-2, slug-3, etc. up to MAX_COLLISION_ATTEMPTS.
 */
export async function checkSlugCollision(
  slug: string,
  exists: (s: string) => Promise<boolean>
): Promise<string> {
  if (!(await exists(slug))) return slug

  for (let attempt = 2; attempt <= MAX_COLLISION_ATTEMPTS; attempt++) {
    const candidate = disambiguateSlug(slug, attempt)
    if (!(await exists(candidate))) return candidate
  }

  throw new Error(
    `Slug collision: could not disambiguate "${slug}" after ${MAX_COLLISION_ATTEMPTS} attempts`
  )
}

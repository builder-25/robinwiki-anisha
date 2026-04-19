import { z } from 'zod'

export interface EnvError {
  name: string
  message: string
  description?: string
}

export interface CreateConfigVarOpts<T extends Record<string, z.ZodType>> {
  schema: T
  runtimeEnv?: Record<string, string | undefined>
  onValidationError?: (errors: EnvError[]) => never
}

/**
 * Validate environment variables against a Zod schema map. Returns a frozen,
 * fully-typed object. Collects ALL validation errors before reporting, so
 * operators see every problem in one shot rather than whack-a-mole.
 *
 * Empty strings are treated as undefined — this catches the common case where
 * a deployment platform sets a var to "" instead of leaving it unset.
 */
export function createConfigVar<T extends Record<string, z.ZodType>>(
  opts: CreateConfigVarOpts<T>
): Readonly<z.infer<z.ZodObject<T>>> {
  const raw = opts.runtimeEnv ?? (process.env as Record<string, string | undefined>)
  const errors: EnvError[] = []
  const result: Record<string, unknown> = {}

  for (const key of Object.keys(opts.schema)) {
    const schema = opts.schema[key]
    let value: string | undefined = raw[key]

    // Empty strings -> undefined (emptyStringAsUndefined)
    if (value === '') {
      value = undefined
    }

    const parsed = schema.safeParse(value)

    if (!parsed.success) {
      const zodError = parsed.error
      const firstIssue = zodError.issues?.[0]
      // Use the Zod error message but never include the raw value
      const message = firstIssue?.message ?? 'Invalid value'

      errors.push({
        name: key,
        message,
        description: schema.description,
      })
    } else {
      result[key] = parsed.data
    }
  }

  if (errors.length > 0) {
    if (opts.onValidationError) {
      opts.onValidationError(errors)
    }
    defaultErrorHandler(errors)
  }

  return Object.freeze(result) as Readonly<z.infer<z.ZodObject<T>>>
}

function defaultErrorHandler(errors: EnvError[]): never {
  console.error('\nEnvironment validation failed:\n')

  // Calculate column widths for alignment
  const nameWidth = Math.max(...errors.map((e) => e.name.length))
  const descWidth = Math.max(...errors.map((e) => (e.description ?? '').length))

  for (const err of errors) {
    const name = err.name.padEnd(nameWidth)
    const desc = (err.description ?? '').padEnd(descWidth)
    console.error(`  ${name}  ${desc}  ${err.message}`)
  }

  console.error('\nFix these environment variables and restart.\n')
  process.exit(1)
}

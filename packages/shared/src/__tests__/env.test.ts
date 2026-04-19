import { describe, it, expect, vi, afterEach } from 'vitest'
import { z } from 'zod'
import { createConfigVar, type EnvError } from '../env'

describe('createConfigVar', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns a frozen object with correct typed values when all required vars are present', () => {
    const env = createConfigVar({
      schema: {
        DB_URL: z.string().min(1).describe('Database URL'),
        PORT: z.coerce.number().describe('Server port'),
      },
      runtimeEnv: { DB_URL: 'postgres://localhost/test', PORT: '5432' },
    })

    expect(env.DB_URL).toBe('postgres://localhost/test')
    expect(env.PORT).toBe(5432)
    expect(Object.isFrozen(env)).toBe(true)
  })

  it('calls the error handler with an error listing the missing var name and its description', () => {
    const errors: EnvError[] = []
    const handler = (errs: EnvError[]): never => {
      errors.push(...errs)
      throw new Error('validation failed')
    }

    expect(() =>
      createConfigVar({
        schema: {
          DB_URL: z.string().min(1).describe('Postgres connection string'),
        },
        runtimeEnv: {},
        onValidationError: handler,
      })
    ).toThrow('validation failed')

    expect(errors).toHaveLength(1)
    expect(errors[0].name).toBe('DB_URL')
    expect(errors[0].description).toBe('Postgres connection string')
  })

  it('collects ALL errors and reports them all at once', () => {
    const errors: EnvError[] = []
    const handler = (errs: EnvError[]): never => {
      errors.push(...errs)
      throw new Error('validation failed')
    }

    expect(() =>
      createConfigVar({
        schema: {
          DB_URL: z.string().min(1).describe('Database URL'),
          REDIS_URL: z.string().min(1).describe('Redis URL'),
          SECRET: z.string().min(32).describe('A secret key'),
        },
        runtimeEnv: {},
        onValidationError: handler,
      })
    ).toThrow('validation failed')

    expect(errors).toHaveLength(3)
    expect(errors.map((e) => e.name)).toEqual(['DB_URL', 'REDIS_URL', 'SECRET'])
  })

  it('treats empty strings as missing (emptyStringAsUndefined)', () => {
    const errors: EnvError[] = []
    const handler = (errs: EnvError[]): never => {
      errors.push(...errs)
      throw new Error('validation failed')
    }

    expect(() =>
      createConfigVar({
        schema: {
          DB_URL: z.string().min(1).describe('Database URL'),
        },
        runtimeEnv: { DB_URL: '' },
        onValidationError: handler,
      })
    ).toThrow('validation failed')

    expect(errors).toHaveLength(1)
    expect(errors[0].name).toBe('DB_URL')
  })

  it('coerces numeric strings with z.coerce.number()', () => {
    const env = createConfigVar({
      schema: {
        PORT: z.coerce.number().describe('Server port'),
      },
      runtimeEnv: { PORT: '8080' },
    })

    expect(env.PORT).toBe(8080)
  })

  it('uses defaults when var is absent', () => {
    const env = createConfigVar({
      schema: {
        PORT: z.coerce.number().default(3000).describe('Server port'),
        NODE_ENV: z.string().default('development').describe('Environment'),
      },
      runtimeEnv: {},
    })

    expect(env.PORT).toBe(3000)
    expect(env.NODE_ENV).toBe('development')
  })

  it('does not error on absent optional vars', () => {
    const env = createConfigVar({
      schema: {
        DB_URL: z.string().min(1).describe('Database URL'),
        DEBUG: z.string().optional().describe('Debug flag'),
      },
      runtimeEnv: { DB_URL: 'postgres://localhost/test' },
    })

    expect(env.DB_URL).toBe('postgres://localhost/test')
    expect(env.DEBUG).toBeUndefined()
  })

  it('returns a frozen object (Object.isFrozen)', () => {
    const env = createConfigVar({
      schema: {
        FOO: z.string().default('bar'),
      },
      runtimeEnv: {},
    })

    expect(Object.isFrozen(env)).toBe(true)
  })

  it('passes errors to custom onValidationError handler', () => {
    const captured: EnvError[] = []
    const handler = (errs: EnvError[]): never => {
      captured.push(...errs)
      throw new Error('custom handler')
    }

    expect(() =>
      createConfigVar({
        schema: {
          MISSING: z.string().min(1).describe('Something required'),
        },
        runtimeEnv: {},
        onValidationError: handler,
      })
    ).toThrow('custom handler')

    expect(captured).toHaveLength(1)
    expect(captured[0].name).toBe('MISSING')
    expect(captured[0].description).toBe('Something required')
    expect(captured[0].message).toBeTruthy()
  })

  it('calls process.exit(1) with default error handler', () => {
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('process.exit called')
    })
    const stderrSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() =>
      createConfigVar({
        schema: {
          REQUIRED_VAR: z.string().min(1).describe('A required variable'),
        },
        runtimeEnv: {},
      })
    ).toThrow('process.exit called')

    expect(exitSpy).toHaveBeenCalledWith(1)
    expect(stderrSpy).toHaveBeenCalled()
  })

  it('never includes env var values in error messages (T-df2-01 threat mitigation)', () => {
    const errors: EnvError[] = []
    const handler = (errs: EnvError[]): never => {
      errors.push(...errs)
      throw new Error('validation failed')
    }

    expect(() =>
      createConfigVar({
        schema: {
          KEY: z.string().regex(/^[a-f0-9]{64}$/).describe('64 hex chars'),
        },
        runtimeEnv: { KEY: 'not-a-valid-hex-key-secret-value' },
        onValidationError: handler,
      })
    ).toThrow('validation failed')

    // Error message should NOT contain the actual value
    expect(errors[0].message).not.toContain('not-a-valid-hex-key-secret-value')
  })
})

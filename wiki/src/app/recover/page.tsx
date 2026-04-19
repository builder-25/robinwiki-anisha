'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RecoverPage() {
  const router = useRouter()
  const [secretKey, setSecretKey] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch('/auth/recover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secretKey }),
      })

      if (res.ok) {
        setSuccess(true)
        setTimeout(() => router.push('/login'), 2000)
      } else if (res.status === 403) {
        setError('Invalid server secret key')
      } else if (res.status === 429) {
        setError('Too many attempts. Try again in 1 minute.')
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: 8,
    fontSize: 14,
    boxSizing: 'border-box' as const,
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 360 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>
          Reset Password
        </h1>

        <p style={{ fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 24 }}>
          Enter the server secret key to reset your password to the current initial password value.
        </p>

        {success ? (
          <p style={{ color: '#16a34a', fontSize: 14, textAlign: 'center' }}>
            Password has been reset. Redirecting to login...
          </p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label htmlFor="secretKey" style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 4 }}>
                Server Secret Key
              </label>
              <input
                id="secretKey"
                type="password"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            {error && <p style={{ color: '#dc2626', fontSize: 14, margin: 0 }}>{error}</p>}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '10px 0',
                background: '#111',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontSize: 14,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.5 : 1,
              }}
            >
              {loading ? 'Please wait...' : 'Reset Password'}
            </button>
          </form>
        )}

        <p style={{ fontSize: 14, textAlign: 'center', marginTop: 16, color: '#666' }}>
          <a
            href="/login"
            style={{ color: '#111', textDecoration: 'underline', fontSize: 14 }}
          >
            Back to login
          </a>
        </p>
      </div>
    </div>
  )
}

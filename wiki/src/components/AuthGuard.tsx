'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useSession } from '@/hooks/useSession'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, isLoading } = useSession()

  const isPublicPath = pathname === '/login' || pathname === '/recover'

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isPublicPath) {
      router.push('/login')
    }
  }, [isLoading, isAuthenticated, isPublicPath, router])

  if (isLoading) return null
  if (!isAuthenticated && !isPublicPath) return null

  return <>{children}</>
}

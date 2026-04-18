'use client'

import { useQuery } from '@tanstack/react-query'
import { getUserProfile } from '@/lib/api'

export function useProfile(opts?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await getUserProfile()
      return data
    },
    enabled: opts?.enabled ?? true,
  })
}

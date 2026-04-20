'use client'

import { useQuery } from '@tanstack/react-query'
import { getEntry } from '@/lib/api'

export function useEntry(id: string | undefined) {
  return useQuery({
    queryKey: ['entry', id],
    queryFn: async () => {
      const { data } = await getEntry({ path: { id: id! } })
      return data
    },
    enabled: !!id,
  })
}

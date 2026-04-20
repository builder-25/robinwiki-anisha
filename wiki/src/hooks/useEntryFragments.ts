'use client'

import { useQuery } from '@tanstack/react-query'
import { listEntryFragments } from '@/lib/api'

export function useEntryFragments(entryId: string | undefined) {
  return useQuery({
    queryKey: ['entry-fragments', entryId],
    queryFn: async () => {
      const { data } = await listEntryFragments({ path: { id: entryId! } })
      return data
    },
    enabled: !!entryId,
  })
}

'use client'

import { useQuery } from '@tanstack/react-query'
import { listWikis } from '@/lib/api'

export function useWikis() {
  return useQuery({
    queryKey: ['wikis'],
    queryFn: async () => {
      const { data } = await listWikis()
      return data
    },
  })
}

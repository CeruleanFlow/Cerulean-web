import { defineStore } from 'pinia'
import { listPapers } from '@/api/papers'
import type { Paper } from '@/types/api'

export const usePaperStore = defineStore('papers', {
  state: () => ({
    items: [] as Paper[],
    loading: false,
    error: ''
  }),
  actions: {
    async refresh() {
      this.loading = true
      this.error = ''
      try {
        this.items = await listPapers()
      } catch (err) {
        this.error = err instanceof Error ? err.message : String(err)
      } finally {
        this.loading = false
      }
    }
  }
})

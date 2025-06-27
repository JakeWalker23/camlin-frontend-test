import { defineStore } from 'pinia'

export const useDataStore = defineStore('asset', {
  state: () => ({
    assets: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchAssets() {
      this.loading = true
      this.error   = null

      try {
        
        const res = await fetch(
          `${process.env.VUE_APP_API_URL}/transformers`,
          { headers: { Authorization: `Bearer ${process.env.VUE_APP_JWT_TOKEN}` } }
        )

        if (!res.ok) {
          const text = await res.text()
          throw new Error(`HTTP ${res.status}: ${text}`)
        }

        this.assets = await res.json()
      } catch (e) {
        this.error = e.message
      } finally {
        this.loading = false
      }
    }
  }
})

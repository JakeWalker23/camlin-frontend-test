import { defineStore } from 'pinia'

export const useFilterStore = defineStore('filters', {
  state: () => ({
    dateRange: { start: '', end: '' },
    statuses:  []
  }),
  actions: {
    setDateRange(range) {
      this.dateRange = range
    },
    setStatuses(list) {
      this.statuses = list
    }
  }
})
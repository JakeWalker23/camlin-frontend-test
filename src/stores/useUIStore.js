import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    dateRange:       { start: '', end: '' },
    selectedStatus:  [],
    chartSelections: [],
    openMenuAssetId: null,
  }),
  persist: {
    paths: [
      'dateRange',
      'selectedStatus',
      'chartSelections',
      'openMenuAssetId'
    ]
  }
})
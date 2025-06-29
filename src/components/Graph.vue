<template>
  <div class="mx-auto w-full md:w-[70%] mt-8 bg-gray-900 rounded-lg p-6">

    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold text-white">Voltage Over Time</h2>

      <div class="flex space-x-4">
        <label
          v-for="asset in data.assets"
          :key="asset.assetId"
          class="inline-flex items-center text-sm text-white cursor-pointer"
        >
          <input
            type="checkbox"
            v-model="ui.chartSelections"
            :value="asset.assetId"
            class="form-checkbox h-4 w-4 text-blue-400 bg-gray-700 border-gray-600 rounded"
          />
          <span class="ml-2 truncate" style="max-width: 6rem;">{{ asset.name.replace('Transformer', ' ') }}</span>
        </label>
      </div>
    </div>

    <apexchart
      type="line"
      height="320"
      :options="chartOptions"
      :series="filteredSeries"
      class="mt-4"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import VueApexCharts from 'vue3-apexcharts';
import  { useDataStore } from '@/stores/useDataStore'
import  { useUiStore } from '@/stores/useUIStore'

const data = useDataStore()
const ui = useUiStore()

const route = useRoute();
const clickedId = parseInt(route.params.id, 10);

const selectedIds = ref([clickedId]);

const allSeries = computed(() =>
  data.assets.map(asset => ({
    name: asset.name,
    data: asset.lastTenVoltgageReadings.map(r => [
      new Date(r.timestamp).getTime(),
      Number(r.voltage)
    ])
  }))
);

const filteredSeries = computed(() =>
  allSeries.value.filter((_, idx) =>
    ui.chartSelections.includes(data.assets[idx].assetId)
  )
);

const chartOptions = {
  chart: { id: 'voltage-chart', toolbar: { show: false } },
  theme: { mode: 'dark' },
  stroke: { curve: 'smooth', width: 2 },
  xaxis: { type: 'datetime', labels: { style: { colors: '#bbb' } } },
  yaxis: { labels: { style: { colors: '#bbb' } } },
  legend: { show: true, labels: { colors: '#fff' } },
  tooltip: { enabled: true }
};

onMounted(() => {
  data.fetchAssets()
  
  if (!ui.chartSelections.length && !isNaN(clickedId)) {
    ui.chartSelections = [clickedId]
  }
});
</script>

<style scoped>
.form-checkbox {
  accent-color: #3C9FE2;
}
</style>

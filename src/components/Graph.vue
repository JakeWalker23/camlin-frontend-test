<template>
  <div class="mx-auto w-full md:w-[70%] mt-8 bg-gray-900 rounded-lg p-6">
    <!-- Panel Header -->
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold text-white">Voltage Over Time</h2>
      <!-- Transformer checkboxes -->
      <div class="flex space-x-4">
        <label
          v-for="asset in assets"
          :key="asset.assetId"
          class="inline-flex items-center text-sm text-white cursor-pointer"
        >
          <input
            type="checkbox"
            v-model="selectedIds"
            :value="asset.assetId"
            class="form-checkbox h-4 w-4 text-blue-400 bg-gray-700 border-gray-600 rounded"
          />
          <span class="ml-2 truncate" style="max-width: 6rem;">{{ asset.name }}</span>
        </label>
      </div>
    </div>

    <!-- Chart -->
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
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import VueApexCharts from 'vue3-apexcharts';
import data from '@/data/readings.json';

// 1. Load all assets internally
const assets = data;

// 2. Grab the `id` param from the URL
const route = useRoute();
const clickedId = parseInt(route.params.id, 10);

// 3. Initialize selection to just that one
const selectedIds = ref([clickedId]);

// 4. Build series for every asset
const allSeries = computed(() =>
  assets.map(asset => ({
    name: asset.name,
    data: asset.lastTenVoltgageReadings.map(r => [
      new Date(r.timestamp).getTime(),
      Number(r.voltage)
    ])
  }))
);

// 5. Filter by the checkboxes
const filteredSeries = computed(() =>
  allSeries.value.filter((_, idx) =>
    selectedIds.value.includes(assets[idx].assetId)
  )
);

// 6. ApexCharts config (dark theme, time axis, etc.)
const chartOptions = {
  chart: { id: 'voltage-chart', toolbar: { show: false } },
  theme: { mode: 'dark' },
  stroke: { curve: 'smooth', width: 2 },
  xaxis: { type: 'datetime', labels: { style: { colors: '#bbb' } } },
  yaxis: { labels: { style: { colors: '#bbb' } } },
  legend: { show: true, labels: { colors: '#fff' } },
  tooltip: { enabled: true }
};
</script>

<style scoped>
.form-checkbox {
  accent-color: #3C9FE2;
}
</style>

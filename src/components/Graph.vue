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
          class="inline-flex items-center text-sm text-white"
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
import { ref, computed, onMounted, defineComponent } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import data from '@/data/readings.json';

// Register the ApexCharts component locally
defineComponent({ components: { apexchart: VueApexCharts } });

const assets = ref([]);
const selectedIds = ref([]);

onMounted(() => {
  assets.value = data;
  // Initially select all transformers
  selectedIds.value = data.map(a => a.assetId);
});

// Build the full series array
const allSeries = computed(() =>
  assets.value.map(asset => ({
    name: asset.name,
    data: asset.lastTenVoltgageReadings.map(r => [
      new Date(r.timestamp).getTime(),
      Number(r.voltage)
    ])
  }))
);

// Filter series based on selectedIds
const filteredSeries = computed(() =>
  allSeries.value.filter((s, idx) =>
    selectedIds.value.includes(assets.value[idx].assetId)
  )
);

// Chart configuration
const chartOptions = {
  chart: {
    id: 'voltage-chart',
    toolbar: { show: false }
  },
  theme: { mode: 'dark' },
  stroke: { curve: 'smooth', width: 2 },
  xaxis: {
    type: 'datetime',
    labels: { style: { colors: '#bbb' } }
  },
  yaxis: {
    labels: { style: { colors: '#bbb' } }
  },
  legend: { show: true, labels: { colors: '#fff' } },
  tooltip: { enabled: true }
};
</script>

<style scoped>
/* Ensure checkboxes match dark theme */
.form-checkbox {
  accent-color: #3C9FE2;
}
</style>
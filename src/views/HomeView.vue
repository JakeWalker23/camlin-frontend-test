<template>
  <div id="app" class="min-h-screen bg-white p-6">
    <div class="mx-auto w-full md:w-[70%] flex items-center justify-between mb-4">
      <DateFilter v-model="dateRange" />
      <!-- pass the same options to StatusFilter -->
      <StatusFilter
        v-model="selectedStatus"
        :options="statusOptions"
      />
    </div>

    <!-- Data Table -->
    <AssetTable
      :assets="filteredAssets"
      :open-menu-asset-id="openMenuAssetId"
      @toggle-menu="toggleMenu"
      @row-click="onRowClick"

    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, defineComponent } from 'vue';
import DateFilter   from '@/components/DateFilter.vue';
import StatusFilter from '@/components/StatusFilter.vue';
import AssetTable   from '@/components/AssetTable.vue';
import data from '@/data/readings.json';

// 1) Define your status options centrally:
const statusOptions = ['Excellent', 'Good', 'Fair', 'Poor', 'Critical'];

// 2) Initialize selectedStatus to _all_ of them:
const selectedStatus = ref([...statusOptions]);

const assets           = ref([]);
const dateRange        = ref({ start: '', end: '' });
const openMenuAssetId = ref(null);

onMounted(() => {
  assets.value = data;
  document.addEventListener('click', () => { openMenuAssetId.value = null });
});
onBeforeUnmount(() => {
  document.removeEventListener('click', () => {});
});

function toggleMenu(id) {
  openMenuAssetId.value = openMenuAssetId.value === id ? null : id;
}

function onRowClick(asset) {
  router.push({ name: 'Graph', params: { id: asset.assetId }});
}

const filteredAssets = computed(() =>
  assets.value.filter(a => {
    // Status filter: only include assets whose health is in the selectedStatus array
    if (!selectedStatus.value.includes(a.health)) {
      return false;
    }
    // Date-range filter (latest reading)
    const { start, end } = dateRange.value;
    if (start && end) {
      const ts = a.lastTenVoltgageReadings[0]?.timestamp;
      const d  = ts && new Date(ts);
      if (!d || d < new Date(start) || d > new Date(end)) {
        return false;
      }
    }
    return true;
  })
);
</script>

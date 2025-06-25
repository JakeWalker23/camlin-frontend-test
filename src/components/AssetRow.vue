<template>
  <div class="relative flex items-center bg-gray-900 text-white px-6 py-4 hover:bg-gray-800 cursor-pointer" @click="emitRowClick">
    <div class="w-1/5">
      <div class="text-sm font-semibold truncate">{{ asset.name }}</div>
      <div class="text-xs text-gray-400 truncate">{{ asset.region }}</div>
    </div>

    <div class="w-1/5">
      <div class="text-xs text-gray-400 uppercase">Status</div>
      <div class="mt-1 flex items-center">
        <span class="w-2 h-2 rounded-full mr-2" :class="dotColorMap[asset.health]"></span>
        <span class="text-sm font-medium">{{ asset.health }}</span>
      </div>
    </div>

    <div class="w-1/5">
      <div class="text-xs text-gray-400 uppercase">Voltage</div>
      <div class="mt-1 text-sm">{{ latestReading.voltage }} V</div>
    </div>

    <div class="w-1/5">
      <div class="text-xs text-gray-400 uppercase">Date</div>
      <div class="mt-1 text-sm">{{ formattedDate }}</div>
    </div>

    <div class="w-1/5 flex justify-end relative">
      <button @click.stop="emitToggle" class="p-2 rounded-full hover:bg-gray-800" aria-label="Open menu">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4z"/>
        </svg>
      </button>

      <Menu v-if="isMenuOpen" :asset-id="asset.assetId" :actions="['View Graph','Test','Test']" :separatorIndex="2"/>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';
import Menu from '@/components/Menu'; 

const props = defineProps({
  asset:       { type: Object, required: true },
  isMenuOpen:  { type: Boolean, default: false }
});
const emit = defineEmits(['toggle-menu','row-click']);

function emitToggle() {
  emit('toggle-menu', props.asset.assetId);
}

function emitRowClick() {
  emit('row-click', props.asset.assetId)
}

const latestReading = computed(() => props.asset.lastTenVoltgageReadings[0] || {});
const formattedDate = computed(() => {
  const ts = latestReading.value.timestamp;
  if (!ts) return '';
  return new Date(ts).toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', year: 'numeric'
  });
});

const dotColorMap = {
  Excellent: 'bg-blue-400',
  Good:      'bg-green-400',
  Fair:      'bg-yellow-400',
  Poor:      'bg-orange-400',
  Critical:  'bg-red-400'
};
</script>



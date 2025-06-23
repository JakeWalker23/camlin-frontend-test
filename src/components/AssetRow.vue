<template>
  <div class="flex items-center justify-between py-4 hover:bg-zinc-800 px-2 rounded-lg transition-colors duration-150">
    <!-- Left block -->
    <div class="flex flex-col">
      <div class="font-medium text-lg">{{ asset.name }}</div>
      <div class="text-sm text-zinc-400">ID: {{ asset.assetId }} | Region: {{ asset.region }}</div>
    </div>

    <!-- Status -->
    <div class="flex items-center space-x-2">
      <span
        class="w-2.5 h-2.5 rounded-full"
        :class="statusColor(asset.health)"
      ></span>
      <span class="text-sm text-zinc-300">{{ asset.health }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  asset: Object
})

const statusColor = (health) => {
  switch (health.toLowerCase()) {
    case 'excellent':
      return 'bg-green-500'
    case 'warning':
      return 'bg-yellow-500'
    case 'critical':
      return 'bg-red-500'
    default:
      return 'bg-zinc-400'
  }
}
</script>
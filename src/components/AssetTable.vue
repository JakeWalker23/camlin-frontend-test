<template>
  <div class="bg-zinc-900 text-white rounded-xl shadow-md p-4">
    <div class="text-xl font-semibold mb-4">Assets</div>
    <div class="divide-y divide-zinc-700">
      <AssetRow
        v-for="asset in assets"
        :key="asset.assetId"
        :asset="asset"
      />
    </div>
  </div>
</template>

<script setup>
import AssetRow from './AssetRow.vue'

const props = defineProps({
  assets: Array
})
</script>
<template>
  <div class="mx-auto w-full md:w-[70%] mt-2">
    <div class="bg-gray-900 rounded-lg divide-y divide-gray-800 overflow-hidden">
     <AssetRow
         v-for="asset in assets"
        :key="asset.assetId"
        :asset="asset"
        :is-menu-open="openMenuAssetId === asset.assetId"
        @toggle-menu="toggleMenu"
      @row-click="emit('row-click',$event)"
    />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import AssetRow from './AssetRow.vue';

const props = defineProps({
  assets: { type: Array, required: true },
  openMenuAssetId: { type: [Number, String, null], default: null }
});
const emit = defineEmits(['toggle-menu','row-click']);
function toggleMenu(id) { emit('toggle-menu', id); }
</script>

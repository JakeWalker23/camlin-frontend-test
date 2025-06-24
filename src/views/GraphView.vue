<template>
  <div class="min-h-screen bg-white p-6">
    <button @click="goBack" class="mb-4 text-blue-600">← Back</button>
    <Graph :assets="[asset]" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import data from '@/data/readings.json';
import Graph from '@/components/Graph.vue';

const route = useRoute();
const router = useRouter();
const asset = ref(null);

onMounted(() => {
  const id = parseInt(route.params.id, 10);
  asset.value = data.find(a => a.assetId === id) || null;
});

function goBack() {
  router.back();
}

</script>
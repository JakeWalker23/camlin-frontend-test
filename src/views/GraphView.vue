<template>
  <div class="min-h-screen bg-white p-6">
    <button @click="goBack" class="mb-4 text-blue-600">← Back</button>
    <Graph />
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import data from '@/data/readings.json';
import Graph from '@/components/Graph.vue';

const route  = useRoute();
const router = useRouter();

const selectedId = computed(() =>
  parseInt(route.params.id, 10)
);

function goBack() {
  router.back();
}
</script>
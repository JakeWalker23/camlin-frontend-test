<template>
  <div
    class="absolute right-0 mt-2 w-40 bg-white text-gray-900 rounded-md shadow-lg z-10 overflow-hidden"
    @click.stop
  >
    <ul>
      <li
        v-for="(action, idx) in actions"
        :key="idx"
        @click="goToGraph"
        :class="[
          'px-4 py-2 hover:bg-gray-100 cursor-pointer',
          idx === separatorIndex ? 'border-t border-gray-200' : ''
        ]"
      >
        {{ action }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  assetId: {
    type: [String, Number],
    required: true
  },
  actions: {
    type: Array,
    default: () => ['View Graph', 'Test', 'Test']
  },
  separatorIndex: {
    type: Number,
    default: 2
  }
});

const router = useRouter();

function goToGraph() {
  router.push({ name: 'Graph', params: { id: props.assetId } });
}
</script>

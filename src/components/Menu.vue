<template>
  <div
    class="absolute right-0 mt-2 w-40 bg-white text-gray-900 rounded-md shadow-lg z-10 overflow-hidden"
    @click.stop
  >
    <ul>
      <li
        v-for="(action, idx) in props.actions"
        :key="idx"
        :class="[
          'px-4 py-2 hover:bg-gray-100 cursor-pointer',
          idx === props.separatorIndex ? 'border-t border-gray-200' : ''
        ]"
      >
        {{ action }}
      </li>
    </ul>
  </div>
</template>
<script setup>
// No imports of Menu.vue here—this is the leaf component, so it only defines props.
import { defineProps } from 'vue';

const props = defineProps({
  actions: {
    type: Array,
    default: () => ['Instant Rollback', 'Promote', 'Redeploy']
  },
  separatorIndex: {
    type: Number,
    default: 2
  }
});
</script>
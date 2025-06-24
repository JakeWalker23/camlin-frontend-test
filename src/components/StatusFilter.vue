<template>
  <div class="relative inline-block status-filter">
    <button
      @click.stop="toggleOpen"
      class="flex items-center w-54 bg-gray-900 text-white rounded border border-gray-700 hover:bg-gray-800"
    >
      <div class="flex-shrink-0 flex items-center space-x-1 px-3">
        <span
          v-for="opt in options"
          :key="opt"
          class="w-1.5 h-1.5 rounded-full"
          :class="modelValue.includes(opt) ? dotColorMap[opt] : 'bg-gray-700'"
        ></span>
      </div>

      <div class="flex-1 text-center py-2">
        <span class="text-sm text-white">
          Status
        </span>
        <span class="text-sm">
          {{ modelValue.length }}/{{ options.length }}
        </span>
      </div>

      <div class="flex-shrink-0 px-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </button>

    <div
      v-if="open"
      class="absolute right-0 mt-2 w-48 bg-gray-900 text-white rounded shadow-lg z-10 overflow-hidden"
    >
      <ul class="divide-y divide-gray-800">
        <li
          v-for="opt in options"
          :key="opt"
          @click.stop="selectOption(opt)"
          class="flex items-center px-4 py-2 hover:bg-gray-800 cursor-pointer"
        >
          <span
            class="w-2 h-2 rounded-full mr-2"
            :class="dotColorMap[opt] || 'bg-gray-500'"
          ></span>
          <span class="flex-1 text-sm">{{ opt }}</span>
          <input
            type="checkbox"
            class="form-checkbox text-blue-500"
            :checked="modelValue.includes(opt)"
            readonly
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  options: {
    type: Array,
    default: () => ['Excellent', 'Good', 'Fair', 'Poor', 'Critical']
  }
});
const emit = defineEmits(['update:modelValue']);

const open = ref(false);
function toggleOpen() {
  open.value = !open.value;
}
function selectOption(opt) {
  const idx = props.modelValue.indexOf(opt);
  const next =
    idx === -1
      ? [...props.modelValue, opt]
      : props.modelValue.filter(x => x !== opt);
  emit('update:modelValue', next);
}

// close when clicking outside
function onClickOutside(e) {
  if (!e.target.closest('.status-filter')) open.value = false;
}
onMounted(() => document.addEventListener('click', onClickOutside));
onBeforeUnmount(() => document.removeEventListener('click', onClickOutside));

// Map statuses to dot colors
const dotColorMap = {
  Excellent: 'bg-blue-400',
  Good:      'bg-green-400',
  Fair:      'bg-yellow-400',
  Poor:      'bg-orange-400',
  Critical:  'bg-red-400'
};
</script>

<style scoped>
.form-checkbox {
  accent-color: #3C9FE2;
}
</style>

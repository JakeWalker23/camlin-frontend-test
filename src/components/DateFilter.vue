<template>
  <div class="relative inline-block text-left">
    <!-- Trigger button -->
    <button
      @click="open = !open"
      class="px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded flex items-center space-x-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
           viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10m-13 4h16m-7 4h7"/>
      </svg>
      <span>Select Date Range</span>
    </button>

    <!-- Popover -->
    <div
      v-if="open"
      class="absolute z-20 mt-2 w-64 bg-gray-800 text-black rounded shadow-lg p-4"
    >
      <div class="space-y-4">
        <!-- Start -->
        <div>
          <label class="block text-xs font-medium text-white">Start</label>
          <input
            type="datetime-local"
            v-model="local.start"
            class="mt-1 w-full px-3 py-2 border rounded text-sm"
          />
        </div>

        <!-- End -->
        <div>
          <label class="block text-xs font-medium text-white">End</label>
          <input
            type="datetime-local"
            v-model="local.end"
            class="mt-1 w-full px-3 py-2 border rounded text-sm"
          />
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-2">
          <button @click="cancel" class="px-3 py-1 text-sm text-white">Cancel</button>
          <button @click="apply" class="px-3 py-1 bg-blue-600 text-white rounded text-sm">Apply</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

// v-model value: { start: string, end: string }
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ start: '', end: '' })
  }
});
const emit = defineEmits(['update:modelValue']);

const open = ref(false);

// Local copy so we don't emit on every change
const local = ref({ start: props.modelValue.start, end: props.modelValue.end });

// Keep local in sync if parent resets the modelValue
watch(
  () => props.modelValue,
  (nv) => {
    local.value = { start: nv.start, end: nv.end };
  }
);

function apply() {
  // Only emit when user clicks Apply
  emit('update:modelValue', { ...local.value });
  open.value = false;
}

function cancel() {
  // revert and close
  local.value = { start: props.modelValue.start, end: props.modelValue.end };
  open.value = false;
}
</script>

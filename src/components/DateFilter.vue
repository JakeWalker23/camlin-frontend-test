<template>
  <div class="relative inline-block text-left">
    <button
      ref="trigger"
      @click="open = !open"
      class="px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded flex items-center space-x-2"
    >

    <img :src="Calender" alt="Calendar" class="w-5 h-5 text-gray-300" />
      <span>Select Date Range</span>
    </button>

    <transition name="fade">
      <div
        v-show="open"
        ref="popover"
        class="absolute z-50 mt-2 w-60 bg-gray-800 text-white rounded-lg shadow-lg p-4"
      >

        <div class="flex items-center justify-between mb-2">
          <button @click="prevMonth" class="text-gray-300 hover:text-white">←</button>
          <span class="font-medium">
            {{ monthNames[currentMonth] }} {{ currentYear }}
          </span>
          <button @click="nextMonth" class="text-gray-300 hover:text-white">→</button>
        </div>

        <div class="grid grid-cols-7 text-xs text-gray-400 mb-1">
          <div v-for="wd in weekDays" :key="wd">{{ wd }}</div>
        </div>

        <div class="grid grid-cols-7 gap-0.5">
          <div
            v-for="(day, idx) in calendarDays"
            :key="idx"
            class="h-8 flex items-center justify-center rounded cursor-pointer text-sm"
            :class="{
              'bg-blue-600 text-white': isInRange(day),
              'hover:bg-gray-700': day
            }"
            @click="day && onClickDate(day)"
          >
            <span v-if="day">{{ day }}</span>
          </div>
        </div>

        <div class="mt-3 space-y-3">
          <div>
            <label class="block text-xs">Start</label>
            <input
              type="datetime-local"
              v-model="local.start"
              class="mt-1 w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-sm text-white"
            />
          </div>
          <div>
            <label class="block text-xs">End</label>
            <input
              type="datetime-local"
              v-model="local.end"
              class="mt-1 w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-sm text-white"
            />
          </div>
        </div>

        <div class="mt-4 flex justify-end space-x-2">
          <button @click="cancel" class="px-3 py-1 text-sm text-gray-300 hover:text-white">
            Cancel
          </button>
          <button @click="apply" class="px-3 py-1 bg-blue-600 text-sm rounded hover:bg-blue-700">
            Apply
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, defineProps, defineEmits } from 'vue';
import Calender from '@/assets/Calender.svg'

const props = defineProps({
  modelValue: { type: Object, default: () => ({ start: '', end: '' }) }
});
const emit = defineEmits(['update:modelValue']);

const open     = ref(false);
const local    = ref({ ...props.modelValue });
watch(() => props.modelValue, v => (local.value = { ...v }));

const trigger     = ref(null), popover = ref(null);
const today       = new Date();
const currentYear = ref(today.getFullYear());
const currentMonth= ref(today.getMonth());

const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const weekDays   = ['Su','Mo','Tu','We','Th','Fr','Sa'];

const calendarDays = computed(() => {
  const firstDay   = new Date(currentYear.value, currentMonth.value, 1).getDay();
  const daysInMonth= new Date(currentYear.value, currentMonth.value+1, 0).getDate();
  const pad        = Array(firstDay).fill(null);
  const days       = Array.from({ length: daysInMonth }, (_, i) => i+1);
  return [...pad, ...days];
});

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
}
function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
}

function onClickDate(day) {
  const dt = new Date(currentYear.value, currentMonth.value, day);
  if (!local.value.start || (local.value.start && local.value.end)) {
    local.value.start = toDateTimeLocal(dt);
    local.value.end = '';
  } else {
    local.value.end = toDateTimeLocal(dt);
  }
}

function isInRange(day) {
  if (!day) return false;
  const y = currentYear.value, m = currentMonth.value;
  const val = new Date(y,m,day).setHours(0,0,0,0);
  const start = local.value.start ? new Date(local.value.start).setHours(0,0,0,0) : null;
  const end   = local.value.end   ? new Date(local.value.end).setHours(0,0,0,0)   : null;
  return start && end ? val >= start && val <= end : val === start;
}

function apply() {
  emit('update:modelValue', { ...local.value });
  open.value = false;
}
function cancel() {
  local.value = { ...props.modelValue };
  open.value = false;
}

function toDateTimeLocal(d) {
  const pad = n => String(n).padStart(2,'0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function onClickOutside(e) {
  if (open.value &&
      !popover.value.contains(e.target) &&
      !trigger.value.contains(e.target)
  ) open.value = false;
}
onMounted(() => document.addEventListener('click', onClickOutside));
onBeforeUnmount(() => document.removeEventListener('click', onClickOutside));
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

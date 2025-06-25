<!-- src/components/DarkModeToggle.vue -->
<template>
  <button
    @click="toggle"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    class="relative w-16 h-8 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    :class="isDark ? 'bg-gray-800' : 'bg-gray-200'"
  >
    <!-- icons -->
    <div class="flex items-center justify-between h-full px-2">
      <!-- sun on left -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-4 text-yellow-400"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 3.5a.75.75 0 01.75.75V6a.75.75 0 01-1.5 0V4.25A.75.75 0 0110 3.5zm0 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm6-2.5a.75.75 0 01.75.75H18a.75.75 0 010 1.5h-1.25A.75.75 0 0116 10zM4 10a.75.75 0 01.75.75H3.5a.75.75 0 010-1.5h1.25A.75.75 0 014 10zm9.28-4.78a.75.75 0 011.06 1.06L13.06 6.5a.75.75 0 11-1.06-1.06l1.28-1.28zm-6.56 0L6.22 5.44a.75.75 0 10-1.06-1.06L4.5 6.72a.75.75 0 101.06 1.06zM13.06 13.5l1.28 1.28a.75.75 0 11-1.06 1.06l-1.28-1.28a.75.75 0 111.06-1.06zm-6.56 0a.75.75 0 011.06 1.06L6.22 14.72a.75.75 0 11-1.06-1.06l1.28-1.28z" />
      </svg>

      <!-- moon on right -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-4 text-gray-200"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M17.293 13.293a8 8 0 11-10.586-10.586 7 7 0 1010.586 10.586z" />
      </svg>
    </div>

    <!-- sliding knob -->
    <span
      class="absolute top-1 left-2 h-6 w-6 bg-white rounded-full shadow transition-transform"
      :class="isDark ? 'translate-x-6' : 'translate-x-0'"
    />
  </button>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const isDark = ref(false);

function updateHtmlClass(val) {
  document.documentElement.classList.toggle('dark', val);
}

// initialize from localStorage or OS setting
onMounted(() => {
  const stored = localStorage.getItem('theme');
  if (
    stored === 'dark' ||
    (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    isDark.value = true;
  }
  updateHtmlClass(isDark.value);
});

// persist & apply on changes
watch(isDark, (val) => {
  localStorage.setItem('theme', val ? 'dark' : 'light');
  updateHtmlClass(val);
});

function toggle() {
  isDark.value = !isDark.value;
}
</script>

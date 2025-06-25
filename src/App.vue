<template>
  <div id="app" class="min-h-screen bg-white p-6">
    <header class="mb-6 text-center">
      <h1 class="text-2xl font-semibold text-gray-900">
        Transformers Dashboard
      </h1>
      <p class="text-sm text-gray-600">
        Monitor transformer health and readings
      </p>

      <br/>
      <br/>
      
      <DarkMode />

    </header>

    <router-view />
  </div>
</template>

<script setup>
import DarkMode from '@/components/DarkMode.vue';
</script>
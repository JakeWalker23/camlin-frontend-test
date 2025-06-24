<template>
  <div id="app" class="min-h-screen bg-white p-6">
    <!-- Keep your global header if you like -->
    <header class="mb-6 text-center">
      <h1 class="text-2xl font-semibold text-gray-900">
        Transformers Dashboard
      </h1>
      <p class="text-sm text-gray-600">
        Monitor transformer health and readings
      </p>
    </header>

    <!-- This is the key: let the router decide what to render -->
    <router-view />
  </div>
</template>

<script setup>
// No need to import AssetTable, filters, etc. here anymore
</script>
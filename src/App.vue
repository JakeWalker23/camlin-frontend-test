<template>
  <h2>Voltage Readings</h2>
  <p>Readings from 23/06/2024 </p>
      <main class="min-h-screen bg-black p-8">
    <AssetTable :assets="readings" />
  </main>

</template>

<script setup>
import AssetTable from '@/components/AssetTable.vue'
import readings from "@/data/readings.json"

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

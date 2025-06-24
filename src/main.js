import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import VueApexCharts from 'vue3-apexcharts';

createApp(App).mount('#app')

createApp(App)
  .use(router)
  .component('apexchart', VueApexCharts)
  .mount('#app');
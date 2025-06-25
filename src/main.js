import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import VueApexCharts from 'vue3-apexcharts';

import VCalendar from 'v-calendar'
import 'v-calendar/dist/style.css'

createApp(App)
  .use(router)
  .use(VCalendar, {
    componentPrefix: 'vc' // <vc-date-picker> now available
  })
  .component('apexchart', VueApexCharts)
  .mount('#app');
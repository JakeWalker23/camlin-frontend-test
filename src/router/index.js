import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import GraphView from '@/views/GraphView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/graph/:id', name: 'Graph', component: GraphView, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
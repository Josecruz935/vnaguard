import { createRouter, createWebHistory } from 'vue-router';
import polizasViews from '@/views/polizasViews.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'polizas',
      component: polizasViews, // Ahora carga polizasViews al entrar a "/"
    }
  ],
});

export default router;

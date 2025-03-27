import { createRouter, createWebHistory } from 'vue-router';
import polizasViews from ' ../views/polizasViews.vue';



const router = createRouter({
  history: createWebHistory(),
 routes: [
  {
    path: '/polizas',
    name: 'polizas',
    component: polizasViews
  }
 ]
});

export default router;

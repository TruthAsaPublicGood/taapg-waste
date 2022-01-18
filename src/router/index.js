import { createRouter, createWebHistory } from '@ionic/vue-router';

import WastePage from '../pages/WastePage.vue';
import ItemsPage from '../pages/ItemsPage.vue';

const routes = [
  {
    path: '/',
    component: WastePage
    // redirect: '/items'
  },
  {
    path: '/items',
    component: ItemsPage
  },
  {
    path: '/items/:id',
    component: () => import('../pages/ItemDetailsPage.vue')
  },
  {
    path: '/items/add',
    component: () => import('../pages/AddItemPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

import { createRouter, createWebHistory } from '@ionic/vue-router';

import WastePage from '../pages/WastePage.vue';
import ItemsPage from '../pages/ItemsPage.vue';
import PickupPage from '../pages/PickupPage.vue'

const routes = [
  {
    path: '/',
    component: WastePage
    // redirect: '/'
  },
  {
    path: '/pickups',
    component: PickupPage
  },
  {
    path: '/items',
    component: ItemsPage
  },
  {
    path: '/pickups/:id',
    component: () => import('../pages/PickupDetailsPage.vue')
  },
  {
    path: '/pickups/add/',
    component: () => import('../pages/AddPickupPage.vue')
  },
  {
    path: '/items/:id',
    component: () => import('../pages/ItemDetailsPage.vue')
  },
  {
    path: '/items/add/:id',
    component: () => import('../pages/AddItemPage.vue')
  },
  {
    path: '/mylists',
    component: () => import('../pages/mylistPage.vue')
  },
  {
    path: '/selectitems',
    component: () => import('../components/tags/selectItems.vue')
  },
  {
    path: '/holismdsc',
    component: () => import('../components/holismdsc/agreeMent.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

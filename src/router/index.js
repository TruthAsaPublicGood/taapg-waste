import { createRouter, createWebHistory } from '@ionic/vue-router';
import store from "../store/index";

import CircularPage from '../pages/circularPage.vue';
import WastePage from '../pages/WastePage.vue';
import ItemsPage from '../pages/ItemsPage.vue';
import PickupPage from '../pages/PickupPage.vue'

const routes = [
  {
    path: '/',
    component: CircularPage
    // redirect: '/'
  },
  {
    path: '/member',
    component: WastePage,
    meta: { requiredAuth: true },
    // redirect: '/'
  },
  {
    path: '/pickups',
    component: PickupPage,
    meta: { requiredAuth: true },
  },
  {
    path: '/items',
    component: ItemsPage,
    meta: { requiredAuth: true },
  },
  {
    path: '/pickups/:id/type/:ty',
    component: () => import('../pages/PickupDetailsPage.vue'),
    meta: { requiredAuth: true },
  },
  {
    path: '/pickups/add/',
    component: () => import('../pages/AddPickupPage.vue'),
    meta: { requiredAuth: true },
  },
  {
    path: '/items/:id',
    component: () => import('../pages/ItemDetailsPage.vue'),
    meta: { requiredAuth: true },
  },
  {
    path: '/items/add/:id',
    component: () => import('../pages/AddItemPage.vue'),
    meta: { requiredAuth: true },
  },
  {
    path: '/items/location/',
    component: () => import('../pages/AddLocationPage.vue'),
    meta: { requiredAuth: true },
  },
  {
    path: '/mylists',
    component: () => import('../pages/mylistPage.vue'),
    meta: { requiredAuth: true },
  },
  {
    path: '/selectitems',
    component: () => import('../components/tags/selectItems.vue'),
    meta: { requiredAuth: true },
  },
  {
    path: '/holismdsc',
    component: () => import('../components/holismdsc/agreeMent.vue')
  },
  {
    path: '/about',
    component: () => import('../components/holismdsc/aboutTaapg.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

function guard(to, from, next, authData) {
  if (to.meta && to.meta.requiredAuth) {
    if (authData && authData.peerId > 0) {
      return next();
    }
    return next({ path: "/" });
  } else {
    if (authData && authData.peerId > 0) {
      return next({ path: "/member" });
    }
    return next();
  }
}

router.beforeEach((to, from, next) => {
  let authData = store.getters['getAuthData'];
  if (authData.peerId == 0) {
    // store.dispatch('loadStorageTokens')
    authData = store.getters['getAuthData'];
    return guard(to, from, next, authData);
    /*store.dispatch('loadStorageTokens').then(
      () => {
        console.log('token loaded???')
        authData = store.getters['getAuthData'];
        return guard(to, from, next, authData);
      },
      (error) => {
        console.log(error);
        return guard(to, from, next, authData);
      }
    ); */
  } else {
    return guard(to, from, next, authData);
  }
});

export default router

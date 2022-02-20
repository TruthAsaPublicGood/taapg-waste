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

function guard(to, from, next, authData) {
  console.log('gurad')
  console.log(to)
  console.log(from)
  console.log(next)
  console.log(authData)
  if (to.meta && to.meta.requiredAuth) {
    if (authData && authData.userId > 0) {
      return next();
    }
    return next({ path: "/" });
  } else {
    if (authData && authData.userId > 0) {
      return next({ path: "/member" });
    }
    return next();
  }
}

router.beforeEach((to, from, next) => {
  let authData = store.getters['getAuthData'];
  console.log('authdata')
  console.log(authData)
  if (authData.userId == 0) {
    store.dispatch('loadStorageTokens').then(
      () => {
        authData = store.getters['getAuthData'];
        return guard(to, from, next, authData);
      },
      (error) => {
        console.log(error);
        return guard(to, from, next, authData);
      }
    );
  } else {
    return guard(to, from, next, authData);
  }
});

export default router

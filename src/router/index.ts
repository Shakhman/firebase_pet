import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import useUserStore from '@/store/user';
import HomeView from '../views/HomeView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: () => import(/* webpackChunkName: "sign-in" */ '../views/SignInView.vue'),
    meta: {
      noAuth: true,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterView.vue'),
    meta: {
      noAuth: true,
    },
  },
  {
    path: '/story',
    name: 'story',
    component: () => import(/* webpackChunkName: "register" */ '../views/WriteAStoryView.vue'),
    meta: {
      auth: true,
    },
  },
  {
    path: '/my-stories',
    name: 'my-stories',
    component: () => import(/* webpackChunkName: "register" */ '../views/MyStoriesView.vue'),
    meta: {
      auth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, _, next): Promise<void> => {
  const store = useUserStore();

  if (!to.meta) {
    next();
    return;
  }

  if ((to.meta.noAuth && store.isAuth) || (to.meta.auth && !store.isAuth)) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;

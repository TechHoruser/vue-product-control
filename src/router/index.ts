import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../components/Home.vue';
import Alerts from '../components/Alerts.vue';
import ProductList from '../components/ProductList/ProductList.vue';
import Config from '../components/Config.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/product-list',
    name: 'ProductList',
    component: ProductList,
  },
  {
    path: '/alerts',
    name: 'Alerts',
    component: Alerts,
  },
  {
    path: '/config',
    name: 'Config',
    component: Config,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

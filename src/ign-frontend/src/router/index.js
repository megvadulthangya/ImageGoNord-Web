import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import ImagIA from '../views/ImagIA.vue';
import Documentation from '../views/Documentation.vue';
import About from '../views/About.vue';
import Wallpaper from '../views/Wallpaper.vue';
import GoWild from '../views/GoWild.vue';
import Error404 from '../views/Error404.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/imagia',
    name: 'ImagIA',
    component: ImagIA,
  },
  {
    path: '/documentation',
    name: 'Documentation',
    component: Documentation,
  },
  // Al-útvonalak a dokumentációhoz (opcionális, de maradhat)
  {
    path: '/documentation/python',
    name: 'Documentation Python',
    component: Documentation,
  },
  {
    path: '/documentation/api',
    name: 'Documentation API',
    component: Documentation,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/wallpaper',
    name: 'Wallpaper',
    component: Wallpaper,
  },
  {
    path: '/color-schemes',
    name: 'GoWild',
    component: GoWild,
  },
  {
    path: '/*',
    name: '404',
    component: Error404,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
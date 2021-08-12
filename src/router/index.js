import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Game from '../views/Game.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/game',
    name: 'Game',
    component: Game
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

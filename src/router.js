import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Appointment from './views/Appointment.vue';
import Products from './views/Products.vue';
import Events from './views/Events.vue';
import Landing from './views/Landing.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Landing,
      children: [
        {
          path: '',
          name: 'Home',
          component: Home,
        },
        {
          path: 'Appointment',
          name: 'Appointment',
          component: Appointment,
        },
        {
          path: 'Products',
          name: 'Products',
          component: Products,
        },
        {
          path: 'Events',
          name: 'Events',
          component: Events,
        },
      ],
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
});

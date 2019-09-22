import Vue from 'vue';
import Router from 'vue-router';
import store from './store/store'
import iView from 'iview'
Vue.use(iView)
// views
import Home from './views/Home.vue';
import Appointment from './views/Appointment.vue';
import Products from './views/Products.vue';
import Events from './views/Events.vue';
import Landing from './views/Landing.vue';
import Track from './views/Track.vue';
import Admin from './views/admin/admin.vue';
import Login from './views/admin/Login.vue';
import Dashboard from './views/admin/Dashboard.vue';
// components
import stats from './components/stats.vue';
import schedule from './components/schedule.vue';
import requests from './components/request.vue';
import admin from './components/admin.vue';
import events from './components/events.vue';
// import appointmentList from './components/appointmentList.vue';
import date from './components/date.vue';

Vue.use(Router);

const router = new Router({
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
        {
          path: 'Track',
          name: 'Track',
          component: Track,
        },
      ],
    },
    {
      path: '/Admin',
      component: Admin,
      children: [
        {
          path: '',
          component: Dashboard,
          beforeEnter: requireAuth,
          children: [
            {
              path: '',
              name: 'Dashboard',
              component: stats,
            }, {
              path: 'requests',
              name: 'requests',
              component: requests,
            }, {
              path: 'date',
              name: 'schedule',
              component: schedule,
            },
            {
              path: '/date/:date',
              name: 'date',
              component: date,
            },
            // {
            //   path: 'appointmentList',
            //   name: 'booking',
            //   component: appointmentList,
            // },
            {
              path: 'events',
              name: 'events',
              component: events,
            }, {
              path: 'list',
              name: 'admin',
              component: admin,
            },
          ],
        },
        {
          path: 'Login',
          name: 'Login',
          component: Login,
        },
      ],
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});

function requireAuth(to, from, next) {
  if (!store.getters.getLoginStatus) {
    next("/admin/login")
  } else {
    next()
  }
}

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});

router.afterEach(route => {
  iView.LoadingBar.finish();
});

export default router
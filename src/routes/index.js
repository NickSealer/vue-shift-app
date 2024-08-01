import { createRouter, createWebHistory } from "vue-router";
import Layout from "../components/Layout.vue";
import Login from "../components/sessions/Login.vue";
import Services from "../components/users/Services.vue";
import Availabilities from '../components/users/Availabilities.vue';
import Shifts from "../components/admins/Shifts.vue";

const routes = [
  {
    path: '/',
    component: Layout,
    props: true,
    children : [
      { path: '', component: Login, props: true },
      { path: 'login', component: Login, props: true },
      { path: 'services', component: Services },
      { path: 'services/:serviceId/availabilities', component: Availabilities },
      { path: 'services/:serviceId/shifts', component: Shifts }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;

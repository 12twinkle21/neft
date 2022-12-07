import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginView"),
  },
  {
    path: "/test",
    name: "test",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/testView"),
  },
  {
    path: "/changePassword",
    name: "changePassword",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ChangePassword"),
  },
  {
    path: "/carsInfo",
    name: "carsInfo",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CarsInfo"),
  },
  {
    path: "/searchDrivers",
    name: "searchDrivers",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SearchDrivers"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

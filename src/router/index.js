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
    path: "/writeDrivers",
    name: "writeDrivers",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/WriteDrivers"),
  },
  {
    path: "/carWaiting",
    name: "carWaiting",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CarWaiting"),
  },
  {
    path: "/cisternSeal",
    name: "cisternSeal",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CisternSeal"),
  },
  {
    path: "/otherElements",
    name: "otherElements",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/OtherElements"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

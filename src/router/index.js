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
    name: "Change password",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ChangePassword"),
  },
  {
    path: "/writeDrivers",
    name: "Write drivers",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/WriteDrivers"),
  },
  {
    path: "/carWaiting",
    name: "Car Waiting",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CarWaiting"),
  },
  {
    path: "/cisternSeal",
    name: "Cistern seal",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CisternSeal"),
  },
  {
    path: "/otherElements",
    name: "Other elements",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/OtherElements"),
  },
  {
    path: "/getDrivers",
    name: "Get drivers",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/GetDrivers"),
  },
  {
    path: "/getListTransporters",
    name: "Get list transporters",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../components/GetListTransporters"
      ),
  },
  {
    path: "/changeOrder/:id",
    name: "Change order",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/ChangeOrder"),
  },
  {
    path: "/getOrder/:id",
    name: "Get order",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/GetOrderView"),
  },
  {
    path: "/writeOrder",
    name: "Write order",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/WriteOrder"),
  },
  {
    path: "/otherElements",
    name: "OtherElements",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/OtherElements"),
  },
  {
    path: "/changeCarStatus/:id",
    name: "Change car status",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/ChangeCarStatusForSecurity"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

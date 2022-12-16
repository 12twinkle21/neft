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
  {
    path: "/addNewCar",
    name: "addNewCar",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AddNewCar"),
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
    path: "/searchDriversForSecurity",
    name: "searchDriversForSecurity",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/SearchDriversForSecurity"
      ),
  },
  {
    path: "/otherElements",
    name: "otherElements",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/OtherElements"),
  },
  {
    path: "/fullListToday",
    name: "fullListToday",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/FullListToday"),
  },
  {
    path: "/fullListClient",
    name: "fullListClient",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/FullListClient"),
  },
  {
    path: "/changeOrderOnLoad",
    name: "changeOrderOnLoad",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ChangeOrderOnLoad"),
  },
  {
    path: "/transporterList",
    name: "transporterList",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/TransporterList"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

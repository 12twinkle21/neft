import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Datepicker from "@vuepic/vue-datepicker";
import { loadFonts } from "./plugins/webfontloader";
import { PromiseDialog } from "vue3-promise-dialog";
import "@/scss/style.scss";
import "@vuepic/vue-datepicker/dist/main.css";

loadFonts();

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .use(PromiseDialog)
  .component("Datepicker", Datepicker)
  .mount("#app");

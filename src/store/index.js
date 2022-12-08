import { createStore } from "vuex";
import auth from "@/store/modules/auth";
import confirm from "@/store/modules/confirm";

const store = createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    confirm,
  },
});

export default store;

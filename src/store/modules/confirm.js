let resolver = () => {};
export default {
  namespaced: true,
  state() {
    return {
      message: "",
      show: false,
    };
  },
  mutations: {
    showConfirm(state, message) {
      state.message = message;
      state.show = true;
    },

    clearConfirm(state) {
      state.message = "";
      state.show = false;
    },
  },

  actions: {
    showConfirm({ commit }, message) {
      commit("showConfirm", message);
      return new Promise((resolve) => {
        resolver = resolve;
      });
    },

    setConfirm({ commit }, value) {
      commit("clearConfirm");
      resolver(value);
    },
  },
};

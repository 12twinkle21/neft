import AuthService from "../../services/auth.service";

const emptyUser = () => {
  return {
    name: "Гость",
  };
};

export default {
  namespaced: true,
  state() {
    const user = emptyUser();
    return {
      isLoggedIn: false,
      user,
      errorAuth: "",
      GUID: "",
    };
  },
  getters: {},
  mutations: {
    login(state, response) {
      if (response.AuthOn && response.GUID.length && !response.Error.length) {
        state.isLoggedIn = true;
        state.user.name = response.Group;
        localStorage.setItem("GUID", response.GUID);
        localStorage.setItem("Group", response.Group);
        state.GUID = response.GUID;
      } else {
        state.isLoggedIn = false;
        state.errorAuth = response.Error;
        setTimeout(() => {
          state.errorAuth = "";
        }, 5000);
      }
    },
    checkLogin(state, info) {
      state.isLoggedIn = !!info.GUID;
      state.user.name = info.user;
    },
    logout(state) {
      localStorage.removeItem("GUID");
      localStorage.removeItem("Group");
      localStorage.removeItem("dateBegin");
      localStorage.removeItem("dateEnd");
      state.isLoggedIn = false;
      state.user = emptyUser();
    },
  },
  actions: {
    login({ commit }, { login, password }) {
      AuthService.auth(login, password).then((dataResponse) => {
        const response = dataResponse.data;
        commit("login", response.data[0]);
      });
    },
    checkLogin({ commit }) {
      const info = {};
      info.GUID = localStorage.getItem("GUID");
      info.user = localStorage.getItem("Group");
      commit("checkLogin", info);
    },
    logout({ commit }) {
      commit("logout");
    },
  },
};

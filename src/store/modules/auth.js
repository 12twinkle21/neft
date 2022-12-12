import AuthService from "../../services/auth.service";

const emptyUser = () => {
  return {
    login: "guest",
    name: "Гость",
    role: {
      id: 0,
      descr: "Гость",
    },
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
        localStorage.setItem("GUID", response.GUID);
        state.GUID = response.GUID;
      } else {
        state.isLoggedIn = false;
        state.errorAuth = response.Error;
        setTimeout(() => {
          state.errorAuth = "";
        }, 5000);
      }
    },
    checkLogin(state, GUID) {
      state.isLoggedIn = !!GUID;
    },
    setUser(state, { login, name, role }) {
      state.user = {
        login,
        name,
        role,
      };
    },
    logout(state) {
      localStorage.removeItem("GUID");
      state.isLoggedIn = false;
      state.user = emptyUser();
    },
  },
  actions: {
    login({ commit }, { login, password }) {
      AuthService.auth(login, password).then((dataResponse) => {
        const response = dataResponse.data;
        commit("login", response);
      });
    },
    checkLogin({ commit }) {
      const GUID = localStorage.getItem("GUID");
      commit("checkLogin", GUID);
    },
    logout({ commit }) {
      commit("logout");
    },
    getUser({ commit }) {
      try {
        const userResponse = {
          login: "Admin",
          name: "Александр",
          role: {
            id: 1,
            descr: "Админ",
          },
        };
        commit("setUser", userResponse);
        commit("login");
      } catch (e) {
        commit("logout");
      }
    },
  },
};

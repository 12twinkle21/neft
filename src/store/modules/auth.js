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
    };
  },
  getters: {},
  mutations: {
    login(state) {
      console.log(state);
      state.isLoggedIn = true;
    },
    setUser(state, { login, name, role }) {
      state.user = {
        login,
        name,
        role,
      };
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = emptyUser();
    },
  },
  actions: {
    login({ commit }, { login, password }) {
      console.log(login, password);
      const test = {
        login: login,
        name: "Александр",
        role: {
          id: 1,
          descr: "Админ",
        },
      };
      commit("setUser", test);
      commit("login");
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

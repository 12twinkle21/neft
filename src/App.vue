<template>
  <v-app>
    <main-menu
      v-if="isLoggedIn"
      :is-logged-in="isLoggedIn"
      :logged-user="loggedUser"
    />
    <v-main>
      <router-view v-if="isLoggedIn" />
      <login-view v-else />
    </v-main>
  </v-app>
</template>

<script>
import LoginView from "./views/LoginView";
import { mapState } from "vuex";
import MainMenu from "@/components/MainMenu";

export default {
  name: "App",
  components: { MainMenu, LoginView },
  data() {
    return {};
  },
  computed: {
    ...mapState("auth", {
      isLoggedIn: (state) => state.isLoggedIn,
      loggedUser: (state) => state.user,
    }),
  },
};
</script>

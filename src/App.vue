<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-title @click="$router.push('/')">Приложение</v-app-bar-title>
      <user-info :user="userInfo" />
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import UserInfo from "@/components/UserInfo";
export default {
  name: "App",
  components: { UserInfo },
  data() {
    return {
      userInfo: { name: "Alex", role: "Admin" },
    };
  },
};
</script>

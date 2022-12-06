<template>
  <v-container>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-app-bar-title @click="$router.push('/')">Приложение</v-app-bar-title>
      <user-info :user="loggedUser" />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-content>
          <v-card-title>{{ loggedUser.name }}</v-card-title>
          <v-card-subtitle>{{ loggedUser.role.descr }}</v-card-subtitle>
          <v-card-subtitle>{{ loggedUser.login }}</v-card-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <template v-if="isLoggedIn">
          <v-list-item v-for="item in menuMain" :key="item.title" link>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <template v-else>
          <v-list-item v-for="item in menuMain" :key="item.title" link>
            <v-list-item-content>
              <v-list-item-title
                ><v-btn :to="item.path"
                  >{{ item.title }}
                </v-btn></v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import UserInfo from "@/components/UserInfo";

export default {
  name: "MainMenu",
  components: { UserInfo },
  data() {
    return {
      drawer: null,
      menuMain: [
        { title: "Главная", path: "/" },
        { title: "About", path: "/about" },
        { title: "Выход", path: "/" },
      ],
    };
  },
  props: {
    loggedUser: Object,
    isLoggedIn: Boolean,
  },
};
</script>

<style></style>

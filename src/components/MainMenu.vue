<template>
  <v-container>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-app-bar-title class="cursor-pointer" @click="$router.push('/')"
        >Приложение</v-app-bar-title
      >
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
              <router-link :to="item.path">
                <v-list-item-title
                  >{{ item.title }}
                </v-list-item-title></router-link
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>
                <v-dialog Persistent v-model="dialog" width="500">
                  <template #activator="{ props }">
                    <v-list-item-title
                      color="red lighten-2"
                      dark
                      v-bind="props"
                    >
                      <a>Сменить пароль</a>
                    </v-list-item-title>
                  </template>

                  <v-card>
                    <change-password
                      v-on:closeModal="closeDial"
                    ></change-password>
                  </v-card>
                </v-dialog>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="consfirmedLogout" link>
            <v-list-item-content>
              <v-list-item-title>
                <a>Выход</a>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <DialogWrapper />
  </v-container>
</template>

<script>
import { DialogWrapper } from "vue3-promise-dialog";
import UserInfo from "@/components/UserInfo";
import { mapActions } from "vuex";
import ChangePassword from "@/views/ChangePassword";

export default {
  name: "MainMenu",
  components: { ChangePassword, UserInfo, DialogWrapper },
  data() {
    return {
      drawer: null,
      menuMain: [
        { title: "Главная", path: "/" },
        { title: "Данные автомобиля", path: "/carsInfo" },
        { title: "ФИО водителя", path: "/searchDrivers" },
      ],
      dialog: false,
    };
  },
  props: {
    loggedUser: Object,
    isLoggedIn: Boolean,
  },
  methods: {
    consfirmedLogout() {
      console.log("dkfjdkjf");
      if (this.showConfirm("Вы действительно хотите выйти?")) this.logout();
    },
    closeDial(e) {
      this.dialog = e;
    },
    ...mapActions("confirm", ["showConfirm"]),
    ...mapActions("auth", ["logout"]),
  },
};
</script>

<style></style>

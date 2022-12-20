<template>
  <v-container>
    <v-app-bar app>
      <div class="headerLogoAndBtn">
        <div class="kek">
          <v-app-bar-nav-icon
            class="cursor-pointer"
            @click.stop="drawer = !drawer"
          />
        </div>
        <v-app-bar-title class="cursor-pointer" @click="$router.push('/')"
          ><img src="/img/headerLogo.png" height="80" width="400" alt="logo"
        /></v-app-bar-title>
      </div>
      <user-info :user="loggedUser" />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-content>
          <v-card-title class="mt-4">{{ loggedUser.name }}</v-card-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <template v-if="isLoggedIn">
          <template v-if="loggedUser.name === 'Клиент'">
            <v-list-item v-for="item in menu.client" :key="item.title" link>
              <v-list-item-content>
                <router-link :to="item.path">
                  <v-list-item-title
                    >{{ item.title }}
                  </v-list-item-title></router-link
                >
              </v-list-item-content>
            </v-list-item>
          </template>
          <template v-if="loggedUser.name === 'Оператор'">
            <v-list-item v-for="item in menu.client" :key="item.title" link>
              <v-list-item-content>
                <router-link :to="item.path">
                  <v-list-item-title
                    >{{ item.title }}
                  </v-list-item-title></router-link
                >
              </v-list-item-content>
            </v-list-item>
          </template>
          <template v-if="loggedUser.name === 'Охранник'">
            <v-list-item v-for="item in menu.client" :key="item.title" link>
              <v-list-item-content>
                <router-link :to="item.path">
                  <v-list-item-title
                    >{{ item.title }}
                  </v-list-item-title></router-link
                >
              </v-list-item-content>
            </v-list-item>
          </template>
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
      menu: {
        client: [
          { title: "Главная", path: "/" },
          { title: "Поиск водителя", path: "/getDrivers" },
          {
            title: "Получение списка перевозчиков",
            path: "/getListTransporters",
          },
        ],
        operator: [
          { title: "Главная", path: "/" },
          { title: "Поиск водителя", path: "/getDrivers" },
          {
            title: "Получение списка перевозчиков",
            path: "/getListTransporters",
          },
        ],
        securityGuard: [
          { title: "Главная", path: "/" },
          { title: "Поиск водителя", path: "/getDrivers" },
          {
            title: "Получение списка перевозчиков",
            path: "/getListTransporters",
          },
        ],
      },
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

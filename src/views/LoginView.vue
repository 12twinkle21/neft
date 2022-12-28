<template>
  <v-container class="w-100 h-100">
    <v-row class="w-100 h-100 align-center">
      <v-col class="justify-center">
        <v-card class="py-6 px-8 mx-auto" max-width="400">
          <v-card-subtitle class="text-center mb-5">Вход</v-card-subtitle>
          <v-form v-model="form" @submit.prevent="submit">
            <v-text-field
              :readonly="loading"
              :rules="[required]"
              label="Электронная почта"
              v-model="login"
            />
            <v-text-field
              class="w-100"
              :readonly="loading"
              :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              label="Пароль"
              @click:appendInner="show1 = !show1"
              v-model="password"
            />
            <v-alert color="#FEC64E" v-if="errorAuth" class="mb-4">{{
              errorAuth
            }}</v-alert>
            <v-btn color="primary" :disabled="!form" size="large" type="submit"
              >Войти</v-btn
            >
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
      class="opacityLoginLoader"
      v-model="loading"
      opacity="0"
      fullscreen
    >
      <v-card class="d-flex justify-center align-center">
        <v-progress-circular :size="70" indeterminate class="primary--text" />
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      login: "",
      password: "",
      form: false,
      loading: false,
      error: "",
      hasError: false,
      timeoutHandler: null,
      show1: false,
    };
  },
  computed: {
    ...mapState("auth", {
      isLoggedIn: (state) => state.isLoggedIn,
      errorAuth: (state) => state.errorAuth,
    }),
  },
  methods: {
    required(val) {
      return !!val || "Поле должно быть заполнено";
    },
    submit() {
      if (!this.form) return;

      this.loading = true;
      try {
        const payload = {
          login: this.login,
          password: this.password,
        };
        this.doLogin(payload);
      } catch (e) {
        this.loading = false;
        console.error(e);
      } finally {
        this.loading = false;
        this.$router.push("/");
      }
    },

    ...mapActions("auth", {
      doLogin: "login",
      getUser: "getUser",
    }),
  },
  // mounted: {
  //   this.getUser();
  // },
};
</script>

<style scoped>
.opacityLoginLoader {
  opacity: 0.5;
}
</style>

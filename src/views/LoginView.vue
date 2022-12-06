<template>
  <v-container class="w-100 h-100">
    <v-row class="w-100 h-100 align-center">
      <v-col class="justify-center">
        <v-card class="py-6 px-8 mx-auto" max-width="400">
          <v-card-title class="text-center mb-5">Вход</v-card-title>
          <v-form v-model="form" @submit.prevent="submit">
            <v-text-field
              :readonly="loading"
              :rules="[required]"
              label="Электронная почта"
              v-model="login"
            />
            <v-text-field
              :readonly="loading"
              label="Пароль"
              :rules="[required]"
              type="password"
              v-model="password"
            />
            <v-alert type="error" v-model="hasError" class="mb-4">{{
              error
            }}</v-alert>
            <v-btn
              color="primary"
              :disabled="!form"
              size="large"
              type="submit"
              :loading="loading"
              >Войти</v-btn
            >
          </v-form>
        </v-card>
      </v-col>
    </v-row>
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
    };
  },
  computed: {
    ...mapState("auth", {
      isLoggedIn: (state) => state.isLoggedIn,
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
        this.doLogin({
          login: this.login,
          password: this.password,
        });
      } catch (e) {
        this.showError(e);
      } finally {
        this.loading = false;
        this.$router.push("/");
      }
    },

    showError(message) {
      this.error = message;
      this.hasError = true;
      this.timoutHandler = setTimeout(() => {
        this.hideError();
      }, 6000);
    },

    hideError() {
      (this.error = ""), (this.hasError = false);
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

<style></style>

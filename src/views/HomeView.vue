<template>
  <v-container>
    <v-row>
      <v-col cols="1"><v-btn>Главная</v-btn></v-col>
      <v-col cols="1"><v-btn to="/login">Вход</v-btn></v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",

  components: {},
});
</script>

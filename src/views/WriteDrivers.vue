<template>
  <v-container>
    <v-card class="page-card pa-5 flex-column">
      <v-card-title class="mb-5">Отправка сообщения менеджеру</v-card-title>
      <v-text-field v-model="load" label="Контрагент" />
      <v-text-field v-model="fio" label="ФИО" />
      <v-text-field v-model="autoNumber" label="Номер авто" />
      <v-text-field v-model="additionalInfo" label="Доп. информация" />
      <v-btn class="customMainBtn" @click="writeDriversMessage"
        >Отправить сообщение</v-btn
      >
    </v-card>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";

import axios from "axios";
import config from "@/config";

export default defineComponent({
  name: "WriteDrivers",

  data() {
    return {
      getDriverMessageInfo: "",
      load: "",
      fio: "",
      autoNumber: "",
      additionalInfo: "",
    };
  },
  methods: {
    writeDriversMessage() {
      const bodyFormData = new FormData();
      bodyFormData.append("Request", "WriteDrivers");
      bodyFormData.append(
        "Message",
        `${this.load}, ${this.fio}, ${this.autoNumber}, ${this.additionalInfo}`
      );

      axios
        .post(config.backendUrl, bodyFormData)
        .then((response) => (this.getDriverMessageInfo = response.data));
    },
  },
});
</script>

<style></style>

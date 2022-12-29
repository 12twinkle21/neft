<template>
  <v-container>
    <v-card class="page-card pa-5 flex-column">
      <v-card-title class="mb-5">
        <v-btn class="mr-3" to="/">Назад</v-btn>Отправка сообщения
        менеджеру</v-card-title
      >
      <span class="inputLabel">Контрагент</span>
      <v-text-field v-model="load" />
      <span class="inputLabel">ФИО</span>
      <v-text-field v-model="fio" />
      <span class="inputLabel">Номер авто</span>
      <v-text-field v-model="autoNumber" />
      <span class="inputLabel">Доп. информация</span>
      <v-text-field v-model="additionalInfo" />
      <v-alert color="#FEC64E" v-if="errorReq" class="mb-4">{{
        errorReq
      }}</v-alert>
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
      errorReq: "",
    };
  },
  methods: {
    checkInp() {
      if (!this.autoNumber && !this.load && !this.fio) {
        this.errorReq = "Заполните поля для отправки сообщения";
      }
      return !this.autoNumber && !this.load && !this.fio;
    },
    writeDriversMessage() {
      if (!this.checkInp()) {
        this.errorReq = "";
        const bodyFormData = new FormData();
        bodyFormData.append("Request", "WriteDrivers");
        bodyFormData.append(
          "Message",
          `${this.load}, ${this.fio}, ${this.autoNumber}, ${this.additionalInfo}`
        );

        axios.post(config.backendUrl, bodyFormData).then((response) => {
          this.errorReq =
            response.data.data[0].Error || response.data.data[0].Status;
          if (response.data.data[0].Status) {
            this.load = "";
            this.fio = "";
            this.autoNumber = "";
            this.additionalInfo = "";
          }
        });
      }
    },
  },
});
</script>

<style></style>

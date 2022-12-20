<template>
  <v-container>
    <v-row class="flex-column">
      <v-form>
        <v-row>
          <v-col cols="5">
            <h2 class="mb-5">Отправка сообщения менеджеру</h2>
            <v-text-field v-model="load" label="Контрагент" />
            <v-text-field v-model="fio" label="ФИО" />
            <v-text-field v-model="autoNumber" label="Номер авто" />
            <v-text-field v-model="additionalInfo" label="Доп. информация" />
            <v-btn @click="writeDriversMessage">Отправить сообщение</v-btn>
            <div>{{ getDriverMessageInfo }}</div>
          </v-col>
        </v-row>
      </v-form>
    </v-row>
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

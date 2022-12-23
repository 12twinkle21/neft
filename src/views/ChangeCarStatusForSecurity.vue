<template>
  <v-container>
    <v-row>
      <v-col cols="5">
        <h2 class="mb-5">Тут меняем статус тачки</h2>
        <v-btn @click="changeTsArrival">ТС прибыло</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="5">
        <v-btn @click="changeTsOnHold">Отправить ТС на ожидание</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="5">
        <v-btn class="mr-10" @click="changeCompleteInspection"
          >ТС Досмотрено</v-btn
        >
        <v-btn @click="changeCompleteInspection"
          >ТС не досмотрено(Отрицание)</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="5">
        <h2 class="mb-5">Получение статуса(Поле для теста)</h2>
        <v-btn @click="getStatus">Получить статус</v-btn>
        <div v-if="getStatusInfo" class="mt-5">
          <p>
            Guid_Load: {{ getStatusInfo.map((item) => String(item.GUID_load)) }}
          </p>
          <p>Status: {{ getStatusInfo.map((item) => item.Status) }}</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";

import axios from "axios";
import config from "@/config";

export default defineComponent({
  name: "OtherElements",

  data() {
    return {
      getTsArrivalInfo: "",
      getTsOnHoldInfo: "",
      getInspectionInfo: "",
      getStatusInfo: "",
      guidLoad: this.$route.params.id,
    };
  },
  methods: {
    changeTsArrival() {
      const params = {
        Request: "Arrival",
        GUID_Load: this.guidLoad,
      };

      axios
        .get(config.backendUrl, { params })
        .then((response) => (this.getTsArrivalInfo = response.data.data));
    },
    changeTsOnHold() {
      const params = {
        Request: "SendOnHold",
        GUID_Load: this.guidLoad,
      };

      axios
        .get(config.backendUrl, { params })
        .then((response) => (this.getTsOnHoldInfo = response.data.data));
    },
    changeCompleteInspection(item) {
      let inspectionResult = null;
      if (item.target.innerHTML === "ТС Досмотрено") {
        inspectionResult = 0;
      } else if (item.target.innerHTML === "ТС на ожидании") {
        inspectionResult = 1;
      }
      const params = {
        Request: "CompletedInspection",
        GUID_Load: this.guidLoad,
        Result: inspectionResult,
      };

      axios
        .get(config.backendUrl, { params })
        .then((response) => (this.getInspectionInfo = response.data.data));
    },
    getStatus() {
      const params = {
        Request: "GetStatus",
        GUID_Load: this.guidLoad,
      };

      axios
        .get(config.backendUrl, { params })
        .then((response) => (this.getStatusInfo = response.data.data));
    },
  },
});
</script>

<style></style>

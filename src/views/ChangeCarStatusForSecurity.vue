<template>
  <v-container>
    <v-row>
      <v-col>
        <v-list v-for="(item, index) in orderInfo" :key="index">
          <v-list-item>Авто: {{ item.Auto.split("/")[0] }}</v-list-item>
          <v-list-item>Прицеп: {{ item.Auto.split("/")[1] }}</v-list-item>
          <v-list-item>ФИО: {{ item.FIO }}</v-list-item>
          <v-list-item>Клиент : {{ item.Client }}</v-list-item>
          <v-list-item>Продукт: {{ item.Product }}</v-list-item>
          <v-list-item>Масса: {{ item.Weight }}</v-list-item>
          <v-list-item
            >Статус:
            {{
              getStatusInfo.map((statusItem) => statusItem.Status)
            }}</v-list-item
          >
        </v-list>
      </v-col>
    </v-row>
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
  name: "ChangeCarStatusForSecurity",

  data() {
    return {
      getTsArrivalInfo: "",
      getTsOnHoldInfo: "",
      getInspectionInfo: "",
      getStatusInfo: "",
      guidLoad: this.$route.params.id,
      orderInfo: {},
    };
  },
  mounted() {
    this.getOrder();
    // this.getStatus();
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
    getOrder() {
      const params = {
        Request: "GetOrder",
        GUID: this.guidLoad,
      };

      axios
        .get(config.backendUrl, { params })
        .then((response) => (this.orderInfo = response.data.data));
    },
  },
});
</script>

<style></style>

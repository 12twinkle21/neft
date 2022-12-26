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
    <div v-if="group === 'Охрана'">
      <v-row>
        <v-col cols="5">
          <v-btn class="mr-10" @click="changeTsArrival">ТС прибыло</v-btn>
          <v-btn @click="changeTsOnHold">Отправить ТС на ожидание</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5">
          <v-btn class="mr-10" @click="changeCompleteInspection"
            >ТС Досмотрено</v-btn
          >
          <v-btn @click="changeCompleteInspection">ТС не досмотрено</v-btn>
        </v-col>
      </v-row>
    </div>
    <div v-if="group === 'Оператор отгрузки'">
      <v-row>
        <v-col cols="5">
          <h2 class="mb-5">Отметка о готовности к погрузке ТС</h2>
          <v-btn class="mr-10" @click="changeReadyForShipment"
            >ТС на отгрузку</v-btn
          >
          <v-btn @click="changeReadyForShipment">Погрузка ТС невозможна</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5">
          <h2 class="mb-5">Опломбирование ТС</h2>
          <v-text-field v-model="numberOfSeal" label="Номер пломб" />
          <v-text-field
            v-model="numberOfSampleSeal"
            label="Номер пломбы пробы"
          />
          <v-btn @click="onSeal">Опломбирование</v-btn>
        </v-col>
      </v-row>
    </div>
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
      getInspectionInfo: [],
      getStatusInfo: "",
      numberOfSeal: "",
      numberOfSampleSeal: "",
      guidLoad: this.$route.params.id,
      orderInfo: {},
      group: localStorage.getItem("Group"),
    };
  },
  mounted() {
    this.getOrder();
    this.getStatus();
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
      this.getStatus();
    },
    changeTsOnHold() {
      const params = {
        Request: "SendOnHold",
        GUID_Load: this.guidLoad,
      };

      axios
        .get(config.backendUrl, { params })
        .then((response) => (this.getTsOnHoldInfo = response.data.data));
      this.getStatus();
    },
    changeCompleteInspection(item) {
      let inspectionResult = null;
      if (item.target.innerHTML === "ТС Досмотрено") {
        inspectionResult = 0;
      } else if (item.target.innerHTML === "ТС не досмотрено") {
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
      this.getStatus();
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
    changeReadyForShipment(item) {
      if (item.target.innerHTML === "ТС на отгрузку") {
        this.readyShipmentResult = 1;
      } else if (item.target.innerHTML === "Погрузка ТС невозможна") {
        this.readyShipmentResult = 0;
      }
      const params = {
        Request: "ReadyShipment",
        GUID_Load: this.guidLoad,
        Result: this.readyShipmentResult,
      };

      axios
        .get(config.backendUrl, { params })
        .then((response) => (this.getShipmentInfo = response.data.data));
    },
    onSeal() {
      const params = {
        Request: "Sealing",
        GUID_Load: this.guidLoad,
        Seal: this.numberOfSeal,
        SampleSeal: this.numberOfSampleSeal,
      };

      axios
        .get(config.backendUrl, { params })
        .then((response) => (this.getSealingInfo = response.data.data));
    },
  },
});
</script>
<!-- http://localhost:8080/changeCarStatus/4b0a0636-850c-11ed-9e14-00155d011400 -->

<style></style>

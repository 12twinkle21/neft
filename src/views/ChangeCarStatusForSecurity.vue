<template>
  <v-dialog hide-overlay v-model="show">
    <v-window v-model="state" class="h-100 w-50 ma-auto">
      <v-container class="page-container">
        <v-card-title class="d-flex justify-space-between align-center">
          <span class="ml-5 font-weight-bold">Информация</span>
          <v-btn
            icon="mdi-close"
            class="icon-btn"
            color="red"
            variant=""
            @click="$emit('updateShowDialog', false)"
          />
        </v-card-title>
        <v-row>
          <v-col>
            <v-list :class="{ 'border-default': loading }">
              <v-progress-circular
                v-if="loading"
                class="progressCircular"
                indeterminate
                color="primary"
              ></v-progress-circular>
              <v-list-item
                >Авто: {{ orderInfo[0]?.Auto.split("/")[0] }}</v-list-item
              >
              <v-list-item
                >Прицеп: {{ orderInfo[0]?.Auto.split("/")[1] }}</v-list-item
              >
              <v-list-item>ФИО: {{ orderInfo[0]?.FIO }}</v-list-item>
              <v-list-item>Клиент : {{ orderInfo[0]?.Client }}</v-list-item>
              <v-list-item v-if="group === 'Оператор отгрузки'"
                >Продукт: {{ orderInfo[0]?.Product }}</v-list-item
              >
              <v-list-item v-if="group === 'Оператор отгрузки'"
                >Масса: {{ orderInfo[0]?.Weight }}</v-list-item
              >
              <v-list-item>Статус: {{ getStatusInfo[0]?.Status }}</v-list-item>
            </v-list>
          </v-col>
        </v-row>
        <div v-if="group === 'Охрана'">
          <v-row>
            <v-col cols="5">
              <v-btn class="mr-10" @click="getStatus">Обновить статус</v-btn>
            </v-col>
          </v-row>
          <v-row
            v-if="
              getStatusInfo[0]?.Status === 'Ожидается ТС' ||
              getStatusInfo[0]?.Status === 'Пропуск ТС разрешен'
            "
          >
            <v-col cols="5">
              <h3 class="ml-2">Действия</h3>
            </v-col>
          </v-row>
          <v-row v-if="getStatusInfo[0]?.Status === 'Ожидается ТС'">
            <v-col cols="5">
              <v-btn class="mr-10" @click="changeTsArrival">ТС прибыло</v-btn>
            </v-col>
          </v-row>
          <v-row v-if="getStatusInfo[0]?.Status === 'Пропуск ТС разрешен'">
            <v-col cols="5">
              <v-btn class="mr-10" @click="changeCompleteInspection"
                >ТС досмотрено</v-btn
              >
              <v-btn @click="changeCompleteInspection">ТС недосмотрено</v-btn>
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
              <v-btn @click="changeReadyForShipment"
                >Погрузка ТС невозможна</v-btn
              >
              <v-btn class="mt-5" @click="changeTsOnHold"
                >Отправить ТС на ожидание</v-btn
              >
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
    </v-window>
  </v-dialog>
</template>

<script>
import { defineComponent } from "vue";

import axios from "axios";
import config from "@/config";

export default defineComponent({
  name: "ChangeCarStatusForSecurity",

  props: {
    urlCarOpen: Number,
  },

  data() {
    return {
      getTsArrivalInfo: "",
      getTsOnHoldInfo: "",
      getInspectionInfo: [],
      getStatusInfo: "",
      numberOfSeal: "",
      numberOfSampleSeal: "",
      //guidLoad: this.$route.params.id,
      orderInfo: {},
      group: localStorage.getItem("Group"),
      loading: false,
    };
  },

  watch: {
    urlCarOpen: function () {
      this.getOrder();
      this.getStatus();
    },
  },

  methods: {
    changeTsArrival: async function () {
      const params = {
        Request: "Arrival",
        GUID_Load: this.urlCarOpen,
      };

      await axios
        .get(config.backendUrl, { params })
        .then((response) => (this.getTsArrivalInfo = response.data.data));
      this.getStatus();
    },
    changeTsOnHold: async function () {
      const params = {
        Request: "SendOnHold",
        GUID_Load: this.urlCarOpen,
      };

      await axios
        .get(config.backendUrl, { params })
        .then((response) => (this.getTsOnHoldInfo = response.data.data));
      this.getStatus();
    },
    changeCompleteInspection: async function (item) {
      let inspectionResult = null;
      if (item.target.innerHTML === "ТС Досмотрено") {
        inspectionResult = 0;
      } else if (item.target.innerHTML === "ТС не досмотрено") {
        inspectionResult = 1;
      }
      const params = {
        Request: "CompletedInspection",
        GUID_Load: this.urlCarOpen,
        Result: inspectionResult,
      };

      await axios
        .get(config.backendUrl, { params })
        .then((response) => (this.getInspectionInfo = response.data.data));
      this.getStatus();
    },
    getStatus() {
      this.loading = true;
      const params = {
        Request: "GetStatus",
        GUID_Load: this.urlCarOpen,
      };

      axios.get(config.backendUrl, { params }).then((response) => {
        this.getStatusInfo = response.data.data;
        this.loading = false;
      });
    },
    getOrder() {
      this.loading = true;
      const params = {
        Request: "GetOrder",
        GUID: this.urlCarOpen,
      };

      axios.get(config.backendUrl, { params }).then((response) => {
        this.orderInfo = response.data.data;
        this.loading = false;
      });
    },
    changeReadyForShipment(item) {
      if (item.target.innerHTML === "ТС на отгрузку") {
        this.readyShipmentResult = 1;
      } else if (item.target.innerHTML === "Погрузка ТС невозможна") {
        this.readyShipmentResult = 0;
      }
      const params = {
        Request: "ReadyShipment",
        GUID_Load: this.urlCarOpen,
        Result: this.readyShipmentResult,
      };

      axios
        .get(config.backendUrl, { params })
        .then((response) => (this.getShipmentInfo = response.data.data));
    },
    onSeal() {
      const params = {
        Request: "Sealing",
        GUID_Load: this.urlCarOpen,
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

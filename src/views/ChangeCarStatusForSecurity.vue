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
            <v-list :class="{ 'border-default': loading }" class="pt-1">
              <v-progress-circular
                v-if="loading"
                class="progressCircular"
                indeterminate
                color="primary"
              ></v-progress-circular>
              <v-list-item
                ><span class="boldChangeStatusText">Авто:</span>
                {{ orderInfo[0]?.Auto.split("/")[0] }}</v-list-item
              >
              <v-list-item
                ><span class="boldChangeStatusText">Прицеп:</span>
                {{ orderInfo[0]?.Auto.split("/")[1] }}</v-list-item
              >
              <v-list-item
                ><span class="boldChangeStatusText">ФИО:</span>
                {{ orderInfo[0]?.FIO }}</v-list-item
              >
              <v-list-item
                ><span class="boldChangeStatusText">Клиент :</span>
                {{ orderInfo[0]?.Client }}</v-list-item
              >
              <v-list-item v-if="group === 'Оператор отгрузки'"
                ><span class="boldChangeStatusText">Продукт:</span>
                {{ orderInfo[0]?.Product }}</v-list-item
              >
              <v-list-item v-if="group === 'Оператор отгрузки'"
                ><span class="boldChangeStatusText">Масса:</span>
                {{ orderInfo[0]?.Weight }}</v-list-item
              >
              <v-list-item
                ><span class="boldChangeStatusText">Статус:</span>
                {{ getStatusInfo[0]?.Status }}</v-list-item
              >
            </v-list>
          </v-col>
        </v-row>
        <div v-if="group === 'Охрана'">
          <v-row>
            <v-col>
              <v-btn class="w-100" @click="getStatus">Обновить статус</v-btn>
            </v-col>
          </v-row>
          <v-row
            v-if="
              getStatusInfo[0]?.Status === 'Ожидается ТС' ||
              getStatusInfo[0]?.Status === 'Пропуск ТС разрешен'
            "
          >
            <v-col cols="5">
              <h3 class="mt-1">Действия</h3>
            </v-col>
          </v-row>
          <v-row v-if="getStatusInfo[0]?.Status === 'Ожидается ТС'">
            <v-col>
              <v-btn class="w-100" @click="changeTsArrival">ТС прибыло</v-btn>
            </v-col>
          </v-row>
          <v-row v-if="getStatusInfo[0]?.Status === 'Пропуск ТС разрешен'">
            <v-col>
              <v-btn class="w-100" @click="changeCompleteInspection(0)"
                >ТС досмотрено</v-btn
              >
              <v-btn class="mt-5 w-100" @click="changeCompleteInspection(1)"
                >ТС недосмотрено</v-btn
              >
            </v-col>
          </v-row>
        </div>
        <div v-if="group === 'Оператор отгрузки'">
          <v-row>
            <v-col>
              <v-btn class="w-100" @click="getStatus">Обновить статус</v-btn>
            </v-col>
          </v-row>
          <v-row
            v-if="
              getStatusInfo[0]?.Status === 'ТС досмотрено' ||
              getStatusInfo[0]?.Status === 'ТС на погрузке'
            "
          >
          </v-row>
          <v-row v-if="getStatusInfo[0]?.Status === 'ТС досмотрено'">
            <v-col>
              <h3 class="mt-1">Действия</h3>
              <v-btn class="mt-3 w-100" @click="changeReadyForShipment(1)"
                >ТС на отгрузку</v-btn
              >
              <v-btn class="mt-3 w-100" @click="changeReadyForShipment(0)"
                >Погрузка ТС невозможна</v-btn
              >
            </v-col>
          </v-row>
          <v-row v-if="1">
            <!--          <v-row v-if="getStatusInfo[0]?.Status === 'ТС на погрузке'">-->
            <v-col>
              <h3 class="mb-2 mt-1">Опломбирование ТС</h3>
              <span class="inputLabel">Номер пломб</span>
              <v-text-field v-model="numberOfSeal" />
              <span class="inputLabel">Номер пломбы пробы</span>
              <v-text-field v-model="numberOfSampleSeal" />
              <v-alert color="#FEC64E" v-if="errorAuth" class="mb-4">{{
                errorAuth
              }}</v-alert>
              <v-btn class="w-100" @click="onSeal">Опломбирование</v-btn>
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
      getInspectionInfo: [],
      getStatusInfo: "",
      numberOfSeal: "",
      numberOfSampleSeal: "",
      //guidLoad: this.$route.params.id,
      orderInfo: {},
      group: localStorage.getItem("Group"),
      loading: false,
      errorAuth: "",
    };
  },

  watch: {
    urlCarOpen: function () {
      this.getOrder();
      this.getStatus();
    },
  },

  methods: {
    checkPlomb() {
      return !this.numberOfSeal && !this.numberOfSampleSeal;
    },
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
    changeCompleteInspection: async function (result) {
      const params = {
        Request: "CompletedInspection",
        GUID_Load: this.urlCarOpen,
        Result: result,
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
    changeReadyForShipment: async function (result) {
      const params = {
        Request: "ReadyShipment",
        GUID_Load: this.urlCarOpen,
        Result: result,
      };

      await axios
        .get(config.backendUrl, { params })
        .then((response) => (this.getShipmentInfo = response.data.data));
      this.getStatus();
    },
    onSeal: async function () {
      if (!this.checkPlomb()) {
        this.errorAuth = "";
        const params = {
          Request: "Sealing",
          GUID_Load: this.urlCarOpen,
          Seal: this.numberOfSeal,
          SampleSeal: this.numberOfSampleSeal,
        };

        await axios
          .get(config.backendUrl, { params })
          .then((response) => (this.getSealingInfo = response.data.data));
        this.getStatus();
      } else this.errorAuth = "Заполните поля";
    },
  },
});
</script>
<!-- http://localhost:8080/changeCarStatus/4b0a0636-850c-11ed-9e14-00155d011400 -->

<style scoped>
.page-container {
  border-radius: 10px;
}
.v-list-item {
  min-height: 30px;
}
</style>

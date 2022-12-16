<template>
  <v-container>
    <v-row>
      <v-col cols="5">
        <h2 class="mb-5">Отметка о прибытии ТС</h2>
        <v-text-field v-model="guidLoadTsArrival" label="GUID Load документа" />
        <v-btn @click="changeTsArrival">ТС прибыло</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="5">
        <h2 class="mb-5">Отправка ТС на ожидание</h2>
        <v-text-field v-model="guidLoadTsOnHold" label="GUID Load документа" />
        <v-btn @click="changeTsOnHold">ТС на ожидании</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="5">
        <h2 class="mb-5">Кнопки для охранника после досмотра</h2>
        <v-btn class="mr-10">Допущен</v-btn>
        <v-btn>Не допущен</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="5">
        <h2 class="mb-5">Отметка о выполнении досмотра ТС</h2>
        <v-text-field v-model="guidForInspection" label="GUID Load документа" />
        <v-btn class="mr-10" @click="changeCompleteInspection"
          >ТС Досмотрено</v-btn
        >
        <v-btn @click="changeCompleteInspection">ТС на ожидании</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="5">
        <h2 class="mb-5">Отметка о готовности к погрузке ТС</h2>
        <v-text-field v-model="guidForShipment" label="GUID Load документа" />
        <v-btn class="mr-10" @click="changeReadyForShipment"
          >ТС на отгрузке</v-btn
        >
        <v-btn @click="changeReadyForShipment">Погрузка ТС невозможна</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="5">
        <h2 class="mb-5">Опломбирование ТС</h2>
        <v-text-field v-model="guidForSealing" label="GUID Load документа" />
        <v-text-field v-model="numberOfSeal" label="Номер пломб" />
        <v-text-field v-model="numberOfSampleSeal" label="Номер пломбы пробы" />
        <v-btn @click="onSeal">Опломбирование</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="5">
        <h2 class="mb-5">Получение статуса</h2>
        <v-text-field v-model="guidStatus" label="GUID Load документа" />
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
      guidLoadTsArrival: "",
      getTsArrivalInfo: "",
      guidLoadTsOnHold: "",
      getTsOnHoldInfo: "",
      guidForInspection: "",
      getInspectionInfo: "",
      inspectionResult: null,
      guidForShipment: "",
      getShipmentInfo: "",
      readyShipmentResult: null,
      guidForSealing: "",
      getSealingInfo: "",
      numberOfSeal: "",
      numberOfSampleSeal: "",
      guidStatus: "",
      getStatusInfo: "",
    };
  },
  methods: {
    changeTsArrival() {
      const params = {
        Request: "Arrival",
        GUID_Load: this.guidLoadTsArrival,
      };

      axios
        .get(config.backendUrl, { params })
        .then((response) => (this.getTsArrivalInfo = response.data.data));
    },
    changeTsOnHold() {
      const params = {
        Request: "SendOnHold",
        GUID_Load: this.guidLoadTsOnHold,
      };

      axios
        .get(config.backendUrl, { params })
        .then((response) => (this.getTsOnHoldInfo = response.data.data));
    },
    changeCompleteInspection(item) {
      if (item.target.innerHTML === "ТС Досмотрено") {
        this.inspectionResult = 0;
      } else if (item.target.innerHTML === "ТС на ожидании") {
        this.inspectionResult = 1;
      }
      const params = {
        Request: "CompletedInspection",
        GUID_Load: this.guidForInspection,
        Result: this.inspectionResult,
      };

      axios
        .get(config.backendUrl, { params })
        .then((response) => (this.getInspectionInfo = response.data.data));
    },
    changeReadyForShipment(item) {
      if (item.target.innerHTML === "ТС на отгрузке") {
        this.readyShipmentResult = 0;
      } else if (item.target.innerHTML === "Погрузка ТС невозможна") {
        this.readyShipmentResult = 1;
      }
      const params = {
        Request: "ReadyShipment",
        GUID_Load: this.guidForShipment,
        Result: this.readyShipmentResult,
      };

      axios
        .get(config.backendUrl, { params })
        .then((response) => (this.getShipmentInfo = response.data.data));
    },
    onSeal() {
      const params = {
        Request: "Sealing",
        GUID_Load: this.guidForSealing,
        Seal: this.numberOfSeal,
        SampleSeal: this.numberOfSampleSeal,
      };

      axios
        .get(config.backendUrl, { params })
        .then((response) => (this.getSealingInfo = response.data.data));
    },
    getStatus() {
      const params = {
        Request: "GetStatus",
        GUID_Load: this.guidStatus,
      };

      axios
        .get(config.backendUrl, { params })
        .then((response) => (this.getStatusInfo = response.data.data));
    },
  },
});
</script>

<style></style>

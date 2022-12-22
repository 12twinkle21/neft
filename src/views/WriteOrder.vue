<template>
  <v-container>
    <v-row class="flex-column">
      <v-card-title class="mb-5">Новый заказ</v-card-title>
      <v-form>
        <v-row>
          <v-col>
            <v-row>
              <v-col class="d-flex">
                <p class="carsInfo__inputTitle mr-5">Дата отгрузки</p>
                <Datepicker
                  id="datepicker"
                  class="w-100"
                  v-model="shippingDate"
                  format="dd.MM.yyyy"
                  locale="ru"
                  autoApply
                  textInput
                />
              </v-col>
              <v-col class="d-flex w-100">
                <p class="carsInfo__inputTitle mr-5">Время прибытия</p>
                <Datepicker
                  id="datepicker"
                  class="w-100"
                  v-model="shippingTime"
                  format="HH:mm"
                  locale="ru"
                  autoApply
                  textInput
                />
              </v-col>
            </v-row>
            <v-text-field label="GUID заказа клиента" v-model="guidOrder" />
            <v-text-field label="GUID Водителя" v-model="guidDriver" />
            <v-select
              label="Список перевозчиков"
              :items="changeTransporterList"
              v-model="selectedUser"
            />
            <v-text-field
              label="Плановая масса, число"
              type="number"
              v-model.number="weight"
              @change="checkWeight"
            />
            <v-text-field label="Госномер авто" v-model="autoNumber" />
            <v-text-field label="Марка авто" v-model="autoName" />
            <v-text-field label="Госномерприцепа" v-model="autoNumber2" />
            <v-text-field label="Марка прицепа" v-model="autoName2" />
          </v-col>
        </v-row>
        <v-btn @click="sendAutoInfo">Отправить данные</v-btn>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import config from "@/config";
import { formatDate } from "@/utils/utils";

export default {
  name: "WriteOrder",
  data() {
    return {
      shippingDate: new Date(),
      shippingTime: new Date(),
      guidOrder: "",
      guidDriver: "",
      guidTransporter: "",
      weight: null,
      autoNumber: "",
      autoName: "",
      autoNumber2: "",
      autoName2: "",
      getInfo: "",
      driversList: "",
      transporterList: {},
      selectedUser: "",
    };
  },
  mounted() {
    // this.listDrivers();
    this.getTransporterList();
  },
  computed: {
    changeTransporterList() {
      let changeTL = [];
      for (const key in this.transporterList) {
        changeTL.push(this.transporterList[key].Name);
      }
      return changeTL;
    },
  },
  methods: {
    // listDrivers() {
    //   const params = {
    //     Request: "GetDrivers",
    //     GUID: localStorage.getItem("GUID"),
    //     Date_From: formatDate(this.dateBegin),
    //     Date_By: formatDate(this.dateEnd),
    //   };
    //
    //   axios
    //     .get(config.backendUrl, { params })
    //     .then((response) => (this.driversList = response.data.data));
    // },
    getTransporterList() {
      const params = {
        Request: "GetListTransporters",
      };

      axios
        .get(config.backendUrl, { params })
        .then((response) => (this.transporterList = response.data.data));
    },
    sendAutoInfo() {
      if (
        this.guidOrder &&
        this.guidDriver &&
        this.weight &&
        this.autoNumber &&
        this.autoName &&
        this.autoNumber2 &&
        this.autoName2
      ) {
        const bodyFormData = new FormData();
        bodyFormData.append("Request", "WriteOrder");
        bodyFormData.append("GUID_Order", this.guidOrder);
        bodyFormData.append("GUID_Transporter", this.guidTransporter);
        bodyFormData.append("Shipping_Date", formatDate(this.shippingDate));
        bodyFormData.append(
          "Arrival_Time",
          formatDate(this.shippingDate, this.shippingTime)
        );
        bodyFormData.append("GUID_Driver", this.guidDriver);
        bodyFormData.append("Weight", this.weight);
        bodyFormData.append("Auto_Number", this.autoNumber);
        bodyFormData.append("Auto_Name", this.autoName);
        bodyFormData.append("Auto_Number2", this.autoNumber2);
        bodyFormData.append("Auto_Name2", this.autoName2);
        axios
          .post(config.backendUrl, bodyFormData)
          .then((response) => (this.getInfo = response.data));
      }
    },
    checkWeight() {
      if (this.weight % 25 !== 0) {
        this.weight = "";
      }
    },
  },
};
</script>

<style></style>

<template>
  <v-container>
    <v-card class="flex-column pa-5">
      <v-card-title class="mb-5">
        <v-btn class="mr-3" to="/">Назад</v-btn>Новый заказ</v-card-title
      >
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
            <v-autocomplete
              class="mt-4"
              filter
              :menu-props="{ maxHeight: 500 }"
              label="Список водителей"
              :items="changeDriverList"
              v-model="selectedDriverFio"
            />
            <v-autocomplete
              filter
              label="Список перевозчиков"
              :items="changeTransporterList"
              v-model="selectedTransporter"
            />
            <v-text-field
              label="Плановая масса, число"
              type="number"
              v-model.number="weight"
              @change="checkWeight"
            />
            <v-alert color="#FEC64E" v-if="errorW" class="mb-4">{{
              errorW
            }}</v-alert>
            <v-text-field label="Госномер авто" v-model="autoNumber" />
            <v-text-field label="Марка авто" v-model="autoName" />
            <v-text-field label="Госномерприцепа" v-model="autoNumber2" />
            <v-text-field label="Марка прицепа" v-model="autoName2" />
          </v-col>
        </v-row>
        <v-alert color="#FEC64E" v-if="error" class="mb-4">{{ error }}</v-alert>
        <v-btn class="customMainBtn" @click="sendAutoInfo"
          >Отправить данные</v-btn
        >
      </v-form>
    </v-card>
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
      selectedTransporter: "",
      selectedDriverFio: "",
      error: "",
      errorW: "",
    };
  },
  mounted() {
    this.getTransporterList();
    this.searchDrivers();
  },
  computed: {
    checkError() {
      return (
        !!this.selectedDriverFio &&
        !!this.guidOrder &&
        !!this.guidDriver &&
        !!this.weight &&
        !!this.autoNumber &&
        !!this.autoName &&
        !!this.autoNumber2 &&
        !!this.autoName2
      );
    },
    changeTransporterList() {
      let changeTL = [];
      for (const key in this.transporterList) {
        changeTL.push(this.transporterList[key].Name);
      }
      return changeTL;
    },
    changeDriverList() {
      let changeTL = [];
      for (const key in this.driversList) {
        changeTL.push(this.driversList[key].FIO);
      }
      return changeTL;
    },
  },
  watch: {
    selectedDriverFio() {
      this.getGuidOrder();
      this.getGuidDriver();
    },
    selectedTransporter() {
      this.searchTransporterGuid();
    },
  },
  methods: {
    searchTransporterGuid() {
      for (const key in this.transporterList) {
        if (
          this.transporterList[key].Name.toLowerCase() ===
          this.selectedTransporter.toLowerCase()
        ) {
          this.guidTransporter = this.transporterList[key].GUID;
        }
      }
    },
    getGuidOrder() {
      for (const key in this.driversList) {
        if (
          this.driversList[key].FIO.toLowerCase() ===
          this.selectedDriverFio.toLowerCase()
        ) {
          this.guidOrder = this.driversList[key].GUID_Order;
        }
      }
    },
    getGuidDriver() {
      for (const key in this.driversList) {
        if (
          this.driversList[key].FIO.toLowerCase() ===
          this.selectedDriverFio.toLowerCase()
        ) {
          this.guidDriver = this.driversList[key].GUID_Driver;
        }
      }
    },
    searchDrivers() {
      const params = {
        Request: "GetDrivers",
        GUID: localStorage.getItem("GUID"),
        Date_From: formatDate(this.shippingDate),
        Date_By: formatDate(this.shippingDate),
      };

      axios
        .get(config.backendUrl, { params })
        .then((response) => (this.driversList = response.data.data));
    },

    getTransporterList() {
      const params = {
        Request: "GetListTransporters",
      };

      axios
        .get(config.backendUrl, { params })
        .then((response) => (this.transporterList = response.data.data));
    },
    sendAutoInfo() {
      if (this.checkError) {
        this.error = "";
        const bodyFormData = new FormData();
        bodyFormData.append("Request", "WriteOrder");
        bodyFormData.append("GUID_Order", this.guidOrder);
        bodyFormData.append("GUID_Transporter", this.guidTransporter);
        bodyFormData.append("Shipping_Date", formatDate(this.shippingDate));
        bodyFormData.append(
          "Arrival_Time",
          formatDate(this.shippingTime, true)
        );
        bodyFormData.append("GUID_Driver", this.guidDriver);
        bodyFormData.append("Weight", this.weight);
        bodyFormData.append("Auto_Number", this.autoNumber);
        bodyFormData.append("Auto_Name", this.autoName);
        bodyFormData.append("Auto_Number2", this.autoNumber2);
        bodyFormData.append("Auto_Name2", this.autoName2);

        console.log("GUID_Order", this.guidOrder, "---", typeof this.guidOrder);
        console.log(
          "GUID_Transporter",
          this.guidTransporter,
          "---",
          typeof this.guidTransporter
        );
        console.log(
          "Shipping_Date",
          formatDate(this.shippingDate),
          "---",
          typeof formatDate(this.shippingDate)
        );
        console.log(
          "Arrival_Time",
          formatDate(this.shippingTime, true),
          "---",
          typeof formatDate(this.shippingTime, true)
        );
        console.log(
          "GUID_Driver",
          this.guidDriver,
          "---",
          typeof this.guidDriver
        );
        console.log("Weight", this.weight, "---", typeof this.weight);
        console.log(
          "Auto_Number",
          this.autoNumber,
          "---",
          typeof this.autoNumber
        );
        console.log("Auto_Name", this.autoName, "---", typeof this.autoName);
        console.log(
          "Auto_Number2",
          this.autoNumber2,
          "---",
          typeof this.autoNumber2
        );
        console.log("Auto_Name2", this.autoName2, "---", typeof this.autoName2);

        axios.post(config.backendUrl, bodyFormData).then((response) => {
          if (response.data.data[0].Error) {
            this.error = response.data.data[0].Error;
          } else {
            this.getInfo = response.data;
            this.error = "";
          }
        });
      } else {
        this.error = "Все поля должны быть заполнены";
      }
    },
    checkWeight() {
      if (this.weight % 25 !== 0) {
        this.weight = "";
        this.errorW = "Масса должны быть кратна 25";
      } else this.errorW = "";
    },
  },
};
</script>

<style></style>

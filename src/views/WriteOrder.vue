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
                  time-picker
                  autoApply
                  textInput
                />
              </v-col>
            </v-row>
            <span class="inputLabel">Список водителей</span>
            <v-autocomplete
              class="mt-4"
              filter
              :menu-props="{ maxHeight: 500 }"
              :items="changeDriverList()"
              v-model="selectedDriverFio"
            />
            <span class="inputLabel">Список перевозчиков</span>
            <v-autocomplete
              filter
              :items="changeTransporterList"
              v-model="selectedTransporter"
            />
            <span class="inputLabel">Плановая масса, число</span>
            <v-text-field
              type="number"
              v-model.number="weight"
              @change="checkWeight"
            />
            <v-alert color="#FEC64E" v-if="errorW" class="mb-4">{{
              errorW
            }}</v-alert>
            <span class="inputLabel">Госномер авто</span>
            <v-text-field v-model="autoNumber" />
            <span class="inputLabel">Марка авто</span>
            <v-text-field v-model="autoName" />
            <span class="inputLabel">Госномер прицепа</span>
            <v-text-field v-model="autoNumber2" />
            <span class="inputLabel">Марка прицепа</span>
            <v-text-field v-model="autoName2" />
          </v-col>
        </v-row>
        <v-alert color="#FEC64E" v-if="error" class="mb-4">{{ error }}</v-alert>
        <v-alert color="#FEC64E" v-if="mess" class="mb-4">{{ mess }}</v-alert>
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
      thisHours: new Date().getHours(),
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
      mess: "",
      updateDriverList: "",
    };
  },
  mounted() {
    this.getTransporterList();
    this.searchDrivers();
    this.shippingTime = { hours: this.thisHours, minutes: 0 };
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
  },
  watch: {
    selectedDriverFio() {
      this.getGuidOrder();
      this.getGuidDriver();
    },
    selectedTransporter() {
      this.searchTransporterGuid();
    },
    shippingDate() {
      this.searchDrivers();
      this.getGuidDriver();
      this.getGuidOrder();
      this.changeDriverList();
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
    changeDriverList() {
      let changeTL = [];
      for (const key in this.driversList) {
        changeTL.push(
          `${this.driversList[key].FIO} (${this.driversList[key].Number_pr})`
        );
      }
      return changeTL;
    },
    getGuidOrder() {
      for (const key in this.driversList) {
        if (
          `${this.driversList[key].FIO.toLowerCase()} (${
            this.driversList[key].Number_pr
          })` === this.selectedDriverFio.toLowerCase()
        ) {
          this.guidOrder = this.driversList[key].GUID_Order;
        }
      }
    },
    getGuidDriver() {
      for (const key in this.driversList) {
        if (
          `${this.driversList[key].FIO.toLowerCase()} (${
            this.driversList[key].Number_pr
          })` === this.selectedDriverFio.toLowerCase()
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
      let checkArrivalTime1 = Object.values(this.shippingTime)[0] < 10 ? 0 : "";
      let checkArrivalTime2 = Object.values(this.shippingTime)[1] < 10 ? 0 : "";
      if (this.checkError) {
        this.error = "";
        this.mess = "";
        const bodyFormData = new FormData();
        bodyFormData.append("Request", "WriteOrder");
        bodyFormData.append("GUID_Order", this.guidOrder);
        bodyFormData.append("GUID_Transporter", this.guidTransporter);
        bodyFormData.append("Shipping_Date", formatDate(this.shippingDate));
        bodyFormData.append(
          "Arrival_Time",
          formatDate(this.shippingDate) +
            " " +
            checkArrivalTime1 +
            Object.values(this.shippingTime)[0] +
            ":" +
            checkArrivalTime2 +
            Object.values(this.shippingTime)[1]
        );
        bodyFormData.append("GUID_Driver", this.guidDriver);
        bodyFormData.append("Weight", this.weight);
        bodyFormData.append("Auto_Number", this.autoNumber);
        bodyFormData.append("Auto_Name", this.autoName);
        bodyFormData.append("Auto_Number2", this.autoNumber2);
        bodyFormData.append("Auto_Name2", this.autoName2);

        axios.post(config.backendUrl, bodyFormData).then((response) => {
          if (response.data.data[0].Error) {
            this.error = response.data.data[0].Error;
          } else {
            this.getInfo = response.data;
            this.mess = "Заказ успешно добавлен";
            this.error = "";
            alert("Заказ успешно добавлен");
            this.selectedDriverFio = "";
            this.selectedTransporter = "";
            this.weight = null;
            this.autoNumber = "";
            this.autoName = "";
            this.autoNumber2 = "";
            this.autoName2 = "";
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

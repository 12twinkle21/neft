<template>
  <v-container>
    <v-card class="flex-column pa-5">
      <v-card-title class="mb-5">
        <v-btn class="mr-3" to="/">Назад</v-btn>Изменение заказа</v-card-title
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
            <span class="inputLabel">Список водителей</span>
            <v-autocomplete
              class="mt-4"
              filter
              :menu-props="{ maxHeight: 500 }"
              :items="changeDriverList"
              v-model="selectedDriverFio"
            />
            <v-alert color="#FEC64E" v-if="errorGuidDrider" class="mb-4">{{
              errorGuidDrider
            }}</v-alert>
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
        <v-btn class="customMainBtn" @click="changeOrder"
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
  name: "ChangeOrder",
  data() {
    return {
      shippingDate: new Date(),
      shippingTime: new Date(),
      guidOrder: "",
      guidDriver: "",
      weight: null,
      autoNumber: "",
      autoName: "",
      autoNumber2: "",
      autoName2: "",
      getInfo: "",
      orderInfo: "",
      guidLoad: this.$route.params.id,
      driversList: null,
      selectedDriverFio: "",
      errorGuidDrider: "",
      error: "",
      errorW: "",
    };
  },
  watch: {
    selectedDriverFio() {
      this.getGuidOrder();
      this.getGuidDriver();
    },
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
    changeDriverList() {
      let changeTL = [];
      for (const key in this.driversList) {
        changeTL.push(this.driversList[key].FIO);
      }
      return changeTL;
    },
  },
  methods: {
    getGuidOrder() {
      for (const key in this.driversList) {
        if (
          this.driversList[key].FIO.toLowerCase() ===
          this.selectedDriverFio.toLowerCase()
        ) {
          this.errorGuidDrider = "";
          this.guidOrder = this.driversList[key].GUID_Order;
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
    changeOrder() {
      if (this.checkError) {
        this.errorGuidDrider = "";
        this.error = "";
        const bodyFormData = new FormData();
        bodyFormData.append("Request", "ChangeOrder");
        bodyFormData.append("GUID_Order", this.guidOrder);
        bodyFormData.append("GUID_Transporter", localStorage.getItem("GUID"));
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
    checkWeight() {
      if (this.weight % 25 !== 0) {
        this.weight = "";
        this.errorW = "Масса должны быть кратна 25";
      } else this.errorW = "";
    },
    getOrder() {
      const params = {
        Request: "GetOrder",
        GUID: this.guidLoad,
      };

      axios
        .get(config.backendUrl, { params })
        .then(
          (response) => (
            (this.orderInfo = response.data.data),
            (this.autoNumber =
              response.data.data[0].Auto.split("/")[0].split(" ")[1]),
            (this.autoName =
              response.data.data[0].Auto.split("/")[0].split(" ")[0]),
            (this.weight = Math.round(response.data.data[0].Weight)),
            (this.autoNumber2 =
              response.data.data[0].Auto.split("/")[1].split(" ")[2]),
            (this.autoName2 =
              response.data.data[0].Auto.split("/")[1].split(" ")[1]),
            (this.weight = Math.round(response.data.data[0].Weight))
          )
        );
    },
  },

  mounted() {
    this.getOrder();
    this.searchDrivers();
    this.getGuidOrder();
  },
};
</script>

<style></style>

<template>
  <v-container>
    <v-row class="flex-column">
      <v-card-title class="mb-5">Изменение заказа</v-card-title>
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
                  v-model="shippingDate"
                  format="dd.MM.yyyy HH:mm"
                  locale="ru"
                  autoApply
                  textInput
                />
              </v-col>
            </v-row>
            <v-text-field
              v-model="guidTransporter"
              label="GUID контрагента (клиента)"
            />
            <v-text-field label="GUID заказа клиента" v-model="guidOrder" />
            <v-text-field label="GUID Водителя" v-model="guidDriver" />
          </v-col>
          <v-col>
            <v-text-field
              label="Плановая масса, число"
              type="number"
              v-model.number="weight"
            />
            <v-text-field label="Госномер авто" v-model="autoNumber" />
            <v-text-field label="Марка авто" v-model="autoName" />
            <v-text-field label="Госномерприцепа" v-model="autoNumber2" />
            <v-text-field label="Марка прицепа" v-model="autoName2" />
          </v-col>
        </v-row>
        <v-btn @click="changeAutoInfo">Отправить данные</v-btn>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import config from "@/config";

export default {
  name: "ChangeOrder",
  data() {
    return {
      shippingDate: new Date(),
      arrivalTime: "",
      guidTransporter: "",
      guidOrder: "",
      guidDriver: "",
      weight: null,
      autoNumber: "",
      autoName: "",
      autoNumber2: "",
      autoName2: "",
      getInfo: "",
    };
  },
  methods: {
    changeAutoInfo() {
      const bodyFormData = new FormData();
      bodyFormData.append("Request", "ChangeOrder");
      bodyFormData.append("GUID_Order", this.guidOrder);
      bodyFormData.append("GUID_Transporter", this.guidTransporter);
      bodyFormData.append("Shipping_Date", "10.11.2022");
      bodyFormData.append("Arrival_Time", "10.12.2022 12:00");
      bodyFormData.append("GUID_Driver", this.guidDriver);
      bodyFormData.append("Weight", this.weight);
      bodyFormData.append("Auto_Number", this.autoNumber);
      bodyFormData.append("Auto_Name", this.autoName);
      bodyFormData.append("Auto_Number2", this.autoNumber2);
      bodyFormData.append("Auto_Name2", this.autoName2);
      axios
        .post(config.backendUrl, bodyFormData)
        .then((response) => (this.getInfo = response.data));
    },
  },
};
</script>

<style></style>

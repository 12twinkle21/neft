<template>
  <v-container class="pb-5">
    <v-row>
      <v-col v-for="(item, index) in orderInfo" :key="index">
        <p>Авто: {{ item.Auto }}</p>
        <p>ФИО: {{ item.FIO }}</p>
        <p>Клиент : {{ item.Client }}</p>
        <p>Продукт: {{ item.Product }}</p>
        <p>Масса: {{ item.Weight }}</p>
        <p>Факстическое время отгрузки: {{ item.FactLoadDate }}</p>
        <p>Пломба: {{ item.Seal }}</p>
        <p>Номер пломбы пробы: {{ item.SampleSeal }}</p>
        <p>Номер ТТН: {{ item.NomberTTN }}</p>
        <v-btn class="mt-10" :to="linkToChange">Изменить заказ</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import config from "@/config";

export default defineComponent({
  name: "GetOrderView",

  data() {
    return {
      guidLoad: this.$route.params.id,
      orderInfo: {},
    };
  },
  mounted() {
    this.getOrder();
  },
  computed: {
    linkToChange() {
      return `/changeOrder/${this.guidLoad}`;
    },
  },
  methods: {
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

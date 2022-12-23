<template>
  <v-container class="pb-5">
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
            >Факстическое время отгрузки: {{ item.FactLoadDate }}</v-list-item
          >
          <v-list-item>Пломба: {{ item.Seal }}</v-list-item>
          <v-list-item>Номер пломбы пробы: {{ item.SampleSeal }}</v-list-item>
          <v-list-item>Номер ТТН: {{ item.NomberTTN }}</v-list-item>
        </v-list>
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

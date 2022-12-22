<template>
  <v-container class="pb-5">
    <v-row>
      <v-col>
        <p>Авто: кек</p>
        <p>ФИО: лол кек лол</p>
        <p>Клиент : кеклол</p>
        <p>Продукт: лолкек</p>
        <p>Масса: 25</p>
        <p>Факстическое время отгрузки: 10.10.2022 12:00</p>
        <p>Пломба: kek123</p>
        <p>Номер пломбы пробы: lol123</p>
        <p>Номер ТТН: лолкек321</p>
        <v-btn :to="linkToChange">Изменить заказ</v-btn>
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

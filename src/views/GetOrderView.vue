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
        <v-btn to="/changeOrder">Изменить заказ</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "GetOrderView",

  data() {
    return {};
  },
  methods: {},
});
</script>

<style></style>

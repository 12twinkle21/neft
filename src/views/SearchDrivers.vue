<template>
  <v-container>
    <v-row class="flex-column">
      <v-card-title class="text-center mb-5">Данные автомобиля</v-card-title>
      <v-form>
        <p class="carsInfo__inputTitle">GUID контрагента (клиента)</p>
        <v-text-field label="Введите данные" />
        <p class="carsInfo__inputTitle">Дата начала периода запроса</p>
        <v-text-field type="date" />
        <p class="carsInfo__inputTitle">Дата окончания периода запроса</p>
        <v-text-field type="date" />
        <v-btn>Поиск</v-btn>
      </v-form>
    </v-row>
    <v-row>
      <v-col cols="12" class="mt-15">
        <easy-grid
          :headers="columns"
          :items="items"
          alternating
          :rows-per-page="10"
          :rows-items="[10, 50, 100]"
          :search-value="searchValue"
          empty-message="Записей не найдено"
          rows-per-page-message="показывать по"
          :sort-by="sortBy"
          buttons-pagination
          theme-color="#969EAD"
        >
        </easy-grid>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";

export default defineComponent({
  name: "HomeView",

  components: {
    "easy-grid": Vue3EasyDataTable,
  },
  data() {
    return {
      searchValue: "",
      sortBy: "id",
      columns: [
        { text: "GUID водителя", value: "test1", sortable: true },
        {
          text: "ФИО водителя",
          value: "test2",
          sortable: true,
        },
        { text: "GUID доверенности", value: "test3", sortable: true },
        { text: "Номер доверенности", value: "test4", sortable: true },
        { text: "GUID заказа клиента", value: "test5", sortable: true },
        { text: "Наименование продукта", value: "test6", sortable: true },
      ],
      items: [
        {
          test1: 12345,
          test2: "ФИО",
          test3: "12345",
          test4: "12345",
          test5: "12345",
          test6: "Продукт",
        },
        {
          test1: 12345,
          test2: "ФИО",
          test3: "12345",
          test4: "12345",
          test5: "12345",
          test6: "Продукт",
        },
        {
          test1: 12345,
          test2: "ФИО",
          test3: "12345",
          test4: "12345",
          test5: "12345",
          test6: "Продукт",
        },
      ],
    };
  },
});
</script>

<style></style>

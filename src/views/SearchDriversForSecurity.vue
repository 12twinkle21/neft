<template>
  <v-container class="pb-5">
    <v-row class="flex-column mp-0">
      <v-card-title class="mb-5"
        >Водители, прибывающие на загрузку</v-card-title
      >
      <v-form>
        <v-row class="w-50 mp-0">
          <v-row>
            <v-col>
              <p class="carsInfo__inputTitle">Дата начала периода запроса</p>
              <Datepicker
                id="datepicker"
                v-model="dateBegin"
                format="dd.MM.yyyy"
                locale="ru"
                autoApply
                textInput
              />
            </v-col>
            <v-col>
              <p class="carsInfo__inputTitle">Дата окончания периода запроса</p>
              <Datepicker
                id="datepicker"
                v-model="dateEnd"
                format="dd.MM.yyyy"
                locale="ru"
                autoApply
                textInput
              />
            </v-col>
          </v-row>
        </v-row>
        <v-btn class="mt-10">Поиск</v-btn>
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
      dateBegin: new Date(),
      dateEnd: new Date(),
      columns: [
        { text: "GUID документа", value: "test1", sortable: true },
        {
          text: "Статус документа",
          value: "test2",
          sortable: true,
        },
        { text: "Данные ТС", value: "test3", sortable: true },
        { text: "ФИО водителя", value: "test4", sortable: true },
        { text: "Наименование контрагента", value: "test5", sortable: true },
        { text: "Наименование продукта", value: "test6", sortable: true },
      ],
      items: [
        {
          test1: 12345,
          test2: "Ожидается ТС",
          test3: "Название ТС",
          test4: "ФИО",
          test5: "Название",
          test6: "Продукт",
        },
        {
          test1: 12345,
          test2: "Ожидается ТС",
          test3: "Название ТС",
          test4: "ФИО",
          test5: "Название",
          test6: "Продукт",
        },
        {
          test1: 12345,
          test2: "Ожидается ТС",
          test3: "Название ТС",
          test4: "ФИО",
          test5: "Название",
          test6: "Продукт",
        },
      ],
    };
  },
});
</script>

<style></style>

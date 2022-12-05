<template>
  <v-container>
    <v-row>
      <v-col cols="1"><v-btn>Главная</v-btn></v-col>
      <v-col cols="1"><v-btn to="/login">Вход</v-btn></v-col>
      <v-col cols="1"><v-btn to="/test">Test</v-btn></v-col>
    </v-row>
    <v-row class="mt-2">
      <v-col cols="4">
        <v-text-field
          label="Искать"
          v-model="searchValue"
          class=""
          density="compact"
          append-inner-icon="mdi-magnify"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
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
        { text: "Название колонки 1", value: "test1", sortable: true },
        { text: "Название колонки 2", value: "test2", sortable: true },
        { text: "Название колонки 3", value: "test3", sortable: true },
        { text: "Название колонки 4", value: "test4", sortable: true },
      ],
      items: [{ test1: 1, test2: 2 }, { test1: 2 }, { test1: 3 }],
    };
  },
});
</script>

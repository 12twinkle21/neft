<template>
  <v-container class="pb-5">
    <v-row class="flex-column mp-0">
      <v-card-title class="mb-5">Получение списка перевозчиков</v-card-title>
    </v-row>
    <v-row>
      <v-col cols="2">
        <v-btn @click="getTransporterList">Получить данные</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <easy-grid
          :headers="columns"
          :items="transporters"
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

import axios from "axios";
import config from "@/config";

export default defineComponent({
  name: "FullListClient",

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
        { text: "GUID", value: "GUID", sortable: true },
        {
          text: "Имя",
          value: "Name",
          sortable: true,
        },
      ],
      transporters: [],
    };
  },
  methods: {
    getTransporterList() {
      const params = {
        Request: "GetListTransporters",
      };

      axios
        .get(config.backendUrl, { params })
        .then((response) => (this.transporters = response.data.data));
    },
  },
});
</script>

<style></style>

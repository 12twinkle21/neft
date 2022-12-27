<template>
  <v-container class="pb-5">
    <v-col cols="2">
      <v-row class="flex-column mp-0">
        <h3>Справочник</h3>
        <v-btn class="mt-5" @click="getFullListToday">Получить данные</v-btn>
      </v-row>
    </v-col>
    <v-row>
      <v-col cols="12" class="mt-15">
        <easy-grid
          :headers="columns"
          :items="clients"
          alternating
          :rows-per-page="10"
          :rows-items="[10, 50, 100]"
          :search-value="searchValue"
          empty-message="Записей не найдено"
          rows-per-page-message="показывать по"
          :sort-by="sortBy"
          buttons-pagination
          theme-color="#969EAD"
          :loading="loading"
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
  name: "GetFullListToday",

  components: {
    "easy-grid": Vue3EasyDataTable,
  },
  data() {
    return {
      searchValue: "",
      sortBy: "id",
      columns: [
        { text: "GUID документа", value: "GUID_Load", sortable: true },
        {
          text: "Статус",
          value: "Status",
          sortable: true,
        },
        { text: "Наименование", value: "Auto_Name", sortable: true },
        { text: "ФИО", value: "FIO", sortable: true },
      ],
      clients: [],
      loading: false,
    };
  },
  methods: {
    getFullListToday() {
      this.loading = true;
      const params = {
        Request: "GetFullListToday",
      };

      axios.get(config.backendUrl, { params }).then((response) => {
        this.loading = false;
        this.clients = response.data.data;
      });
    },
  },
});
</script>

<style></style>

<template>
  <v-container class="pb-5">
    <v-row class="flex-column mp-0">
      <v-card-title class="mb-5">Поиск водителя</v-card-title>
      <v-form>
        <v-row class="w-50 mp-0">
          <v-row class="w-100">
            <v-col>
              <v-text-field
                label="GUID контрагента (клиента)"
                v-model="guidTransporter"
              />
            </v-col>
          </v-row>
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
        <v-btn @click="searchDrivers" class="mt-10">Поиск</v-btn>
      </v-form>
    </v-row>
    <v-row>
      <v-col cols="12" class="mt-15">
        <easy-grid
          :headers="columns"
          :items="drivers"
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
  name: "GetDrivers",

  components: {
    "easy-grid": Vue3EasyDataTable,
  },
  data() {
    return {
      searchValue: "",
      sortBy: "id",
      dateBegin: new Date(),
      dateEnd: new Date(),
      guidTransporter: "",
      columns: [
        { text: "GUID водителя", value: "GUID_Driver", sortable: true },
        {
          text: "ФИО водителя",
          value: "FIO",
          sortable: true,
        },
        { text: "GUID доверенности", value: "GUID_pr", sortable: true },
        { text: "Номер доверенности", value: "Number_pr", sortable: true },
        { text: "GUID заказа клиента", value: "GUID_Order", sortable: true },
        { text: "Наименование продукта", value: "Products", sortable: true },
      ],
      drivers: [],
    };
  },
  methods: {
    searchDrivers() {
      const params = {
        Request: "GetDrivers",
        // GUID: "a03a7a09-bcf9-11ea-9789-d0509996b471",
        GUID: this.guidTransporter,
        // Date_From: this.dateBegin,
        // Date_By: this.dateEnd,
        Date_From: "10.12.2022",
        Date_By: "31.12.2022",
      };

      axios
        .get(config.backendUrl, { params })
        .then((response) => (this.drivers = response.data.data));
    },
  },
});
</script>

<style></style>

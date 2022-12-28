<template>
  <v-container class="pb-5">
    <v-row class="flex-column mp-0 page-card">
      <v-card-title>Список ожидаемых ТС</v-card-title>
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
        <v-row>
          <v-col class="mt-10">
            <v-btn @click="getWaitingTs" class="mr-5">Поиск</v-btn>
            <v-btn to="/writeDrivers">Машина не найдена</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-row>
    <v-alert color="#FEC64E" v-if="errorReq" class="mb-4">{{
      errorReq
    }}</v-alert>
    <v-row>
      <v-col cols="12" class="mt-5">
        <easy-grid
          :headers="columns"
          :items="waitingTsList"
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
          <template #item-action="{ urlCarOpen }">
            <v-btn
              class="orderBtn orderBtnSec"
              icon="mdi-chart-line"
              variant="text"
              @click="fetchItemById(urlCarOpen)"
              >Открыть</v-btn
            >
          </template>
        </easy-grid>
      </v-col>
    </v-row>
    <change-car-status-for-security
      content-class="v-overlay__content-fullScreen"
      v-model="showUploadDialogSecurity"
      v-on:updateShowDialog="uploadDialogSecurity"
      :urlCarOpen="urlCarOpen"
    />
  </v-container>
</template>

<script>
import { defineComponent } from "vue";
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";

import axios from "axios";
import config from "@/config";
import { formatDate } from "@/utils/utils";
import ChangeCarStatusForSecurity from "@/views/ChangeCarStatusForSecurity";

export default defineComponent({
  name: "GetWaitingList",

  components: {
    ChangeCarStatusForSecurity,
    "easy-grid": Vue3EasyDataTable,
  },
  data() {
    return {
      searchValue: "",
      sortBy: "id",
      dateBegin: new Date(),
      dateEnd: new Date(),
      columns: [
        { text: "Данные ТС", value: "Auto", sortable: true },
        { text: "ФИО водителя", value: "FIO", sortable: true },
        { text: "Наименование контрагента", value: "Client", sortable: true },
        { text: "Наименование продукта", value: "Product", sortable: true },
        { text: "Действие", value: "action", sortable: false },
      ],
      errorReq: "",
      waitingTs: [],
      carWatingPath: "",
      loading: false,
      urlCarOpen: null,
      showUploadDialogSecurity: false,
    };
  },
  methods: {
    uploadDialogSecurity(e) {
      this.showUploadDialogSecurity = e;
    },

    fetchItemById(id) {
      this.urlCarOpen = id;
      this.showUploadDialogSecurity = true;
    },

    getWaitingTs() {
      this.loading = true;
      const params = {
        Request: "GetWaitingList",
        Date_From: formatDate(this.dateBegin),
        Date_By: formatDate(this.dateEnd),
      };

      axios.get(config.backendUrl, { params }).then((response) => {
        this.loading = false;
        console.log(response);
        this.waitingTs = [
          {
            Auto: "СКАНИЯ Н084КР73 / Прицеп АН652773",
            FIO: "Иванов Евгений Викторович",
            Client: "КРОНА ООО",
            Product: "Нефть сырая",
            Weight: 0,
            FactLoadDate: "0001-01-01T00:00:00",
            Seal: "",
            SampleSeal: "",
            NomberTTN: "",
            Error: "",
            GUID_Load: "4b0a0636-850c-11ed-9e14-00155d011400",
          },
        ];
        // this.waitingTs = response.data.data;
      });
    },
  },
  computed: {
    waitingTsList() {
      // return this.waitingTs.map((item) => {
      return this.waitingTs.map((item) => {
        if (item.Error.length > 0) {
          this.errorReq = item.Error;
          return {};
        } else {
          this.errorReq = "";
          return {
            ...item,
            urlCarOpen: item.GUID_Load,
          };
        }
      });
    },
  },
});
</script>

<style scoped>
.orderBtnSec {
  width: 100%;
}
easy-grid > tr:last-child {
  width: 100%;
}
</style>

<template>
  <v-container class="v-container-750">
    <v-card class="page-card pa-5">
      <v-card-title class="mb-5">Список ожидаемых ТС</v-card-title>
      <v-row class="mp-0">
        <v-col>
          <p class="carsInfo__inputTitle text-no-wrap">
            Дата начала периода запроса
          </p>
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
          <p class="carsInfo__inputTitle text-no-wrap">
            Дата окончания периода запроса
          </p>
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
      <v-row class="mt-5 mb-5">
        <v-col class="d-flex w-100 justify-space-between">
          <v-btn @click="getWaitingTs" class="mr-5">Поиск</v-btn>
          <v-btn to="/writeDrivers" v-if="group === 'Охрана'"
            >Машина не найдена</v-btn
          >
        </v-col>
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
            <template
              v-if="waitingTsList.length > 1"
              #item-action="{ urlCarOpen }"
            >
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
    </v-card>
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
        { text: "Статус", value: "Status", sortable: true },
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
      group: localStorage.getItem("Group"),
    };
  },
  mounted() {
    this.getWaitingTs();
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
        Request: this.group === "Охрана" ? "GetWaitingList" : "GetActiveList",
        Date_From: formatDate(this.dateBegin),
        Date_By: formatDate(this.dateEnd),
      };

      axios.get(config.backendUrl, { params }).then((response) => {
        this.loading = false;
        this.waitingTs = response.data.data;
      });
    },
  },
  watch: {
    showUploadDialogSecurity() {
      if (!this.showUploadDialogSecurity) {
        this.getWaitingTs();
      }
    },
  },

  computed: {
    waitingTsList() {
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

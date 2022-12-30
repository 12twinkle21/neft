<template>
  <v-container class="v-container-1000">
    <v-card class="page-card pa-5">
      <v-row class="flex-column mp-0">
        <v-card-title class="mb-5">Список заказов</v-card-title>
        <v-row class="w-50 mp-0">
          <v-row>
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
        </v-row>
        <v-row class="mt-5">
          <v-col>
            <v-btn @click="getFullListClient">Поиск</v-btn>
            <v-btn class="ml-5" to="/writeOrder">Создать заказ</v-btn>
          </v-col>
        </v-row>
      </v-row>
      <v-alert color="#FEC64E" v-if="errorReq" class="mb-4 mt-4">{{
        errorReq
      }}</v-alert>
      <v-row>
        <v-col cols="12" class="mt-1">
          <easy-grid
            :headers="columns"
            :items="clientsList"
            alternating
            :rows-per-page="10"
            :rows-items="[10, 50, 100]"
            :search-value="searchValue"
            empty-message="Записей не найдено"
            rows-per-page-message="показывать по"
            :sort-by="sortBy"
            :loading="loading"
            buttons-pagination
            theme-color="#969EAD"
          >
            <template #item-action="{ urlClientOpen }">
              <v-btn
                class="orderBtn"
                icon="mdi-chart-line"
                variant="text"
                @click="fetchItemById(urlClientOpen)"
                >Открыть</v-btn
              >
            </template>
          </easy-grid>
        </v-col>
      </v-row>
      <get-order-view
        content-class="v-overlay__content-fullScreen"
        v-model="showUploadDialogSecurity"
        v-on:updateShowDialog="uploadDialogSecurity"
        :urlClientOpen="urlClientOpen"
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
import GetOrderView from "@/views/GetOrderView";

export default defineComponent({
  name: "GetFullListClient",

  components: {
    GetOrderView,
    "easy-grid": Vue3EasyDataTable,
  },
  data() {
    return {
      searchValue: "",
      sortBy: "id",
      dateBegin: new Date(),
      dateEnd: new Date(),
      columns: [
        {
          text: "Статус",
          value: "Status",
          sortable: true,
        },
        { text: "Масса", value: "Weight", sortable: true },
        { text: "Авто", value: "Auto", sortable: true },
        { text: "Время отгрузки", value: "FactLoadDate", sortable: true },
        { text: "Действие", value: "action", sortable: false },
      ],
      clients: [],
      orderInfo: [],
      errorReq: "",
      loading: false,
      urlClientOpen: null,
      showUploadDialogSecurity: false,
    };
  },
  mounted() {
    if (localStorage.getItem("dateBegin"))
      this.dateBegin = localStorage.getItem("dateBegin");
    if (localStorage.getItem("dateEnd"))
      this.dateEnd = localStorage.getItem("dateEnd");
    this.getFullListClient();
  },
  unmounted() {
    this.saveDate();
  },
  methods: {
    saveDate() {
      localStorage.setItem("dateBegin", this.dateBegin);
      localStorage.setItem("dateEnd", this.dateEnd);
    },
    uploadDialogSecurity(e) {
      this.showUploadDialogSecurity = e;
    },

    fetchItemById(id) {
      this.urlClientOpen = id;
      this.showUploadDialogSecurity = true;
    },

    getFullListClient() {
      if (!this.dateBegin || !this.dateEnd) {
        this.errorReq = "Введите дату для запроса";
      } else {
        this.loading = true;
        const params = {
          Request: "GetFullListClient",
          GUID: localStorage.getItem("GUID"),
          Date_From: formatDate(new Date(Date.parse(this.dateBegin))),
          Date_By: formatDate(new Date(Date.parse(this.dateEnd))),
        };

        axios.get(config.backendUrl, { params }).then((response) => {
          this.clients = response.data.data;
          this.loading = false;
        });
      }
    },
  },
  computed: {
    clientsList() {
      return this.clients.map((item) => {
        if (item.Error.length > 0) {
          this.errorReq = item.Error;
          return "";
        } else {
          this.errorReq = "";
          return {
            ...item,
            urlClientOpen: item.GUID_load,
          };
        }
      });
    },
  },
});
</script>

<style></style>

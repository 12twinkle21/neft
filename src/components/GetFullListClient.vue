<template>
  <v-container class="pb-5">
    <v-row class="flex-column mp-0">
      <v-card-title class="mb-5">Список заказов</v-card-title>
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
        <v-btn @click="getFullListClient" class="mt-10">Поиск</v-btn>
      </v-form>
    </v-row>
    <v-alert color="#FEC64E" v-if="errorReq" class="mb-4">{{
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
          <template #item-action="{ urlClientChange, urlClientOpen }">
            <v-btn
              class="orderBtn"
              v-bind="props"
              icon="mdi-chart-line"
              variant="text"
              :to="urlClientOpen"
              >Открыть</v-btn
            >
            <v-btn
              class="orderBtn"
              v-bind="props"
              icon="mdi-chart-line"
              variant="text"
              :to="urlClientChange"
              >Изменить</v-btn
            >
          </template>
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
import { formatDate } from "@/utils/utils";

export default defineComponent({
  name: "GetFullListClient",

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
        { text: "GUID документа", value: "GUID_load", sortable: true },
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
    };
  },
  methods: {
    getFullListClient() {
      if (!this.dateBegin || !this.dateEnd) {
        this.errorReq = "Введите дату для запроса";
      } else {
        this.loading = true;
        const params = {
          Request: "GetFullListClient",
          GUID: localStorage.getItem("GUID"),
          Date_From: formatDate(this.dateBegin),
          Date_By: formatDate(this.dateEnd),
        };

        axios.get(config.backendUrl, { params }).then((response) => {
          this.clients = response.data.data;
          this.loading = false;
        });
      }
    },
    getOrder() {
      const params = {
        Request: "GetOrder",
        GUID: localStorage.getItem("GUID"),
        GUID_Load: "447f96e1-81e9-11ed-9e14-00155d011400",
      };

      axios
        .get(config.backendUrl, { params })
        .then((response) => (this.orderInfo = response.data.data));
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
            urlClientChange: `/changeOrder/${item.GUID_load}`,
            urlClientOpen: `/getOrder/${item.GUID_load}`,
          };
        }
      });
    },
  },
});
</script>

<style></style>

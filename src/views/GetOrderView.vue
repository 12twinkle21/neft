<template>
  <v-dialog hide-overlay v-model="show">
    <v-window v-model="state" class="h-100 w-50 ma-auto">
      <v-container class="page-container">
        <v-card-title class="d-flex justify-space-between align-center">
          <span class="ml-5 font-weight-bold">Информация</span>
          <v-btn
            icon="mdi-close"
            class="icon-btn"
            color="red"
            variant=""
            @click="$emit('updateShowDialog', false)"
          />
        </v-card-title>
        <v-row>
          <v-col>
            <v-list>
              <v-progress-circular
                v-if="loading"
                class="progressCircular"
                indeterminate
                color="primary"
              ></v-progress-circular>
              <v-list-item
                ><span class="boldChangeStatusText">Статус:</span>
                {{ getStatusInfo[0]?.Status }}</v-list-item
              >
              <v-list-item
                ><span class="boldChangeStatusText">Авто:</span>
                {{ orderInfo[0]?.Auto.split("/")[0] }}</v-list-item
              >
              <v-list-item
                ><span class="boldChangeStatusText">Прицеп:</span>
                {{ orderInfo[0]?.Auto.split("/")[1] }}</v-list-item
              >
              <v-list-item
                ><span class="boldChangeStatusText">ФИО:</span>
                {{ orderInfo[0]?.FIO }}</v-list-item
              >
              <v-list-item
                ><span class="boldChangeStatusText">Клиент:</span>
                {{ orderInfo[0]?.Client }}</v-list-item
              >
              <v-list-item
                ><span class="boldChangeStatusText">Продукт:</span>
                {{ orderInfo[0]?.Product }}</v-list-item
              >
              <v-list-item
                ><span class="boldChangeStatusText">Масса:</span>
                {{ orderInfo[0]?.Weight }}</v-list-item
              >
              <v-list-item
                ><span class="boldChangeStatusText"
                  >Факстическое время отгрузки:</span
                >
                {{ orderInfo[0]?.FactLoadDate }}</v-list-item
              >
              <v-list-item
                ><span class="boldChangeStatusText">Пломба:</span>
                {{ orderInfo[0]?.Seal }}</v-list-item
              >
              <v-list-item
                ><span class="boldChangeStatusText">Номер пломбы пробы:</span>
                {{ orderInfo[0]?.SampleSeal }}</v-list-item
              >
              <v-list-item
                ><span class="boldChangeStatusText">Номер ТТН:</span>
                {{ orderInfo[0]?.NomberTTN }}</v-list-item
              >
            </v-list>
            <v-btn
              v-if="
                getStatusInfo[0]?.Status === 'Ожидается ТС' ||
                getStatusInfo[0]?.Status === 'Нет статусного состояния'
              "
              class="mt-10 customMainBtn"
              :to="linkToChange"
              >Изменить заказ</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-window>
  </v-dialog>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import config from "@/config";

export default defineComponent({
  name: "GetOrderView",
  props: {
    urlClientOpen: Number,
  },
  data() {
    return {
      //guidLoad: this.$route.params.id,
      orderInfo: {},
      loading: false,
      getStatusInfo: "",
    };
  },
  watch: {
    urlClientOpen: function () {
      this.getOrder();
      this.getStatus();
    },
  },
  computed: {
    linkToChange() {
      return `/changeOrder/${this.urlClientOpen}`;
    },
  },
  methods: {
    getStatus() {
      this.loading = true;
      console.log(this.urlClientOpen, "urlClientOpen");
      const params = {
        Request: "GetStatus",
        GUID_Load: this.urlClientOpen,
      };

      axios.get(config.backendUrl, { params }).then((response) => {
        this.getStatusInfo = response.data.data;
        this.loading = false;
      });
    },
    getOrder() {
      this.loading = true;
      const params = {
        Request: "GetOrder",
        GUID: this.urlClientOpen,
      };

      axios.get(config.backendUrl, { params }).then((response) => {
        this.loading = false;
        this.orderInfo = response.data.data;
      });
    },
  },
});
</script>

<style scoped>
.page-container {
  border-radius: 10px;
}
</style>

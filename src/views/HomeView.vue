<template>
  <v-container>
    <v-row class="mb-5">
      <c-col cols="2"
        ><v-btn class="mr-5" @click="showSecurityBlock = !showSecurityBlock"
          >Охранник</v-btn
        ></c-col
      >
      <c-col cols="2"
        ><v-btn class="mr-5" @click="showOperatorBlock = !showOperatorBlock"
          >Оператор</v-btn
        ></c-col
      >
      <c-col cols="2"
        ><v-btn class="mr-5" @click="showClientBlock = !showClientBlock"
          >Клиент</v-btn
        ></c-col
      >
      <c-col cols="2"
        ><v-btn class="mr-5" @click="showDontKnowBlock = !showDontKnowBlock"
          >Хз куда</v-btn
        ></c-col
      >
    </v-row>
    <v-row>
      <v-col cols="2"><v-btn to="/carWaiting">Ожидание для авто</v-btn></v-col>
      <v-col cols="2"><v-btn to="/cisternSeal">Пломба цистерны</v-btn></v-col>
    </v-row>
    <v-row>
      <v-col cols="2"><v-btn to="/otherElements">Прочее</v-btn></v-col>
    </v-row>
    <div v-if="showSecurityBlock">
      <get-waiting-list />
      <v-row>
        <v-col cols="3">
          <v-btn to="/writeDrivers">Автомобиля в списке нет</v-btn>
        </v-col>
      </v-row>
    </div>
    <div v-if="showClientBlock">
      <get-drivers />
      <get-list-transporters />
    </div>
    <div v-if="showDontKnowBlock">
      <write-order />
      <change-order />
      <get-full-list-client />
      <get-full-list-today />
    </div>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";
// import Vue3EasyDataTable from "vue3-easy-data-table";
// import "vue3-easy-data-table/dist/style.css";

import GetDrivers from "../components/GetDrivers.vue";
import GetWaitingList from "../components/GetWaitingList.vue";
import GetListTransporters from "../components/GetListTransporters.vue";
import WriteOrder from "../components/WriteOrder.vue";
import ChangeOrder from "../components/ChangeOrder.vue";
import GetFullListClient from "../components/GetFullListClient.vue";
import GetFullListToday from "../components/GetFullListToday.vue";

export default defineComponent({
  name: "HomeView",

  components: {
    // "easy-grid": Vue3EasyDataTable,
    GetDrivers,
    GetWaitingList,
    GetListTransporters,
    WriteOrder,
    ChangeOrder,
    GetFullListClient,
    GetFullListToday,
  },
  data() {
    return {
      // searchValue: "",
      // sortBy: "id",
      // columns: [
      //   { text: "Название колонки 1", value: "test1", sortable: true },
      //   { text: "Название колонки 2", value: "test2", sortable: true },
      //   { text: "Название колонки 3", value: "test3", sortable: true },
      //   { text: "Название колонки 4", value: "test4", sortable: true },
      // ],
      // items: [{ test1: 1, test2: 2 }, { test1: 2 }, { test1: 3 }],
      // user: "",
      showSecurityBlock: false,
      showOperatorBlock: false,
      showClientBlock: false,
      showDontKnowBlock: false,
    };
  },
});
</script>

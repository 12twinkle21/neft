<template>
  <v-container>
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
    <div v-if="group === 'Клиент'">
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
      showSecurityBlock: false,
      showOperatorBlock: false,
      showClientBlock: false,
      showDontKnowBlock: false,
      group: localStorage.getItem("Group"),
    };
  },
  // methods: {
  //   getGroup() {
  //     this.group = localStorage.getItem("Group");
  //   },
  // },
  // mounted() {
  //   this.getGroup();
  // },
});
</script>

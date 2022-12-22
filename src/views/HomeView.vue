<template>
  <v-container>
    <!-- <v-row>
      <v-col cols="2"><v-btn to="/carWaiting">Ожидание для авто</v-btn></v-col>
      <v-col cols="2"><v-btn to="/cisternSeal">Пломба цистерны</v-btn></v-col>
    </v-row>
    <v-row>
      <v-col cols="2"><v-btn to="/otherElements">Прочее</v-btn></v-col>
    </v-row> -->
    <div v-if="group === 'Клиент'">
      <client-view />
    </div>
    <div v-if="group === 'Охрана'">
      <security-view />
    </div>
    <div v-if="group === 'Оператор отгрузки'">
      <operator-view />
    </div>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";

import ClientView from "./ClientView.vue";
import OperatorView from "./OperatorView.vue";
import SecurityView from "./SecurityView.vue";

export default defineComponent({
  name: "HomeView",

  components: {
    ClientView,
    SecurityView,
    OperatorView,
  },
  data() {
    return {
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

<template>
  <v-container>
    <get-waiting-list />
    <get-full-list-today />
  </v-container>
</template>

<script>
import { defineComponent } from "vue";

import GetWaitingList from "@/components/GetWaitingList.vue";
import GetFullListToday from "@/components/GetFullListToday.vue";

export default defineComponent({
  name: "SecurityView",

  components: {
    GetWaitingList,
    GetFullListToday,
  },
  data() {
    return {};
  },
});
</script>

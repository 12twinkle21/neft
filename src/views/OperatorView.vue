<template>
  <get-waiting-list />
  <!-- <get-full-list-today /> -->
</template>

<script>
import { defineComponent } from "vue";

import GetWaitingList from "@/components/GetWaitingList.vue";
// import GetFullListToday from "@/components/GetFullListToday.vue";

export default defineComponent({
  name: "OperatorView",

  components: {
    GetWaitingList,
    // GetFullListToday,
  },
  data() {
    return {};
  },
});
</script>

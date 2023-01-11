<template>
  <get-waiting-list />
</template>

<script>
import { defineComponent } from "vue";

import GetWaitingList from "@/components/GetWaitingList.vue";

export default defineComponent({
  name: "SecurityView",

  components: {
    GetWaitingList,
  },
  data() {
    return {};
  },
});
</script>

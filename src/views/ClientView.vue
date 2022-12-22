<template>
  <v-container>
    <get-drivers />
    <get-full-list-client />
    <change-order />
    <write-order />
  </v-container>
</template>

<script>
import { defineComponent } from "vue";
import GetDrivers from "../components/GetDrivers.vue";
import GetFullListClient from "../components/GetFullListClient.vue";
import WriteOrder from "../components/WriteOrder.vue";
import ChangeOrder from "../components/ChangeOrder.vue";

export default defineComponent({
  name: "ClientView",

  components: {
    GetDrivers,
    WriteOrder,
    ChangeOrder,
    GetFullListClient,
  },
  data() {
    return {};
  },
});
</script>

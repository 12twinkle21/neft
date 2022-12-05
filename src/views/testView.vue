<template>
  <v-container className="page-container" fluid>
    <v-card className="page-card">
      <v-card-title>Тестовая страница</v-card-title>
      <test-info-list />
    </v-card>
  </v-container>
</template>

<script>
import TestInfoList from "@/components/testInfoList";

export default {
  components: {
    TestInfoList,
  },
};
</script>

<style scoped></style>

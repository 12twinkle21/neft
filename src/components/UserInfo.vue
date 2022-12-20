<template>
  <div class="d-flex align-center">
    <v-list-item>
      <v-list-item-title>{{ user.name }}</v-list-item-title>
    </v-list-item>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>

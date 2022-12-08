<template>
  <v-container Persistent class="w-100 h-100">
    <v-row class="w-100 h-100 align-center mp-0">
      <v-col class="justify-center">
        <v-card-title class="text-center mb-5">Смена пароля</v-card-title>
        <v-form>
          <v-text-field label="Введите старый пароль" />
          <v-text-field label="Введите новый пароль" />
          <v-text-field label="Введите новый пароль еще раз" />
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="$emit('closeModal', false)"
            >
              Закрыть
            </v-btn>
            <v-btn color="green darken-1" text> Сохранить </v-btn>
          </v-card-actions>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ChangePassword",
};
</script>

<style></style>

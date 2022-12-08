<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn>Поставить на ожидание</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <p class="carsInfo__inputTitle mr-5 mt-5">
          Ориентировочное время ожидания
        </p>
        <v-text-field class="w-100" type="time" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="5">
        <p class="carsInfo__inputTitle mr-5 mt-5">Причина ожидания</p>
        <v-textarea></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn>Отправить данные</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script></script>

<style></style>

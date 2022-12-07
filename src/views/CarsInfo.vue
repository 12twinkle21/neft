<template>
  <v-container>
    <v-row class="flex-column">
      <v-card-title class="text-center mb-5">Данные автомобиля</v-card-title>
      <v-form>
        <p class="carsInfo__inputTitle">GUID контрагента (клиента)</p>
        <v-text-field label="Введите данные" />
        <p class="carsInfo__inputTitle">GUID заказа клиента</p>
        <v-text-field label="Введите данные" />
        <p class="carsInfo__inputTitle">Дата отгрузки</p>
        <v-text-field type="date" />
        <p class="carsInfo__inputTitle">Время отгрузки</p>
        <v-text-field type="time" />
        <p class="carsInfo__inputTitle">GUID Водителя</p>
        <v-text-field label="Введите данные" />
        <p class="carsInfo__inputTitle">Плановая масса, число</p>
        <v-text-field label="Введите данные" type="number" />
        <p class="carsInfo__inputTitle">Госномер авто</p>
        <v-text-field label="Введите данные" />
        <p class="carsInfo__inputTitle">Марка авто</p>
        <v-text-field label="Введите данные" />
        <p class="carsInfo__inputTitle">Госномерприцепа</p>
        <v-text-field label="Введите данные" />
        <p class="carsInfo__inputTitle">Марка прицепа</p>
        <v-text-field label="Введите данные" />
        <v-btn>Отправить данные</v-btn>
      </v-form>
    </v-row>
  </v-container>
</template>

<script></script>

<style></style>

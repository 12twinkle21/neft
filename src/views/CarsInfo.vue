<template>
  <v-container>
    <v-row class="flex-column">
      <v-card-title class="mb-5">Данные автомобиля</v-card-title>
      <v-form>
        <v-row>
          <v-col>
            <v-row>
              <v-col class="d-flex">
                <p class="carsInfo__inputTitle mr-5">Дата отгрузки</p>
                <Datepicker
                  id="datepicker"
                  class="w-100"
                  v-model="selected"
                  format="dd.MM.yyyy"
                  locale="ru"
                  autoApply
                  textInput
                />
              </v-col>
              <v-col class="d-flex w-100">
                <p class="carsInfo__inputTitle mr-5">Время отгрузки</p>
                <v-text-field class="w-100" type="time" />
              </v-col>
            </v-row>

            <v-text-field label="GUID контрагента (клиента)" />
            <v-text-field label="GUID заказа клиента" />
            <v-text-field label="GUID Водителя" />
          </v-col>
          <v-col>
            <v-text-field label="Плановая масса, число" type="number" />
            <v-text-field label="Госномер авто" />
            <v-text-field label="Марка авто" />
            <v-text-field label="Госномерприцепа" />
            <v-text-field label="Марка прицепа" />
          </v-col>
        </v-row>
        <v-btn>Отправить данные</v-btn>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "carsInfo",
  data() {
    return {
      selected: new Date(),
    };
  },
};
</script>

<style></style>

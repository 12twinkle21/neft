<template>
  <v-container Persistent class="w-100 h-100">
    <v-row class="w-100 h-100 align-center mp-0">
      <v-col class="justify-center">
        <v-card-title class="text-center mb-5">Смена пароля</v-card-title>
        <v-form>
          <v-text-field
            v-model="oldPass"
            :rules="[required]"
            label="Введите старый пароль"
          />
          <v-text-field v-model="newPass1" label="Введите новый пароль" />
          <v-text-field
            v-model="newPass2"
            label="Введите новый пароль еще раз"
          />
          <v-alert
            color="#FEC64E"
            v-if="(infoChange !== '' && !infoChange?.ChangeOn) || errorPass"
            class="mb-4"
            >{{ infoChange["Error"] }}{{ mess }}</v-alert
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="$emit('closeModal', false)"
            >
              Закрыть
            </v-btn>
            <v-btn @click="changePass" color="green darken-1" text>
              Сохранить
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import config from "@/config";

export default {
  name: "ChangePassword",
  data() {
    return {
      oldPass: "",
      newPass1: "",
      newPass2: "",
      errorPass: false,
      infoChange: "",
      mess: "",
      GUID: localStorage.getItem("GUID"),
    };
  },
  methods: {
    changePass() {
      if (this.checkInputs()) {
        const bodyFormData = new FormData();
        bodyFormData.append("Request", "PassChange");
        bodyFormData.append("GUID", this.GUID);
        bodyFormData.append("NewPass", this.newPass2);
        return axios
          .post(config.backendUrl, bodyFormData)
          .then((response) => (this.infoChange = response.data.data[0]));
      }
    },
    checkInputs() {
      if (!!this.oldPass && !!this.newPass1 && !!this.newPass2) {
        if (this.newPass1 !== this.newPass2 && this.newPass1 !== "") {
          this.mess = "Пароли не совпадают";
          this.infoChange = "";
          this.errorPass = true;
          return false;
        } else {
          this.mess = "";
          this.errorPass = false;
          return true;
        }
      } else {
        this.mess = "Поля должны быть заполнены";
        this.infoChange = "";
        this.errorPass = true;
        return false;
      }
    },
  },
};
</script>

<style></style>

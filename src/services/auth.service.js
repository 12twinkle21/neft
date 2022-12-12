import axios from "axios";
import config from "@/config";

export default {
  auth(login, password) {
    const bodyFormData = new FormData();
    bodyFormData.append("Request", "Auth");
    bodyFormData.append("Login", login);
    bodyFormData.append("Pass", password);
    return axios.post(config.backendUrl, bodyFormData).then((response) => {
      return response;
    });
  },
};

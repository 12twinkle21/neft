// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";

const neftLightTheme = {
  dark: false,
  colors: {
    background:
      "linear-gradient(90deg, rgba(86,95,116,1) 0%, rgba(150,158,173,1) 66%, rgba(214,220,229,1) 100%);",
    surface: "#FFFFFF",
    primary: "#0D488C",
    secondary: "#03DAC6",
    error: "#B00020",
    info: "#D6DCE5",
    success: "#4CAF50",
    warning: "#FEC64E",
    label: "#D6DCE5",
  },
};

export default createVuetify({
  defaults: {
    VTextField: {
      variant: "outlined",
      density: "compact",
      color: "#000033",
    },
    VTextarea: {
      variant: "outlined",
      density: "compact",
      color: "#000033",
    },
    VCheckbox: {
      variant: "outlined",
      color: "#000033",
    },
    VSwitch: {
      variant: "outlined",
      color: "#000033",
      inset: true,
    },
    VSelect: {
      variant: "outlined",
      color: "#000033",
      inset: true,
      density: "compact",
    },
    VCombobox: {
      variant: "outlined",
      color: "#000033",
      inset: true,
      density: "compact",
    },
    VAutocomplete: {
      variant: "outlined",
      color: "#000033",
      inset: true,
      density: "compact",
    },
  },
  theme: {
    defaultTheme: "neftLightTheme",
    themes: {
      neftLightTheme,
    },
  },
});

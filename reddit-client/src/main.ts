import "./assets/main.css";
import App from "./App.vue";
import { createApp } from "vue";

import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import Lara from "@primevue/themes/lara";
import Nora from "@primevue/themes/nora";
import Material from "@primevue/themes/material";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Card from "primevue/card";
import ConfirmPopup from "primevue/confirmpopup";
import Image from "primevue/image";
import Galleria from "primevue/galleria";
import Carousel from "primevue/carousel";
import Menu from "primevue/menu";
import Menubar from "primevue/menubar";
import ToggleSwitch from "primevue/toggleswitch";
import Select from "primevue/select";

const app = createApp(App);
app
  .use(PrimeVue, {
    theme: {
      preset: Material,
      options: {
        darkModeSelector: ".dark-mode",
      },
    },
  })
  .component("Button", Button)
  .component("InputText", InputText)
  .component("Card", Card)
  .component("ConfirmPopup", ConfirmPopup)
  .component("Image", Image)
  .component("Carousel", Carousel)
  .component("ImageGallery", Galleria)
  .component("Dialog", Dialog)
  .component("Menubar", Menubar)
  .component("Menu", Menu)
  .component("Select", Select)
  .component("ToggleSwitch", ToggleSwitch);

app.mount("#app");

import "./assets/main.css";
import App from "./App.vue";
import { createApp } from "vue";

import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Card from "primevue/card";
import ConfirmPopup from "primevue/confirmpopup";
import Image from "primevue/image";
import Galleria from "primevue/galleria";

const app = createApp(App);
app
  .use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
  .component("Button", Button)
  .component("InputText", InputText)
  .component("Card", Card)
  .component("ConfirmPopup", ConfirmPopup)
  .component("Image", Image)
  .component("ImageGallery", Galleria)
  .component("Dialog", Dialog);

app.mount("#app");

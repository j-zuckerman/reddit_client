import "./assets/main.css";
import App from "./App.vue";
import { createApp } from "vue";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import * as FaIcons from "oh-vue-icons/icons/fa";

const Fa = Object.values({ ...FaIcons });
addIcons(...Fa);
const app = createApp(App);
app.component("v-icon", OhVueIcon);
app.mount("#app");

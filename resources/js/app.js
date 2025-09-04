import "./bootstrap";
import "../css/theme.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import iMaskPlugin from "./plugins/imask";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(iMaskPlugin);
app.mount("#app");
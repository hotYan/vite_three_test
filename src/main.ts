import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./routers/index";

const app = createApp(App);
console.log(111, router);
app.use(router);
app.mount("#app");

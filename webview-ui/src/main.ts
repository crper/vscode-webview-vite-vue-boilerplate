import { createApp } from "vue";
import App from "./App.vue";
import router from '@/router'
import store from '@/store'
import '@unocss/reset/normalize.css'
import "virtual:uno.css";
import "./style.scss";


const app = createApp(App)

app.use(router)
app.use(store);
app.mount("#app");

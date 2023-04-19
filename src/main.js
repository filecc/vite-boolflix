import { createApp } from "vue";
import "./assets/style/master.scss";
import App from "./App.vue";
import router from "../router";
import { createPinia } from 'pinia'

const pinia = createPinia();
createApp(App).use(router).use(pinia).mount('#app');


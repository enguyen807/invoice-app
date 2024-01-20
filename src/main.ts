import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import router from "./router";
import i18n from "@/core/i18n";

// setup fake backend
import { fakeBackend } from "@/core/helpers";
fakeBackend();

import "primevue/resources/themes/arya-green/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(PrimeVue);
app.use(router);
app.use(i18n);

app.mount("#app");

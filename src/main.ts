import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Plugin from "./plugins";
import Directives from "./directives";
require("../mock");

createApp(App).use(router).use(Plugin).use(Directives).mount("#app");

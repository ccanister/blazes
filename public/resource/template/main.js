const source = `
import { createApp } from 'vue';
import Blazes from "@blazes/abc/lib/index.jsdelivr.js";
import App from "./App.vue";

createApp(App).use(Blazes).mount("#app");
`;
export default source;

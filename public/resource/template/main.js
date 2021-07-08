const source = `
import { createApp } from 'vue';
import Blazes from "@blazes/abc/lib/index.jsdelivr.js";
import App from "./App.vue";
import "@blazes/abc/lib/style.css";
import "@blazes/theme/dist/style.css";

createApp(App).use(Blazes).mount("#app");
`;
export default source;

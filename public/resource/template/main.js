const source = `
import { createApp } from 'vue';
import Blazes from "@blazes/abc/lib/index.jsdelivr.js";
import Antd from 'ant-design-vue';
import App from "./App.vue";
import "@blazes/abc/lib/style.css";
import "@blazes/theme/dist/style.css";
import "ant-design-vue/dist/antd.css";

createApp(App).use(Blazes).use(Antd).mount("#app");
`;
export default source;

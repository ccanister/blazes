const source = `
const { createApp } = require('vue');
const Blazes = require("@blazes/abc");
import App from "./App.vue";

createApp(App).use(Blazes).mount("#app");
`;
export default source;

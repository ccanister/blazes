import { st, sf, TableWrapper } from "@blazes/abc";
import { App } from "vue";

import "@blazes/abc/dist/style.css";

const components = [st, sf, TableWrapper];

export default (app: App) => {
  components.forEach((component) => {
    app.use(component);
  });
};

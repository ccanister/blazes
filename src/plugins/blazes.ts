import { st, sf, TableWrapper, sv } from "@blazes/abc";
import { App } from "vue";

import "@blazes/abc/dist/style.css";

const components = [st, sf, TableWrapper, sv];

export default (app: App) => {
  components.forEach((component) => {
    app.use(component);
  });
};

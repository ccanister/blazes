import sf from "../../packages/abc/src/sf";
import TableWrapper from "../../packages/abc/src/table-wrapper";
import st from "../../packages/abc/src/st";
import sv from "../../packages/abc/src/sv";
import { App } from "vue";

import "@blazes/abc/dist/style.css";

const components = [st, sf, TableWrapper, sv];

export default (app: App) => {
  components.forEach((component) => {
    app.use(component);
  });
};

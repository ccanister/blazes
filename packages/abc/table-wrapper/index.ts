import { App } from "vue";
import TableWrapper from "./src/index.vue";

type SFCWithInstall<T> = T & { install(app: App): void };

TableWrapper.install = (app: App): void => {
  app.component(TableWrapper.name, TableWrapper);
};

const _TableWrapper: SFCWithInstall<typeof TableWrapper> = TableWrapper as any;
export default _TableWrapper;

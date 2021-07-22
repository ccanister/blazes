import { App } from "vue";
import sf from "./src/index.vue";
import { typeModels } from "./src/model/context";
import { formRefSymbol, formSymbol } from "./src/type";
import { getData, transMapToEnum } from "./src/util";

type SFCWithInstall<T> = T & { install(app: App): void };

sf.install = (app: App): void => {
  app.component(sf.name, sf);
};

const _sf: SFCWithInstall<typeof sf> = sf as any;
export default _sf;
export { typeModels, getData, transMapToEnum, formRefSymbol, formSymbol };

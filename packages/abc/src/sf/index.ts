import { App } from "vue";
import sf from "./src/index.vue";
import { formRefSymbol, formSymbol } from "./src/type";
import { getData, transMapToEnum } from "./src/util";
import {
  AnyProperty,
  AtomicProperty,
  ArrayProperty,
  BooleanProperty,
  FormProperty,
  NumberProperty,
  ObjectProperty,
  StringProperty,
} from "./src/model";

type SFCWithInstall<T> = T & { install(app: App): void };

sf.install = (app: App): void => {
  app.component(sf.name, sf);
};

const _sf: SFCWithInstall<typeof sf> = sf as any;
export default _sf;
export {
  getData,
  transMapToEnum,
  formRefSymbol,
  formSymbol,
  AnyProperty,
  AtomicProperty,
  ArrayProperty,
  BooleanProperty,
  FormProperty,
  NumberProperty,
  ObjectProperty,
  StringProperty,
};

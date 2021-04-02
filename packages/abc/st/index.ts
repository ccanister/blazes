import { App } from "vue";
import st from "./src/index.vue";

type SFCWithInstall<T> = T & { install(app: App): void };

st.install = (app: App): void => {
  app.component(st.name, st);
};

const _st: SFCWithInstall<typeof st> = st as any;
export default _st;

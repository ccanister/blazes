import { App } from "vue";
import st from "./src/index.vue";
declare type SFCWithInstall<T> = T & {
    install(app: App): void;
};
declare const _st: SFCWithInstall<typeof st>;
export default _st;

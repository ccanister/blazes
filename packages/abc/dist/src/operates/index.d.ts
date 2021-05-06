import { App } from "vue";
import Operates from "./src/index.vue";
declare type SFCWithInstall<T> = T & {
    install(app: App): void;
};
declare const _Operates: SFCWithInstall<typeof Operates>;
export default _Operates;

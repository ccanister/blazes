import { App } from "vue";
import Ellipsis from "./src/index.vue";
declare type SFCWithInstall<T> = T & {
    install(app: App): void;
};
declare const _Ellipsis: SFCWithInstall<typeof Ellipsis>;
export default _Ellipsis;

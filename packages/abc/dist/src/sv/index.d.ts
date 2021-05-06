import { App } from "vue";
import Sv from "./src/index.vue";
declare type SFCWithInstall<T> = T & {
    install(app: App): void;
};
declare const _Sv: SFCWithInstall<typeof Sv>;
export default _Sv;

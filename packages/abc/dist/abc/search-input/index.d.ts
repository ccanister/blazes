import { App } from "vue";
import SearchInput from "./src/index.vue";
declare type SFCWithInstall<T> = T & {
    install(app: App): void;
};
declare const _SearchInput: SFCWithInstall<typeof SearchInput>;
export default _SearchInput;

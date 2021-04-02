import { App } from "vue";
import SearchInput from "./src/index.vue";

type SFCWithInstall<T> = T & { install(app: App): void };

SearchInput.install = (app: App): void => {
  app.component(SearchInput.name, SearchInput);
};

const _SearchInput: SFCWithInstall<typeof SearchInput> = SearchInput as any;
export default _SearchInput;

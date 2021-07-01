import st from "./src/st";
import PageHeader from "./src/page-header";
import Operates from "./src/operates";
import SearchInput from "./src/search-input";
import sv from "./src/sv";
import sf, {
  getData,
  transMapToEnum,
  formSymbol,
  formRefSymbol,
} from "./src/sf";
import TableWrapper from "./src/table-wrapper";
import Tags from "./src/tags";
import { App } from "vue";

const components = [st, PageHeader, Operates, sv, TableWrapper, sf, Tags];

const install = (app: App, options: Record<string, unknown>): void => {
  components.forEach((component) => {
    app.component(component.name, component);
  });
};

export {
  st,
  PageHeader,
  Operates,
  SearchInput,
  sv,
  sf,
  TableWrapper,
  Tags,
  getData,
  transMapToEnum,
  formSymbol,
  formRefSymbol,
};

export default { install };

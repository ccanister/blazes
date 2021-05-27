import Antd from "./antd";
import Icon from "./icon";
import Blazes from "./blazes";
import Global from "./global";
import { App } from "vue";

const plugins = [Antd, Icon,Blazes, Global];

export default {
  install(app: App) {
    plugins.forEach((plugin) => {
      app.use(plugin);
    });
  },
};

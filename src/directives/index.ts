import Hightlight from "./highlight";
import { App } from "vue";

const directives = [Hightlight];

export default {
  install(app: App) {
    directives.forEach((directive) => {
      app.use(directive);
    });
  },
};

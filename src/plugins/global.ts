import { App } from "vue";
import CodeBox from "@/components/code-box.vue";

const components = [CodeBox];

export default (app: App) => {
  components.forEach((component) => {
    app.component(component.name, component);
  });
};

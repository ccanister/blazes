import { App } from "vue";
import CodeBox from "@/components/code-box.vue";
import Doc from "@/components/doc.vue";

const components = [CodeBox, Doc];

export default (app: App) => {
  components.forEach((component) => {
    app.component(component.name, component);
  });
};

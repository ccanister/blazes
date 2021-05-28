import { App } from "vue";
import CodeBox from "@/components/code-box.vue";
import Doc from "@/components/doc.vue";
import MainMenu from "@/components/main-menu.vue";

const components = [CodeBox, Doc, MainMenu];

export default (app: App) => {
  components.forEach((component) => {
    app.component(component.name, component);
  });
};

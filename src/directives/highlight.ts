import { App } from "@vue/runtime-core";
import hljs from "highlight.js";
import "highlight.js/styles/vs.css";

export default (app: App) => {
  app.directive("highlight", {
    mounted(el: Element, binding) {
        console.log(binding);
      const targets = el.querySelectorAll("code");
      console.log(targets)

      targets.forEach((target) => {
        if (typeof binding.value === "string") {
          target.innerHTML = binding.value;
        }
        hljs.highlightBlock(target);
      });
    },
  });
};

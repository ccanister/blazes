import { aclService } from "./acl.service";
import { IACLCanType } from "./type";
import { watch } from "vue";

function updateEl(el: HTMLElement, binding: { value: IACLCanType }) {
  el.style.setProperty(
    "display",
    aclService.can(binding.value) ? null : "none",
    "important"
  );
}

export class AclDirecitve {
  beforeMount(el: HTMLElement, binding: { value: IACLCanType }) {
    updateEl(el, binding);
    watch(aclService.aclChange, () => {
      updateEl(el, binding);
    });
  }

  updated(el: HTMLElement, binding: { value: IACLCanType }) {
    updateEl(el, binding);
  }
}

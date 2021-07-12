import aclService from "./acl.service";
import { IACLCanType } from "./type";

export class AclDirecitve {
  beforeMount(el: HTMLElement, binding: { value: IACLCanType }) {
    this.updateEl(el, binding);
  }

  updated(el: HTMLElement, binding: { value: IACLCanType }) {
    this.updateEl(el, binding);
  }

  private updateEl(el: HTMLElement, binding: { value: IACLCanType }) {
    el.style.display = ((aclService.can(binding.value)
      ? null
      : "none") as unknown) as string;
  }
}

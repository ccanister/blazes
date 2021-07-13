import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { aclService } from "./acl.service";
import { IACLCanType } from "./type";

export function aclGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const guard = to.meta.guard as IACLCanType | null;
  if (aclService.can(guard)) {
    next();
    return;
  }
  next(aclService.guard_url);
}

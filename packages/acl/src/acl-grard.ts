import { Router } from "vue-router";
import { aclService } from "./acl.service";
import { IACLCanType } from "./type";

export function aclGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    const guard = from.meta.guard as string[] | IACLCanType;
    if (aclService.can(Array.isArray(guard) ? { roles: guard } : guard)) {
      next();
      return;
    }
    next(aclService.guard_url);
  });
}

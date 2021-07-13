import { Router } from "vue-router";
import { aclService } from "./acl.service";
import { IACLCanType } from "./type";

export function aclGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    const guard = to.meta.guard as string[] | IACLCanType;
    if (!guard) {
      next();
      return;
    }
    if (aclService.can(Array.isArray(guard) ? { roles: guard } : guard)) {
      next();
      return;
    }
    next(aclService.guard_url);
  });
}

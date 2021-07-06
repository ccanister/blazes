import { onMounted, ref, Ref, watch } from "vue";
import { useRoute } from "vue-router";
import { MenuService } from "./menu.service";

export function useCollapse(
  menuService: MenuService
): { active: Ref<string[]>; opened: Ref<string[]> } {
  const route = useRoute();
  const collapse$ = menuService.collapse;
  const active: Ref<string[]> = ref([]);
  const opened: Ref<string[]> = ref([]);
  let preOpenKey: string[] = [];

  watch(
    () => route.path,
    (path) => {
      const menu = menuService.getHit(path, true);
      if (menu) {
        active.value = [menu.key || ""];
      }
    }
  );

  watch(collapse$, (isCollapse) => {
    if (isCollapse) {
      preOpenKey = opened.value;
      opened.value = [];
    } else {
      opened.value = preOpenKey;
    }
  });

  onMounted(() => {
    const menu = menuService.getHit(route.path, true);
    active.value = [menu?.key || ""];
    const openKey = menu ? [menu._parent?.key || ""] : [""];
    if (collapse$.value) {
      preOpenKey = openKey;
    } else {
      opened.value = openKey;
    }
  });

  return { active, opened };
}

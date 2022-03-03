import { reactive, ref, SetupContext, watch } from "vue";

// 没有监听props的变化
export function useModel<T>(
  props: { modelValue?: T | undefined; [key: string]: any },
  ctx: SetupContext<any>,
  key = "modelValue"
) {
  const modelValue$ = ref(props[key]) as any;
  watch(modelValue$, (value: T) => {
    ctx.emit(`update:${key}`, value);
  });
  watch(
    () => props[key],
    (value) => {
      modelValue$.value = value;
    }
  );

  return modelValue$;
}

export function useRefs<T>(): [T[], (index: number) => (value: T) => void] {
  const refs: T[] = [];
  const setRef = (index: number) => (value: T) => {
    refs[index] = value;
  };

  return [refs, setRef];
}

export function useChecked<T extends { checked?: boolean }>(
  items: T[],
  same = true
) {
  let innerItems = items;
  const checked = reactive({
    all: true,
    indeterminate: false,
  });

  const updateChecked = () => {
    checked.all = innerItems.every(isChecked);
    checked.indeterminate = checked.all ? false : innerItems.some(isChecked);
  };

  const checkAll = () => {
    innerItems.forEach(
      (item: T) => (item.checked = same ? checked.all : !checked.all)
    );
    updateChecked();
  };

  const isChecked = (item: T) =>
    (same && item.checked) || (!same && !item.checked);

  const checkApart = (item: T) => {
    item.checked = !item.checked;
    updateChecked();
  };

  const resetItems = (newItems: T[]) => {
    innerItems = newItems;
    updateChecked();
  };

  updateChecked();

  return { checkAll, checkApart, checked, resetItems, updateChecked };
}

export function useCollapse(initalValue = false) {
  const collapse = ref(initalValue);

  const toggle = () => {
    collapse.value = !collapse.value;
  };

  return { collapse, toggle };
}

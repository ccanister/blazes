import { ref, SetupContext, watch } from "vue";

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

  return modelValue$;
}

export function useRefs<T>(): [T[], Function] {
  const refs: T[] = [];
  const setRef = (index: number) => (value: T) => {
    refs[index] = value;
  };

  return [refs, setRef];
}

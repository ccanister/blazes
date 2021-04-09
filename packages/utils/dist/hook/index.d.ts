import { SetupContext } from "vue";
export declare function useModel<T>(props: {
    modelValue?: T | undefined;
    [key: string]: any;
}, ctx: SetupContext, key?: string): any;
export declare function useRefs<T>(): [T[], Function];

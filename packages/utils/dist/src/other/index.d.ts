export declare function deepGet(obj: any | null, path: string | string[] | null | undefined, defaultValue?: any): any;
export declare function deepCopy(obj: any): any;
export declare function deepMergeKey(original: any, ingoreArray: boolean, ...objects: any[]): any;
export declare function deepMerge(original: any, ...objects: any[]): any;
export declare function toNum(height: string): number;
export declare function objIsEmpty(obj: any): boolean;
/**
 * 复制字符串文档至剪贴板
 */
export declare function copy(value: string): Promise<string>;

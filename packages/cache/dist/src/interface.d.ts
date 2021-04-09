export interface ICache {
    v: any;
    e: number;
}
export interface ICacheStore {
    set(key: string, value: ICache): boolean;
    get(key: string): ICache | null;
    remove(key: string): void;
}
export interface CacheConfig {
    type: "m" | "s";
    prefix: string;
    expire: number;
    meta_key: string;
}

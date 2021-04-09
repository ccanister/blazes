import { CacheConfig } from "./interface";
export declare class CacheService {
    private memoryCache;
    private cacheStore;
    private metas;
    private defaultConfig;
    constructor(config?: CacheConfig);
    set(key: string, data: any, options: {
        type?: "m" | "s";
        expire?: number;
    }): void;
    private save;
    private addMeta;
    get(key: string): any;
    private getCacheStoreKey;
    remove(key: string): void;
    private removeMeta;
    private saveMeta;
    has(key: string): boolean;
}

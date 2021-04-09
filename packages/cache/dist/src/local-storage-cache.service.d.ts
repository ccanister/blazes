import { ICache, ICacheStore } from "./interface";
export default class LocalStorageCacheService implements ICacheStore {
    set(key: string, value: ICache): boolean;
    get(key: string): ICache;
    remove(key: string): void;
}

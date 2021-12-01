import { ICache, ICacheStore } from "./interface";

export default class LocalStorageCacheService implements ICacheStore {
  set(key: string, value: ICache): boolean {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  }
  get(key: string): ICache {
    return JSON.parse(localStorage.getItem(key) || "null");
  }
  remove(key: string): void {
    localStorage.removeItem(key);
  }
}

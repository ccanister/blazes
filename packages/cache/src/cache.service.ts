import { CacheConfig, ICache, ICacheStore } from "./interface";
import LocalStorageCacheService from "./local-storage-cache.service";
import moment from "moment";

const CACHE_CONFIG: CacheConfig = {
  type: "m",
  prefix: "",
  expire: 0,
  meta_key: "__cache_meta",
};

export class CacheService {
  private memoryCache = new Map<string, ICache>();
  private cacheStore: ICacheStore = new LocalStorageCacheService();
  private metas: Set<string> = new Set();
  private defaultConfig: CacheConfig;

  constructor(config?: CacheConfig) {
    this.defaultConfig = {
      ...CACHE_CONFIG,
      ...config,
    };
  }

  set(key: string, data: any, options: { type?: "m" | "s"; expire?: number }) {
    let e = 0;
    const { type, expire } = this.defaultConfig;
    options = {
      type: type as "m",
      expire,
      ...options,
    };
    if (options.expire) {
      e = moment(new Date()).add(options.expire, "seconds").valueOf();
    }
    this.save(options.type as "m" | "s", key, { v: data, e });
  }

  private save(type: "m" | "s", key: string, value: ICache) {
    if (type === "m") {
      this.memoryCache.set(key, value);
    } else {
      const { cacheStore } = this;
      cacheStore.set(this.getCacheStoreKey(key), value);
      this.addMeta(key);
    }
  }

  private addMeta(key: string) {
    if (this.metas.has(key)) {
      return;
    }
    const { metas } = this;
    metas.add(key);
    this.saveMeta();
  }

  get(key: string) {
    const { memoryCache, cacheStore } = this;
    const value = memoryCache.has(key)
      ? memoryCache.get(key)
      : cacheStore.get(this.getCacheStoreKey(key));
    if (value && value.e === 0 && value.e > +new Date()) {
      return value.v;
    }
    return null;
  }

  private getCacheStoreKey(key: string) {
    return this.defaultConfig.prefix + key;
  }

  remove(key: string) {
    if (this.memoryCache.has(key)) {
      this.memoryCache.delete(key);
      return;
    }
    this.cacheStore.remove(this.getCacheStoreKey(key));
    this.removeMeta(key);
  }

  private removeMeta(key: string) {
    if (!this.metas.has(key)) {
      return;
    }
    const { metas } = this;
    metas.delete(key);
    this.saveMeta();
  }

  private saveMeta() {
    const { metas, cacheStore, defaultConfig } = this;
    cacheStore.set(defaultConfig.meta_key, {
      e: 0,
      v: Array.from(metas.values()),
    });
  }

  has(key: string) {
    return (
      this.memoryCache.has(key) || this.metas.has(this.getCacheStoreKey(key))
    );
  }
}

export const cacheService = new CacheService();

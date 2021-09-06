import { deepMergeKey } from "../other";
import { Config, ConfigKey } from "./type";

export class ConfigService {
  private config: Config = {};

  get<T extends ConfigKey>(componentName: T, key?: string): Config[T] {
    const res = this.config[componentName] as Record<string, any>;
    return key ? { [key]: res[key] } : res;
  }

  merge<T extends ConfigKey>(
    componentName: T,
    ...defaultValues: Config[T][]
  ): Config[T] {
    return deepMergeKey({}, true, ...defaultValues, this.get(componentName));
  }

  set<T extends ConfigKey>(componentName: T, value: Config[T]): void {
    this.config[componentName] = { ...this.config[componentName], ...value };
  }
}

export const configService = new ConfigService();

import { ref, Ref } from "vue";
import {
  ACL_DEFAULT_CONFIG,
  IACLCanType,
  IACLChange,
  IACLConfig,
  IACLType,
} from "./type";

export class AclService {
  private options: IACLConfig;
  private roles: string[] = [];
  private full = false;
  aclChange: Ref<IACLChange | boolean | null> = ref(null);

  /** 获取所有数据 */
  get data(): IACLChange {
    return {
      full: this.full,
      roles: this.roles,
    };
  }

  get guard_url(): string {
    return this.options.guard_url!;
  }

  constructor(config?: IACLConfig) {
    this.options = Object.assign({}, ACL_DEFAULT_CONFIG, config);
  }

  private parseACLType(val: string | string[] | IACLType | null): IACLType {
    let t: IACLType;
    if (typeof val === "object" && !Array.isArray(val)) {
      t = { ...val };
    } else if (Array.isArray(val)) {
      t = { roles: val as string[] };
    } else {
      t = { roles: val == null ? [] : [val] };
    }

    return { except: false, ...t };
  }

  /**
   * 设置当前用户角色或权限能力（会先清除所有）
   */
  set(value: IACLType): void {
    this.full = false;
    this.roles = [];
    this.add(value);
    this.aclChange.value = this.data;
  }

  /**
   * 标识当前用户为全量，即不受限
   */
  setFull(val: boolean): void {
    this.full = val;
    this.aclChange.value = val;
  }

  /**
   * 设置当前用户角色（会先清除所有）
   */
  setRole(roles: string[]): void {
    this.set({ roles } as IACLType);
  }

  /**
   * 为当前用户增加角色或权限能力
   */
  add(value: IACLType): void {
    if (value.roles && value.roles.length > 0) {
      this.roles.push(...value.roles);
    }
  }

  /**
   * 为当前用户附加角色
   */
  attachRole(roles: string[]): void {
    for (const val of roles) {
      if (!this.roles.includes(val)) {
        this.roles.push(val);
      }
    }
    this.aclChange.value = this.data;
  }

  /**
   * 为当前用户移除角色
   */
  removeRole(roles: string[]): void {
    for (const val of roles) {
      const idx = this.roles.indexOf(val);
      if (idx !== -1) {
        this.roles.splice(idx, 1);
      }
    }
    this.aclChange.value = this.data;
  }

  /**
   * - 当 `full: true` 或参数 `null` 时返回 `true`
   * - 若使用 `IACLType` 参数，可以指定 `mode` 校验模式
   */
  can(roleOrAbility: IACLCanType | null): boolean {
    const t = this.parseACLType(roleOrAbility);
    let result = false;
    if (this.full === true || !roleOrAbility) {
      result = true;
    } else {
      if (t.roles && t.roles.length > 0) {
        if (t.mode === "allOf") {
          result = t.roles.every((v) => this.roles.includes(v));
        } else {
          result = t.roles.some((v) => this.roles.includes(v));
        }
      }
    }

    return t.except === true ? !result : result;
  }
}

export const aclService = new AclService();

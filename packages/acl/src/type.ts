export interface IACLType {
  roles?: string[];

  mode?: "allOf" | "oneOf";

  except?: boolean;
}

export interface IACLConfig {
  guard_url?: string;
}

export const ACL_DEFAULT_CONFIG: IACLConfig = {
  guard_url: "/exception/403",
};

export interface IACLChange {
  roles: string[];
  full: boolean;
}

export type IACLCanType = string | string[] | IACLType;

export interface SiteConfig {
  modules: ModuleConfig[];
}

export interface ModuleConfig {
  /** 模块名称 */
  name: string;
  /** 分类数据 */
  types: { [key: string]: string }[];
  /** 是否默认路由 */
  defaultRoute: string;
  dir: ModuleDirConfig;
  lib: boolean;
  title: string;
  componentName: string;
}

export interface ModuleDirConfig {
  /** 源码位置 */
  src: string;
  /** 是否包含子目录 */
  hasSubDir: boolean;
}

export interface Demo {
  name: string;
  title: string;
  subtitle: string;
  content: string;
  code: string;
  showCode: string;
  fileContent: string;
}

export interface DemoMeta {
  type: string;
  order: number;
  subTitle: string;
  title: string;
  subtitle: string;
}

export interface Doc {
  title: string;
  subtitle: string;
  content: string;
  api: string;
  type: string;
  order: number;
  lib: boolean;
  filename?: string;
  redirect?: string;
  anchors: string[];
}

export interface DocMeta {
  title: string;
  subtitle: string;
  type: string;
  order: number;
  lib: boolean;
  redirect?: string;
}

export interface File {
  name: string;
  dir: string;
  docPath: string;
  content?: string;
  code?: string;
  doc?: Doc;
}

export interface MenuSub {
  title: string;
  subtitle: string;
  path: string;
  order: number;
  redirect: string;
}

export interface MenuItem {
  type: string;
  subs: MenuSub[];
}

export interface Menu {
  name: string;
  items: MenuItem[];
  defaultRoute: boolean;
}

export interface Lib {
  label: string;
  routePrefix: string;
}

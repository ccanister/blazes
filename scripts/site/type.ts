export interface SiteConfig {
  modules: ModuleConfig[];
}

export interface ModuleConfig {
  /** 模块名称 */
  name: string;
  /** 分类数据 */
  types: { [key: string]: string }[];
  /** 默认路由 */
  defaultRoute: string;
  dir: ModuleDirConfig;
}

export interface ModuleDirConfig {
  /** 源码位置 */
  src: string[];
  /** 是否包含子目录 */
  hasSubDir: boolean;
}

export interface Demo {
  title: string;
  content: string;
  code: string;
}

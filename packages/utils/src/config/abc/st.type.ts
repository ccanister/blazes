export interface STConfig {
  req?: {
    reName?: {
      pi?: string;
      ps?: string;
    };
  };
  res?: {
    reName?: {
      total?: string;
      list?: string;
    };
  };
  page?: {
    front?: boolean;
    show?: boolean;
    showSize?: boolean;
    pageSizes?: string[];
    showQuickJumper?: boolean;
    indexReset?: boolean;
    toTop?: boolean;
    toTopOffset?: number;
  };
}

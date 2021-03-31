import { ResponsiveConfig } from "./type";

const REP_MAX = 6;

export class ResponsiveService {
  private config: ResponsiveConfig;
  constructor(config?: ResponsiveConfig) {
    this.config = {
      rules: {
        1: { xs: 24 },
        2: { xs: 24, sm: 12 },
        3: { xs: 24, sm: 12, md: 8 },
        4: { xs: 24, sm: 12, md: 8, lg: 6 },
        5: { xs: 24, sm: 12, md: 8, lg: 6, xl: 4 },
        6: { xs: 24, sm: 12, md: 8, lg: 6, xl: 4, xxl: 2 },
        ...config?.rules,
      },
      classPrefix: config?.classPrefix || "ant-col",
    };
    if (
      Object.keys(this.config.rules)
        .map((i) => +i)
        .some((i: number) => i < 1 || i > REP_MAX)
    ) {
      throw new Error(
        `[theme] the responseive rule index value range must be 1-${REP_MAX}`
      );
    }
  }

  genClass(count: number) {
    const { rules, classPrefix } = this.config;
    const rule = rules[
      (count > REP_MAX ? REP_MAX : Math.max(count, 1)) as 1 | 2 | 3 | 4 | 5 | 6
    ] as any;
    const clsMap = [`${classPrefix}-xs-${rule.xs}`];
    if (rule.sm) clsMap.push(`${classPrefix}-sm-${rule.sm}`);
    if (rule.md) clsMap.push(`${classPrefix}-md-${rule.md}`);
    if (rule.lg) clsMap.push(`${classPrefix}-lg-${rule.lg}`);
    if (rule.xl) clsMap.push(`${classPrefix}-xl-${rule.xl}`);
    if (rule.xxl) clsMap.push(`${classPrefix}-xxl-${rule.xxl}`);
    return clsMap;
  }
}

export const responseService = new ResponsiveService();

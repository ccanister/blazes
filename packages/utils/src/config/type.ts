import { STConfig } from "./abc/st.type";

export interface Config {
  st?: STConfig;
}

export type ConfigKey = keyof Config;

import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import cssnano from "cssnano";
import vue from "rollup-plugin-vue";
import { DEFAULT_EXTENSIONS } from "@babel/core";

const extensions = [...DEFAULT_EXTENSIONS, ".ts", ".vue", ".tsx"];

// 采用了babel插件报错，也不能使用@rollup/plugin-typescript
export default {
  input: "./index.ts",
  output: {
    file: "lib/index.jsdelvier.js",
    name: "blazeAbc",
    format: "umd",
    sourcemap: true,
    globals: {
      vue: "vue",
      axios: "axios",
      "async-validator": "async-validator",
      "vue-router": "vue-router",
    },
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({ extensions }),
    vue({
      target: "browser",
    }),
    terser(),
    postcss({
      use: [
        [
          "less",
          {
            javascriptEnabled: true,
          },
        ],
      ],
      extract: "style.css",
      plugins: [cssnano()],
    }),
  ],
  external: [
    "vue",
    "axios",
    "async-validator",
    "vue-router",
    /^@blazes\/utils/,
    /^@blazes\/theme/,
    /^ant-design-vue\/es/,
    /^@ant-design\/icons-vue/,
  ],
};

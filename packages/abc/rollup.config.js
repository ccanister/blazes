import clear from "rollup-plugin-clear";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import cssnano from "cssnano";
import vue from "rollup-plugin-vue";
import { DEFAULT_EXTENSIONS } from "@babel/core";
import copy from "rollup-plugin-copy";

const extensions = [...DEFAULT_EXTENSIONS, ".ts", ".vue", ".tsx"];

// 采用了babel插件报错，也不能使用@rollup/plugin-typescript
export default {
  input: "./index.ts",
  output: {
    file: "lib/index.js",
    name: "blazeAbc",
    format: "cjs",
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
    clear({
      targets: ["lib"],
    }),
    // terser(),
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
    copy({
      targets: [{ src: "src/sf/src/widgets/*", dest: "lib/sf/src/widgets" }],
    }),
  ],
  external: [
    "vue",
    "axios",
    "async-validator",
    "vue-router",
    /^@blazes\/utils/,
    /^@blazes\/theme/,
    /^ant-design-vue\/lib/,
    /^@ant-design\/icons-vue/,
  ],
};

import typescript from "rollup-plugin-typescript2";
import clear from "rollup-plugin-clear";
import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "rollup-plugin-babel";
import copy from "rollup-plugin-copy";
import postcss from "rollup-plugin-postcss";
import NpmImport from "less-plugin-npm-import";
import cssnano from "cssnano";

export default [
  {
    input: "./index.ts",
    output: {
      file: "dist/index.js",
      name: "blazeTheme",
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
      babel({
        exclude: "node_modules/**",
      }),
      resolve(),
      commonjs(),
      typescript(),
      clear({
        targets: ["dist"],
      }),
      copy({
        targets: [{ src: "system/*", dest: "dist" }],
      }),
      terser(),
    ],
    external: [
      "vue",
      "axios",
      "async-validator",
      "vue-router",
      /^@blazes\/utils/,
      /^ant-design-vue\/lib/,
      /^@ant-design\/icons-vue/,
    ],
  },
  {
    input: "./system/index.less",
    output: {
      file: "dist/deprecated.style.js",
    },
    plugins: [
      postcss({
        use: [
          [
            "less",
            {
              plugins: [new NpmImport({ prefix: "~" })],
              javascriptEnabled: true,
            },
          ],
        ],
        extract: "style.css",
        plugins: [cssnano()],
      }),
    ],
  },
];

import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default [
  {
    input: "./index.ts",
    output: {
      file: "dist/index.jsdeliver.js",
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
      resolve(),
      commonjs(),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false,
          },
        },
      }),
      terser(),
    ],
    external: [
      "vue",
      "axios",
      "async-validator",
      "vue-router",
      /^@blazes\/utils/,
      /^ant-design-vue\/es/,
      /^@ant-design\/icons-vue/,
    ],
  },
];

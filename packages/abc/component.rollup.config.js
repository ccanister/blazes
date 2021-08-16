import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import cssnano from "cssnano";
import vue from "rollup-plugin-vue";
import { DEFAULT_EXTENSIONS } from "@babel/core";
import path from "path";
import fs from "fs";
import { getBabelOutputPlugin } from "@rollup/plugin-babel";

const extensions = [...DEFAULT_EXTENSIONS, ".ts", ".vue", ".tsx"];

const files = fs.readdirSync(path.join(__dirname, "src"));

// 采用了babel插件报错，也不能使用@rollup/plugin-typescript
export default files.map((file) => ({
  input: `./src/${file}/index.ts`,
  output: {
    file: `lib/${file}/index.js`,
    name: file,
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
    typescript({
      extensions,
      tsconfigOverride: {
        compilerOptions: { declaration: false },
      },
    }),
    vue({
      target: "browser",
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
    getBabelOutputPlugin({
      configFile: path.resolve(__dirname, "babel.config.js"),
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
}));

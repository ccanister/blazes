import typescript from "@rollup/plugin-typescript";
import clear from "rollup-plugin-clear";
import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "./index.ts",
  output: {
    file: "dist/index.js",
    name: "blazeUtils",
    format: "umd",
    sourcemap: true,
    globals: {
      vue: "vue",
      extend: "extend",
    },
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
    clear({
      targets: ["dist"],
    }),
    terser(),
  ],
  external: ["vue", "extend"],
};

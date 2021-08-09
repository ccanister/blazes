import typescript from "@rollup/plugin-typescript";
import clear from "rollup-plugin-clear";
import { terser } from "rollup-plugin-terser";

export default {
  input: "./index.ts",
  output: {
    file: "dist/index.js",
    name: "blazeUtils",
    format: "umd",
    sourcemap: true,
  },
  plugins: [
    typescript({ tsconfig: "./tsconfig.json" }),
    clear({
      targets: ["dist"],
    }),
    terser(),
  ],
};

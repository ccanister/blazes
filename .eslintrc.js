module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/camelcase": 0,
    "vue/valid-v-slot": [
      "off",
      {
        allowModifiers: false,
      },
    ],
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/no-use-before-define": ["off"],
    "no-useless-escape": 0,
  },
};

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/jsx-sort-props": "warn",
    "react/jsx-filename-extension": [
      1,
      { allow: "as-needed", extensions: [".jsx", ".tsx"] }
    ],
    "require-jsdoc": 0,
    quotes: ["error", "double"]
  }
};

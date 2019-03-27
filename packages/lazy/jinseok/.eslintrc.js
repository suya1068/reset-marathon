module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ["standard", "plugin:prettier/recommended"],
  plugins: ["prettier", "standard"],
  parserOptions: {
    ecmaVersion: 2017
  },
  rules: {
    "newline-per-chained-call": ["error", { ignoreChainWithDepth: 1 }]
  }
};

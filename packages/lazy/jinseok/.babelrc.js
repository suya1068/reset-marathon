const is_test = process.env.NODE_ENV === "test";

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: is_test ? "commonjs" : false
      }
    ]
  ],
  plugins: [
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    [
      "module-resolver",
      {
        root: ["./src"]
      }
    ]
  ]
};

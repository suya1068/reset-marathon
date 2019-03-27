const rollup = require("rollup");
const resolve = require("rollup-plugin-node-resolve");
const common = require("rollup-plugin-commonjs");
const json = require("rollup-plugin-json");
const babel = require("rollup-plugin-babel");

module.exports = {
  input: "src/index.js",
  output: {
    file: "public/lazy.rollup.js",
    format: "iife",
    name: "RMLazy"
  },
  plugins: [
    common(),
    resolve(),
    json(),
    babel({
      exclude: "node_modules/**"
    })
  ],
  watch: {
    chokidar: {
      paths: "src/**",
      exclude: ["node_modules/**"]
    }
  }
};

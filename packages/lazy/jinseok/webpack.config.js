const path = require("path");

const root_path = path.resolve(__dirname);

module.exports = () => {
  return {
    entry: path.join(root_path, "src/index.js"),
    output: {
      filename: "lazy.webpack.js",
      path: path.resolve("public")
    }
  };
};

const fs = require("fs");
const path = require("path");
const rollup = require("rollup");

const { input, output, plugins, watch } = require("../rollup.config");

async function build() {
  const bundle = await rollup.rollup({ input, plugins });
  const {
    output: [{ code }]
  } = await bundle.generate(output);

  await write(output.file, code);
}

function write(dest, code) {
  return new Promise((resolve, reject) => {
    function report(extra) {
      console.log(blue(path.relative(process.cwd(), dest)) + " " + getSize(code) + (extra || ""));
      resolve();
    }

    fs.writeFile(dest, code, err => {
      if (err) return reject(err);
      report();
    });
  });
}

function blue(str) {
  return "\x1b[1m\x1b[34m" + str + "\x1b[39m\x1b[22m";
}

function getSize(code) {
  return `${(code.length / 1024).toFixed(2)}kb`;
}

build();

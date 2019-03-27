const rollup = require("rollup");

const { input, output, plugins, watch } = require("../rollup.config");

function dev() {
  const watcher = rollup.watch({ input, output, plugins, watch });

  watcher.on("event", event => {
    // event.code can be one of:
    //   START        — the watcher is (re)starting
    //   BUNDLE_START — building an individual bundle
    //   BUNDLE_END   — finished building a bundle
    //   END          — finished building all bundles
    //   ERROR        — encountered an error while bundling
    //   FATAL        — encountered an unrecoverable error
    console.log(event);
  });
}

dev();

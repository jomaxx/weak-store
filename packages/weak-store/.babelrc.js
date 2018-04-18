if (process.env.BABEL_ENV === "rollup") {
  module.exports = {
    presets: [
      [
        "env",
        {
          modules: false
        }
      ]
    ]
  };
} else {
  module.exports = {
    presets: ["env"]
  };
}

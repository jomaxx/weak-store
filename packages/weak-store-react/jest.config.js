const pkg = require("./package.json");

module.exports = {
  moduleNameMapper: {
    [pkg.name]:
      process.env.JEST_ENV === "production" ? "<rootDir>" : "<rootDir>/src"
  }
};

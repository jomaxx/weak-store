import path from "path";
import rollup from "rollup";
import babel from "rollup-plugin-babel";
import pkg from "./package.json";

const cwd = process.cwd();

process.env.BABEL_ENV = "rollup";

export default {
  input: require.resolve("./src"),

  output: [
    {
      file: path.resolve(cwd, pkg.main),
      format: "cjs"
    },

    pkg.module && {
      file: path.resolve(cwd, pkg.module),
      format: "es"
    }
  ].filter(Boolean),

  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {})
  ],

  plugins: [babel()]
};

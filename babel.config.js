// {
//   "presets": [
//     [
//       "env",
//       {
//         "modules": false
//       }
//     ],
//     "react",
//     "stage-0"
//     // "@babel/preset-typescript"
//   ],
//   "plugins": ["transform-es2015-modules-commonjs"]
// }

module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
  plugins: ["@babel/plugin-proposal-class-properties", "@babel/plugin-syntax-dynamic-import", "@babel/transform-runtime"]
}

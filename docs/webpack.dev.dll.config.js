// @flow weak

const path = require('path')
const webpack = require('webpack')
const packageJsonSrc = require('../package.json')
const packageJson = require('./package.json')

const excludedDeps = []

const deps = [
  'react-hot-loader/index',
  'react-hot-loader/patch',
  'webpack-dev-server/client',
  'webpack/hot/log-apply-result',
  'webpack-dev-server/client/index',
]
  .concat(Object.keys(packageJson.dependencies))
  .concat(Object.keys(packageJsonSrc.dependencies))
  .concat(Object.keys(packageJsonSrc.peerDependencies))
  .filter(dep => {
    return excludedDeps.indexOf(dep) === -1
  })

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    lib: deps,
  },
  output: {
    filename: 'dll.bundle.js',
    path: path.join(__dirname, 'build'),
    library: 'dll',
  },
  plugins: [
    new webpack.DllPlugin({
      name: 'dll',
      path: 'build/dll.manifest.json',
    }),
  ],
}

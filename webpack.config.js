const path = require('path');
// this package handles all the external packages
const nodeExternals = require('webpack-node-externals');
// help running shell commands with webpack before and after the build process
const WebpackShellPlugin = require('webpack-shell-plugin-next');
// used to do the typechecking in a seperate process so the transpiling will be handled only by tsloader.
// speed up compilation of code
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');


// const devServer = process.env.NODE_ENV.trim() !== 'production';
const serverMode = process.env.NODE_ENV.trim();

// const {
//   NODE_ENV = 'production',
// } = process.env;

module.exports = {
  // our entry server file
  entry: './src/bin/www.ts',
  // should be here so webpack knows that it handles node packages
  target: 'node',
  // mode can be production or development
  mode: serverMode,
  // enable watching only if it is development mode
  watch: serverMode,
  externals: [nodeExternals()],
  // output path, i chose build but feel free to change it to anything
  // output file name [name]. means that it will create multiple code chunks for the build
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  // all file extensions to resolve, we might need to add file and images extensions if needed
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new WebpackShellPlugin({
      onBuildStart: {
        scripts: ['echo "Webpack Start"'],
        blocking: true,
        parallel: false,
      },
      onBuildEnd: {
        scripts: serverMode ? ['npm run run:dev'] : ['npm run run:prod'],
        blocking: true,
        parallel: false,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            // loader: 'ts-loader',
            options: {
              // use tsconfig.prod only in development mode
              configFile: serverMode === 'development' ? 'tsconfig.json' : 'tsconfig.prod.json',
              transpileOnly: true // and we use ForkTsCheckerWebpackPlugin for type checking
            }
          }
        ],
      }
    ]
  }
}
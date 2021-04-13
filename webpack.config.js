const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Dotenv = require('dotenv-webpack')
const PrettierPlugin = require('prettier-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
require('babel-polyfill')

const port = process.env.PORT || 9000

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    console.log('Environment: production')
  } else {
    console.log('Environment: development')
    require('dotenv').config()
  }

  const cssExtract = {
    loader: MiniCssExtractPlugin.loader
  }
  const postCss = { loader: 'postcss-loader', options: { sourceMap: true } }
  const sassLoader = {
    loader: 'sass-loader',
    options: {
      sassOptions: {
        includePaths: [path.resolve(__dirname, './src')],
        sourceMap: true
      }
    }
  }

  const config = {
    entry: {
      app: ['./node_modules/es6-promise/dist/es6-promise.auto.js', 'isomorphic-fetch', 'babel-polyfill', './src/index.tsx']
    },
    output: {
      filename: '[name].[contenthash].js',
      publicPath: '/',
      pathinfo: false
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      fullySpecified: false
    },
    module: {
      rules: [
        {
          test: /(?<=\.module)\.scss$/,
          use: [
            cssExtract,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  compileType: 'module',
                  localIdentName: '[local]__[contenthash:base64:5]'
                },
                url: false,
                sourceMap: true
              }
            },
            postCss,
            sassLoader
          ]
        },
        {
          test: /(?<!\.module)\.s?css$/,
          use: [
            cssExtract,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  compileType: 'icss'
                },
                url: false,
                sourceMap: true
              }
            },
            postCss,
            sassLoader
          ]
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        },
        {
          test: /\.(ico|manifest|txt|html)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        },
        {
          test: /(quote\.svg)|(\.(png|jp(e*)g))$/,
          loader: 'file-loader',
          options: {
            name: 'assets/[name].[ext]'
          }
        },
        {
          test: /\.svg/,
          use: [
            {
              loader: '@svgr/webpack'
            }
          ],
          exclude: [/quote\.svg/]
        },
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader'
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader'
        }
      ]
    },
    stats: {
      colors: true
    },
    plugins: [
      new Dotenv(),
      new PrettierPlugin({
        extensions: ['js', 'ts', 'tsx']
      }),
      new StylelintPlugin({ files: './src/**/*.{,s}css', fix: argv.mode === 'development' })
    ]
  }

  if (process.env.MODE === 'ts') {
    console.log('Using ts linter')
    config.module.rules.push({
      enforce: 'pre',
      loader: 'eslint-loader',
      options: {
        configuration: {
          rules: {
            quotemark: [true, 'single', 'jsx-double']
          }
        },
        configFile: path.join(__dirname, '.eslintrc.js'),
        emitWarning: argv.mode === 'development',
        failOnWarning: argv.mode === 'production',
        fix: argv.mode === 'production',
        tsConfigFile: 'tsconfig.json'
      },
      test: /\.tsx$/
    })
    config.plugins.push(
      new ESLintPlugin({
        fix: true,
        extensions: ['js', 'ts', 'tsx']
      })
    )
  } else {
    console.log('NOT using ts linter')
  }

  if (argv.mode === 'production') {
    config.optimization = {
      minimize: true,
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: { chunks: 'all' }
    }
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].[contenthash].css'
      })
    )
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(argv.mode)
      })
    )
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: 'src/index.pug',
        filename: 'template.pug',
        hash: true,
        minify: {
          collapseWhitespace: false
        }
      })
    )
    if (process.env.ROLLBAR_SERVER_KEY) {
      config.plugins.push(
        new RollbarSourceMapPlugin({
          accessToken: process.env.ROLLBAR_SERVER_KEY,
          version: 'v1',
          publicPath: '/',
          ignoreErrors: true
        })
      )
    }
    config.devtool = 'source-map'
  } else {
    config.output.filename = '[name].js'

    config.devtool = 'eval-source-map'

    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      })
    )

    config.plugins.push(
      new HtmlWebpackPlugin({
        template: 'src/dev.pug',
        filename: 'template.pug',
        minify: {
          collapseWhitespace: false
        }
      })
    )

    config.devServer = {
      compress: false,
      stats: {
        children: false,
        maxModules: 0,
        colors: true
      },
      proxy: {
        '*': 'http://localhost:5005'
      },
      port: port
    }
  }

  return config
}

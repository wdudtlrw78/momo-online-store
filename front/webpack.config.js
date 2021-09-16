const path = require('path');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

const config = {
  name: 'momo-online-store',
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'eval' : 'hidden-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@components': path.resolve(__dirname, 'components'),
      '@layouts': path.resolve(__dirname, 'layouts'),
      '@pages': path.resolve(__dirname, 'pages'),
      '@lib': path.resolve(__dirname, 'lib'),
      '@hooks': path.resolve(__dirname, 'hooks'),
      '@hoc': path.resolve(__dirname, 'hoc'),
      '@config': path.resolve(__dirname, 'config'),
      '@_reducers': path.resolve(__dirname, '_reducers'),
      '@_sagas': path.resolve(__dirname, '_sagas'),
    },
  },
  entry: {
    app: './client',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: ['last 2 chrome versions'],
                },
              },
            ],
            '@babel/preset-react',
          ],
          env: {
            development: {
              plugins: [require.resolve('react-refresh/babel')],
            },
          },
        },
        exclude: path.join(__dirname, 'node_modules'),
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]',
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'url-loader',
        options: {
          limit: 10000,
          fallback: 'file-loader',
          name: 'images/[name].[ext]',
        },
      },
    ],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: isDevelopment ? 'development' : 'production',
    }),
  ],

  performance: {
    hints: false,
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },

  // webpack-dev-server@4 버전
  // devServer: {
  //   devMiddleware: { publicPath: '/dist' },
  //   static: { directory: path.resolve(__dirname) },
  //   hot: true
  // }

  devServer: {
    historyApiFallback: true,
    port: 3400,
    publicPath: '/',
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
    },
  },
};

if (isDevelopment && config.plugins) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new ReactRefreshWebpackPlugin());
  // config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'server', openAnalyzer: true }));
}

if (!isDevelopment && config.plugins) {
  config.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));
  config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }));
<<<<<<< HEAD
  config.plugins.push(
    new HtmlWebpackPlugin({
      minify: { collapseWhitespace: true },
      hash: true,
      template: './index.html',
    }),
  );
=======
  config.plugins.push(new HtmlWebpackPlugin({ template: './index.html' }));
>>>>>>> 3d518474dbd31a45aa00488595ca77e03fdb0a22
  config.plugins.push(new CleanWebpackPlugin());
}

module.exports = config;

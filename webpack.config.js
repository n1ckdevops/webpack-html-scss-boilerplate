const path = require('path');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');

const isProd = !process.argv.find((str) => str.includes('development'));

module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? 'source-map' : 'inline-source-map',
  stats: 'minimal',

  output: {
    path: path.join(__dirname, 'dist'),
    clean: true,
  },

  resolve: {
    // use aliases used in sources instead of relative paths like ../../
    alias: {
      '@views': path.join(__dirname, 'src/views/'),
      '@images': path.join(__dirname, 'src/assets/images/'),
      '@fonts': path.join(__dirname, 'src/assets/fonts/'),
      '@styles': path.join(__dirname, 'src/assets/styles/'),
      '@scripts': path.join(__dirname, 'src/assets/scripts/'),
    },
  },

  plugins: [
    new HtmlBundlerPlugin({
      // verbose: 'auto', // output information about the process to console in development mode only
      entry: {
        index: 'src/index.html',
      },
      js: {
        // output filename of extracted JS from source script loaded in HTML via `<script>` tag
        filename: 'src/js/[name].[contenthash:8].js', // output into dist/assets/js/ directory
      },
      css: {
        // output filename of extracted CSS from source style loaded in HTML via `<link>` tag
        filename: 'src/scss/[name].[contenthash:8].css', // output into dist/assets/css/ directory
      },

      // supports template engines: eta, ejs, handlebars, nunjucks, twig
      preprocessor: 'nunjucks', // use the Nunjucks template engine
    }),
  ],

  module: {
    rules: [
      // load styles
      {
        test: /\.(css|sass|scss)$/,
        use: ['css-loader', 'sass-loader'],
      },

      // load fonts from `fonts` or `node_modules` directory only
      {
        test: /[\\/]fonts|node_modules[\\/].+(woff(2)?|ttf|otf|eot|svg)$/,
        type: 'asset/resource',
        generator: {
          // keep original directory structure
          filename: ({ filename }) => {
            const srcPath = 'src/assets/fonts';
            const regExp = new RegExp(`[\\\\/]?(?:${path.normalize(srcPath)}|node_modules)[\\\\/](.+?)$`);
            const assetPath = path.dirname(regExp.exec(filename)[1].replace('@', '').replace(/\\/g, '/'));

            return `assets/fonts/${assetPath}/[name][ext][query]`;
          },
        },
      },

      // load images from `images` directory only
      {
        test: /[\\/]images[\\/].+(png|jpe?g|svg|webp|ico)$/,
        oneOf: [
          // inline image using `?inline` query
          {
            resourceQuery: /inline/,
            type: 'asset/inline',
          },
          // auto inline by image size
          {
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 1024,
              },
            },
            generator: {
              filename: 'assets/img/[name].[hash:8][ext]',
            },
          },
        ],
      },
    ],
  },

  performance: {
    // don't show the size limit warning when a bundle is bigger than 250 KB
    hints: false,
  },

  devServer: {
    // open browser
    open: true,
    compress: true,
    static: {
      directory: path.join(__dirname, './dist'),
    },

    // enable live reload
    watchFiles: {
      paths: ['src/**/*.*'],
      options: {
        usePolling: true,
      },
    },

    // rewrite rules
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/index.html' },
        { from: /./, to: '/404.html' },
      ],
    },
  },
};

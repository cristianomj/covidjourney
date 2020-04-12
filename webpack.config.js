const resolve = require('path').resolve;

module.exports = () => {
  const dir = 'frontend';
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
    resolve: {
      alias: {
        api: resolve(__dirname, dir, 'api'),
        assets: resolve(__dirname, dir, 'assets'),
        components: resolve(__dirname, dir, 'components'),
        helpers: resolve(__dirname, dir, 'helpers'),
        state: resolve(__dirname, dir, 'state'),
        styles: resolve(__dirname, dir, 'styles'),
      },
      modules: [resolve(__dirname, dir, 'node_modules'), 'node_modules'],
    },
  };
}

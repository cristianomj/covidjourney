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
        components: resolve(__dirname, dir, 'components'),
        helpers: resolve(__dirname, dir, 'helpers'),
        state: resolve(__dirname, dir, 'state'),
      },
      modules: [resolve(__dirname, dir, 'node_modules'), 'node_modules'],
    },
  };
}

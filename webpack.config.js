const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    port: 9000,
    inline: false,
  },
  module: {
    loaders: [
        {
            test: /\.css$/,
            loader: 'style!css',
        },
        {
            test: /\.styl$/,
            loader: 'style!css!stylus',
        },
        {
            test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
            loader: 'file-loader?name=[name].[ext]',
        },
    ],
},
};

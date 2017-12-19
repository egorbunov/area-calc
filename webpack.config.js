
module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: __dirname,
  },
  devServer: {
    contentBase: __dirname,
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

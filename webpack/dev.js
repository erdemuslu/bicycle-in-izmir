const webpack = require('../webpack.config')

console.log(webpack.output.publicPath)
module.exports = {
    ...webpack,
    devtool: "source-map",
    serve: {
        compress: true,
        port: 9000,
    },
}
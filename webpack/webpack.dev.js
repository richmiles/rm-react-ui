const webpack = require('webpack')
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env) => {
    return {
        mode: 'development',
        devtool: 'cheap-module-source-map',
        devServer: {
            hot: true,
            open: true,
            historyApiFallback: true
        },
        plugins: [
            new CopyPlugin({
                patterns: [{
                    from: "src/public",
                    to: "./",
                globOptions: { ignore: ["**/index.html"] }
                }, ],
            }),
            new webpack.DefinePlugin({
                'process.env.goal': JSON.stringify(env.goal),
                'process.env.maintenance': JSON.stringify(env.maintenance),
                'process.env.api_url': JSON.stringify("https://localhost:7015/api"),
                "process.env.SENTRY_DSN": JSON.stringify(process.env.SENTRY_DSN)
            })
        ],
    }
}
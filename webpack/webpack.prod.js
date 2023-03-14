const webpack = require('webpack')
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env) => {
    return {
        mode: 'production',
        devtool: env.goal == "staging" ? "source-map": false,
        plugins: [
            new CopyPlugin({
                patterns: [{
                    from: "src/public",
                    to: "./",
                globOptions: { ignore: ["**/index.html", "**/images", "**/images-original"] }
                }, ],
            }),
            new webpack.DefinePlugin({
                'process.env.goal': JSON.stringify(env.goal),
                'process.env.maintenance': JSON.stringify(env.maintenance),
                'process.env.api_url': "https://api.chatunleashed.com",
            }),
        ],
    }
}
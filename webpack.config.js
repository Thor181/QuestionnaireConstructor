const webpack = require("webpack");

const path = require('path');

/**@type {webpack.Configuration}*/
module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'wwwroot', 'js', 'app.ts'),
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'wwwroot', 'js', 'build'),
        clean: true
    },
    plugins: [new webpack.ProgressPlugin()],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            }
        ],
    },
    resolve: {
        modules: ['./node_modules/'],
        extensions: ['.js'],
    },
    devtool: 'inline-source-map',
    watch: true,
    watchOptions: {
        aggregateTimeout: 200
    }
};


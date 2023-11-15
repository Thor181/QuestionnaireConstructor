const path = require('path');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'scripts', 'app.ts'),
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'wwwroot', 'js', 'build'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    }
}
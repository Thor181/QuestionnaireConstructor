import path from 'path';
import webpack from 'webpack';
const config = {
    mode: 'development',
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
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};
export default config;
//# sourceMappingURL=webpack.config.js.map
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProduction = false;

module.exports = {
    mode: isProduction ? 'production' : 'development',
    entry: {
        main: path.resolve(__dirname, './src/index.tsx')
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        // alias: {
        //     'react-redux': require.resolve('react-redux'),
        // }
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js'
    },

    devServer: {
        static: path.join(__dirname, "dist"),
        compress: true,
        port: 4000
    },

    plugins: [
        new HtmlWebpackPlugin({
          title: 'Altius App',
          template: path.resolve(__dirname, './src/template.html'), // template file
          filename: 'index.html', // output file
        }),
        new CleanWebpackPlugin(),
    ],

    module: {
        rules: [
            // JavaScript
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: ['babel-loader']
            },
            {
                test: /\.tsx$/,
                exclude: /node_modules/,
                use: ['ts-loader'],
            },
            {
                test: /.s?css$/,
                use: [
                  "style-loader",
                  "css-loader",
                  "sass-loader"
                ]
            }
        ]
    }
}
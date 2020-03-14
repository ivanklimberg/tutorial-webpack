const path = require('path');
// Quito Terser Plugin porque en modo development no es necesario minificar
// const TerserPlugin = require('terser-webpack-plugin');
//Si se quita el mini css extract plugin y se usa el style-loader el build de dev se hace mas rapido
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'hello-world': './src/hello-world.js',
        'kiwi': './src/kiwi.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: ''
    },
    mode: 'development',
    //Opciones obligatorias de devServer
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        index: 'index.html',
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                use: [
                    'file-loader'
                ]
            },  
            {
                test: /\.css$/,
                use: [
                    //Si se quita el mini css extract plugin y se usa el style-loader el build de dev se hace mas rapido
                    MiniCssExtractPlugin.loader, 'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ '@babel/env' ],
                        plugins: [ 'transform-class-properties' ]
                    }
                }
            },
            {
                test: /\.hbs$/,
                use: [
                    'handlebars-loader'
                ]
            }
            
        ]
    },
    plugins: [
        // Quito Terser Plugin porque en modo development no es necesario minificar
        // new TerserPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        //Config para que borre la carpeta dist Y la carpeta build
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '**/*',
                path.join(process.cwd(), 'build/**/*')
            ]
        }),
        new HtmlWebpackPlugin({
            filename: 'hello-world.html',
            chunks: ['hello-world'],
            template: 'src/page-template.hbs',
            //Variables llamadas desde option
            title: 'Hello world',
            description: 'prueba descripcion'
        }),
        new HtmlWebpackPlugin({
            filename: 'kiwi.html',
            chunks: ['kiwi'],
            template: 'src/page-template.hbs',
            //Variables llamadas desde option
            title: 'Kiwi',
            description: 'Kiwi'
        })
        
    ]
}
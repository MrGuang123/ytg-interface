const { resolve } = require('path')
const merge = require('webpack-merge')
const argv = require('yargs-parser')(process.argv.slice(2))
const _mode = argv.mode || 'development'
const _mergeConfig = require(`./config/webpack.${_mode}.js`)
const _modeFlag = _mode === 'production'
// const WebpackBar = require('webpackbar')

const webpackBaseConfig = {
    entry: {
        main: resolve('src//web/index.tsx')
    },
    output: {
        path: resolve(process.cwd(), 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: {
                    loader: 'swc-loader'
                }
            }
        ]
    },
    resolve: {
        alias: {
            '@components': resolve('src/web/components'),
            '@hooks': resolve('src/web/hooks'),
            '@pages': resolve('src/web/pages'),
            '@layouts': resolve('src/web/layouts'),
            '@assets': resolve('src/web/assets'),
            '@store': resolve('src/web/store'),
            '@utils': resolve('src/web/utils'),
            '@constants': resolve('src/web/constants'),
            '@routers': resolve('src/web/routers'),
        },
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
        fallback: {}
    }
}

module.exports = merge.default(webpackBaseConfig, _mergeConfig)
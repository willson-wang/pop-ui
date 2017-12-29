'use strict';
const path = require('path');
const utils = require('./utils');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');

const MarkdownItContainer = require('markdown-it-container');
const striptags = require('./strip-tags');

const vueMarkdown = {
    // 预处理，调整MarkdownIt的部分内置渲染规则
    preprocess: (MarkdownIt, source) => {
        // MarkdownIt.renderer.rules默认的rulse共有9个code_inline(行内代码块)，解析为code标签；code_block(代码块)，解析为pre标签内包裹code标签；fence解析为高亮部分的代码块，pre标签内嵌套code标签；image；hardbreak转换为br标签；softbreak转换为br标签，text，html_block，html_inline
        // 新增表格rule
        MarkdownIt.renderer.rules.table_open = function () {
            return '<table class="table">';
        };
        // 重写fence
        MarkdownIt.renderer.rules.fence = utils.wrapCustomClass(MarkdownIt.renderer.rules.fence);

        // ```code`` 给这种样式加个class code_inline
        const code_inline = MarkdownIt.renderer.rules.code_inline; // eslint-disable-line
        MarkdownIt.renderer.rules.code_inline = function (...args) {
            args[0][args[1]].attrJoin('class', 'code_inline');
            return code_inline(...args);
        };
        return source;
    },
    // 使用MarkdownItContainer插件
    use: [
        [MarkdownItContainer, 'demo', {
            validate: params => params.trim().match(/^demo\s*(.*)$/),
            render: function (tokens, idx) {
                var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/); // eslint-disable-line

                if (tokens[idx].nesting === 1) {
                    var desc = tokens[idx + 2].content; // eslint-disable-line
                    const html = utils.convertHtml(striptags(tokens[idx + 1].content, 'script'));
                    // 移除描述，防止被添加到代码块
                    tokens[idx + 2].children = [];

                    return `<demo-block>
                        <div slot="desc">${html}</div>
                        <div slot="highlight">`;
                }
                return '</div></demo-block>\n';
            }
        }]
    ]
};

function resolve (dir) {
    return path.join(__dirname, '..', dir);
}

const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('examples'), resolve('packages'), resolve('test')],
    options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: !config.dev.showEslintErrorsInOverlay
    }
});

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: './examples/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('examples'),
            'src': resolve('src'),
            'packages': resolve('packages')
        }
    },
    module: {
        rules: [
            ...(config.dev.useEslint ? [createLintingRule()] : []),
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('examples'), resolve('test')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.md$/,
                loader: 'vue-markdown-loader',
                options: vueMarkdown
            }
        ]
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
};

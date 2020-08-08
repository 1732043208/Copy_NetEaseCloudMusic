const path = require('path');

module.exports = {
    css: {
        loaderOptions: {}
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, "src/assets/common/common.less")] // 引入全局样式变量
        }
    },
    devServer: {
        // open: false,
        // host: 'localhost',
        // port: 8080,
        // https: false,
        //以上的ip和端口是我们本机的;下面为需要跨域的
        proxy: {//配置跨域
            '/NetEaseCloudMusicApi': {
                target: 'http://localhost:3000',//这里后台的地址模拟的;应该填写你们真实的后台接口
                ws: true,// 开启webSocket
                changOrigin: true,//允许跨域，在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                pathRewrite: {
                    '^/NetEaseCloudMusicApi': ''//请求的时候baseURL就可以使用这个api就可以
                }
            }

        }
    }

};

// 此文件用于配置proxy 在开发阶段解决跨域的问题
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target : 'http://localhost:5003',
            changeOrigin : true,
        })
    );
};
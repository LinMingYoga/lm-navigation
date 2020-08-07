const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(createProxyMiddleware('/linming/api', {
    target: 'http://localhost:5000/',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/linming": ""
    }
  }))
}
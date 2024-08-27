const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://13.236.161.155:8080',
      changeOrigin: true,
    })
  );
};

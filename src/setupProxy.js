const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/user",
    createProxyMiddleware({
      target: "https://3.36.65.28:8080",
      changeOrigin: true,
    })
  );
};

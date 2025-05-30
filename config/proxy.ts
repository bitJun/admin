export default {
  dev: {
    '/api': {
      target: 'https://youjia-admin.529603395.xyz',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  test: {
    '/api': {
      target: 'https://youjia-admin.529603395.xyz',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  prod: {
    '/api': {
      target: 'http://prod-cn.your-api-server.com',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
};
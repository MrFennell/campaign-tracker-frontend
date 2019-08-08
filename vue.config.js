module.exports = {
    devServer: {
      proxy: {
        '^http://campaign-tracker-server.fennellweb.com': {
          target: 'http://localhost:8000',
          ws: true,
          changeOrigin: true,
          pathRewrite: {
            'http://campaign-tracker-server.fennellweb.com': ''
          }
        },
        '/images': {
            target: 'http://localhost:8000',
            changeOrigin: true,
        }
      }
    }
  }

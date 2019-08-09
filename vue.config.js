module.exports = {
    devServer: {
      proxy: {
        '^campaign-tracker-server.fennellweb.com/': {
          target: 'http://localhost:8000',
          ws: true,
          changeOrigin: true,
          pathRewrite: {
            'campaign-tracker-server.fennellweb.com/': ''
          }
        },
        '/images': {
            target: 'http://localhost:8000',
            changeOrigin: true,
        }
      }
    }
  }

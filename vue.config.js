module.exports = {
    devServer: {
      proxy: {
        '^https://campaign-tracker-backend-redux.herokuapp.com/': {
          target: 'http://localhost:8000',
          ws: true,
          changeOrigin: true,
          pathRewrite: {
            'https://campaign-tracker-backend-redux.herokuapp.com/': ''
          }
        },
        '/images': {
            target: 'http://localhost:8000',
            changeOrigin: true,
        }
      }
    }
  }

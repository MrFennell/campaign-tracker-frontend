module.exports = {
    devServer: {
      proxy: {
        '^/campaigntracker.fennellweb.com': {
          target: 'http://localhost:8000',
          ws: true,
          changeOrigin: true,
          pathRewrite: {
            '/campaigntracker.fennellweb.com': ''
          }
        },
        '/images': {
            target: 'http://localhost:8000',
            changeOrigin: true,
        }
      }
    }
  }

// module.exports = {
//     devServer: {
//         // proxy: 'https://campaign-tracker-backend.herokuapp.com/'
//         proxy: 'http://localhost:8000'
//     },
// };
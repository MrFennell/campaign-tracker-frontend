// module.exports = {
//     devServer: {
//       proxy: {
//         '^api': {
//           target: 'http://localhost:8000',
//           ws: true,
//           changeOrigin: true,
//           pathRewrite: {
//             'api': ''
//           }
//         },
//         '/images': {
//             target: 'http://localhost:8000',
//             changeOrigin: true,
//         }
//       }
//     }
//   }

  module.exports = {
    devServer: {
      proxy: 'http://localhost:8000'
    }
  }
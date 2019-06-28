const fs = require('fs')
fs.writeFileSync('./.env', `VUE_APP_BASEURL=${process.env.VUE_APP_BASEURL}\n`)
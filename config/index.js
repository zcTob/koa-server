let config;
if(process.env.NODE_ENV === 'development') {
  config = require('./config.dev')
}
if(process.env.NODE_ENV === 'production') {
  config = require('./config.prod')
}

module.exports = config
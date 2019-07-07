let config;
if(process.env.NODE_ENV === 'development') {
  config = {
    domain: 'localhost'
  }
}
if(process.env.NODE_ENV === 'production') {
  config = {
    domain: '.hellozhangyu.top'
  }
}



module.exports = config
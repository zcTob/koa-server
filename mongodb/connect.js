const MongoClient = require('mongodb').MongoClient

const config = {
  url: '39.108.54.85:27017',
  user: 'zy',
  paw: '111111',
  dbName: 'blog'
}

const mongodb = new Promise((resolve, reject) => {
  MongoClient.connect(
    `mongodb://${config.user}:${config.paw}@${config.url}/?authSource=${config.dbName}`, 
    { useNewUrlParser: true }, 
    (err, client) => {
    if (err) throw reject(err)
    console.log('mongodb connect is success')
    const db = client.db(config.dbName)
    resolve({ db, client })
  })
})

module.exports = mongodb
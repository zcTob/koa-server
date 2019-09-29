const crypto = require('crypto');
const config = require('../config')
const path = require('path')
exports.enCrypto = (pass) => {
  const newPass = pass + config.salt
  return crypto.createHash("md5").update(newPass).digest("hex")
}

exports.getPath = (name) => {
  return path.resolve(__dirname, name)
}
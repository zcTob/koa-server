/* eslint-disable no-undef */
let config
if (process.env.NODE_ENV === "development") {
  config = require("./dev")
}
if (process.env.NODE_ENV === "production") {
  config = require("./dev")
}

module.exports = config

/**
 * Secure Password
 */
const bcrypt = require("bcryptjs")

module.exports = {
  hash,
  compare,
}

function hash(password) {
  return bcrypt.hashSync(password, 10)
}

function compare(password, hash) {
  return bcrypt.compareSync(password, hash)
}

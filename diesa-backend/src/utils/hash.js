const bcrypt = require("bcrypt");

async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function comparePassword(input, hashed) {
  return await bcrypt.compare(input, hashed);
}

module.exports = { hashPassword, comparePassword };

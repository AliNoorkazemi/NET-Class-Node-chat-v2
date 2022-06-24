const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
process.env.TOKEN_SECRET;

function token_gen(id) {
  return jwt.sign({ userId: id }, process.env.TOKEN_SECRET, {
    expiresIn: "1800s",
  });
}

module.exports = token_gen;

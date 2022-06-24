var database = require("../../database/database");
var token_gen = require("./token_gen");

function signup(req, res) {
  if (database.users.some((user) => user.email === req.body.email)) {
    const id = database.users.find((user) => user.email === req.body.email).id;
    res.status(200).send({
      token: token_gen(id),
      message: "successful",
    });
  } else {
    res.status(400).send({
      error: {
        message: "Bad request!",
      },
    });
  }
}

module.exports = signup;

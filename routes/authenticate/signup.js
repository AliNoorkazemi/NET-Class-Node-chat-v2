var database = require("../../database/database");
var token_gen = require("./token_gen");

const { v1: uuidv1 } = require("uuid");

function signup(req, res) {
  if (database.users.some((user) => user.email === req.body.email)) {
    res.status(400).send({
      error: {
        message: "Bad request!",
      },
    });
  } else {
    const id = uuidv1();
    database.users.push({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      id: id,
      groupId: null,
      join_requests: [],
    });

    database.chats.push({
      userId: id,
      chats: [],
    });

    res.status(200).send({
      token: token_gen(id),
      message: "successful",
    });
  }
}

module.exports = signup;

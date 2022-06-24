var database = require("../../database/database");

const { v1: uuidv1 } = require("uuid");

function create_join_request(req, res) {
  if (
    database.users.find((user) => user.id === req.user.userId).groupId === null
  ) {
    const requestId = uuidv1();
    const date = new Date().getTime();
    database.join_requests
      .find((request) => request.groupId === req.body.groupId)
      .requests.push({
        userId: req.user.userId,
        date: date,
        requestId: requestId,
      });

    database.users
      .find((user) => user.id === req.user.userId)
      .join_requests.push({
        id: requestId,
        groupId: req.body.groupId,
        userId: req.user.userId,
        date: date,
      });

    res.status(200).send({
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

module.exports = create_join_request;

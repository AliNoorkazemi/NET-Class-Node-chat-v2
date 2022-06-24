var database = require("../../database/database");

const { v1: uuidv1 } = require("uuid");

function create_connection_request(req, res) {
  const userId = req.user.userId;

  const groupId = database.users.find((user) => user.id === userId).groupId;

  const group = database.groups.find((group) => group.groupId === groupId);

  if (!group) {
    res.status(400).send({
      error: {
        message: "Bad request!",
      },
    });
    return;
  }

  if (group.members.find((member) => member.id === userId).rule === "owner") {
    const requestId = uuidv1();
    const date = new Date().getTime();
    database.connection_requests
      .find((request) => request.groupId === req.body.groupId)
      .requests.push({
        groupId: groupId,
        connectionRequestId: requestId,
        sent: date,
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

module.exports = create_connection_request;

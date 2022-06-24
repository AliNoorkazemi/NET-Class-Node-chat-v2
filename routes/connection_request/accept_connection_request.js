var database = require("../../database/database");

function accept_connection_request(req, res) {
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
    const requests = database.connection_requests.find(
      (request) => request.groupId === groupId
    ).requests;

    const requested_groupId = requests.find(
      (request) =>
        request.connectionRequestId === req.body.connectionRequestId
    ).groupId;

    database.groups
      .find((group) => group.groupId === groupId)
      .connected_groups.push(requested_groupId);
    database.groups
      .find((group) => group.groupId === requested_groupId)
      .connected_groups.push(groupId);

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

module.exports = accept_connection_request;

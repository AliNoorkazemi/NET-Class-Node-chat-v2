var database = require("../../database/database");

function get_my_group_connection_request(req, res) {
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

    res.status(200).send({
      requests: requests.sort((a, b) => b.sent - a.sent),
    });
  } else {
    res.status(400).send({
      error: {
        message: "Bad request!",
      },
    });
  }
}

module.exports = get_my_group_connection_request;

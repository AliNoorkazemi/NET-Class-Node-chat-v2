var database = require("../../database/database");

function get_my_group_join_request(req, res) {
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
    const joinRequests = database.join_requests.find(
      (request) => request.groupId === groupId
    ).requests;
    joinRequests.sort((a, b) => b.date - a.date);
    res.status(200).send({
      joinRequests: joinRequests.map((request) => ({
        id: request.requestId,
        groupId: groupId,
        userId: request.userId,
        date: request.date,
      })),
    });
  } else {
    res.status(400).send({
      error: {
        message: "Bad request!",
      },
    });
  }
}

module.exports = get_my_group_join_request;

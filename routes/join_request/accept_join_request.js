var database = require("../../database/database");

function accept_join_request(req, res) {
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
    const user_join_requested_id = joinRequests.find(
      (request) => request.requestId === req.body.joinRequestId
    ).userId;

    const user_join_requested = database.users.find(
      (user) => user.id === user_join_requested_id
    );

    group.members.push({
      id: user_join_requested.id,
      name: user_join_requested.name,
      email: user_join_requested.email,
      rule: "normal",
    });

    user_join_requested.groupId = groupId;

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

module.exports = accept_join_request;

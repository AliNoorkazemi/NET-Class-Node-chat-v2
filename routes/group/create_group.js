var database = require("../../database/database");

const { v1: uuidv1 } = require("uuid");

function create_group(req, res) {
  if (
    database.users.find((user) => user.id === req.user.userId).groupId === null
  ) {
    const user = database.users.find((user) => user.id === req.user.userId);
    const groupId = uuidv1();
    user.groupId = groupId;

    database.groups.push({
      groupId: groupId,
      name: req.body.name,
      description: req.body.description,
      members: [
        {
          id: user.id,
          name: user.name,
          email: user.email,
          rule: "owner",
        },
      ],
      connected_groups: [groupId],
    });

    database.join_requests.push({
      groupId: groupId,
      requests: [],
    });

    database.connection_requests.push({
      groupId: groupId,
      requests: [],
    });

    res.status(200).send({
      group: {
        id: groupId,
      },
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

module.exports = create_group;

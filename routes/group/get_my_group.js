var database = require("../../database/database");

function get_my_group(req, res) {
  if (
    database.users.find((user) => user.id === req.user.userId).groupId === null
  ) {
    res.status(400).send({
      error: {
        message: "Bad request!",
      },
    });
  } else {
    const user = database.users.find((user) => user.id === req.user.userId);
    const group = database.groups.find(
      (group) => group.groupId === user.groupId
    );
    res.status(200).send({
      group: {
        name: group.name,
        description: group.description,
        members: group.members.reverse(),
      },
    });
  }
}

module.exports = get_my_group;

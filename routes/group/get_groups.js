var database = require("../../database/database");

function get_groups(req, res) {
  res.status(200).send({
    groups: database.groups.map((group) => {
      return {
        id: group.groupId,
        name: group.name,
        description: group.description,
      };
    }),
  });
}

module.exports = get_groups;

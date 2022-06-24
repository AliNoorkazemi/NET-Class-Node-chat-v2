var database = require("../../database/database");

function get_my_join_requests(req, res) {
  const joinRequests = database.users.find(
    (user) => user.id === req.user.userId
  ).join_requests;

  res.status(200).send({
    joinRequests: joinRequests.sort((a, b) => b.date - a.date),
  });
}

module.exports = get_my_join_requests;

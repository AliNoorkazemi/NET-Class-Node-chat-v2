var database = require("../../database/database");

function get_chats(req, res) {
  res.status(200).send({
    chats: database.chats
      .find((chat) => chat.userId === req.user.userId)
      .chats.sort(
        (a, b) =>
          b.messages[b.messages.length - 1].date -
          a.messages[a.messages.length - 1].date
      )
      .map((chat) => ({
        userId: chat.userId,
        name: database.users.find((user) => user.id === chat.userId).name,
      })),
  });
}

module.exports = get_chats;

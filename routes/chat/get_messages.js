var database = require("../../database/database");

function get_messages(req, res) {
  const sender = database.users.find((user) => user.id === req.user.userId);
  const reciever = database.users.find(
    (user) => user.id === req.params.user_id
  );

  if (
    database.chats
      .find((chat) => chat.userId === sender.id)
      .chats.some((chat) => chat.userId === reciever.id)
  ) {
    database.chats
      .find((chat) => chat.userId === sender.id)
      .chats.find((chat) => chat.userId === reciever.id)
      .messages.sort((a, b) => b.date - a.date);
    res.status(200).send({
      messages: database.chats
        .find((chat) => chat.userId === sender.id)
        .chats.find((chat) => chat.userId === reciever.id).messages,
    });
  } else {
    res.status(400).send({
      error: {
        message: "Bad request!",
      },
    });
  }
}

module.exports = get_messages;

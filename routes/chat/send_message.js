var database = require("../../database/database");

function send_message(req, res) {
  const sender = database.users.find((user) => user.id === req.user.userId);
  const reciever = database.users.find(
    (user) => user.id === req.params.user_id
  );
  const sender_group = database.groups.find(
    (group) => group.groupId === sender.groupId
  );

  if (sender_group.connected_groups.some((item) => item === reciever.groupId)) {
    const date = new Date().getTime();
    if (
      database.chats
        .find((chat) => chat.userId === sender.id)
        .chats.some((chat) => chat.userId === reciever.id)
    ) {
      database.chats
        .find((chat) => chat.userId === sender.id)
        .chats.find((chat) => chat.userId === reciever.id)
        .messages.push({
          message: req.body.message,
          date: date,
          sentby: sender.id,
        });
      database.chats
        .find((chat) => chat.userId === reciever.id)
        .chats.find((chat) => chat.userId === sender.id)
        .messages.push({
          message: req.body.message,
          date: date,
          sentby: sender.id,
        });
    } else {
      database.chats
        .find((chat) => chat.userId === sender.id)
        .chats.push({
          userId: reciever.id,
          messages: [
            {
              message: req.body.message,
              date: date,
              sentby: sender.id,
            },
          ],
        });

      database.chats
        .find((chat) => chat.userId === reciever.id)
        .chats.push({
          userId: sender.id,
          messages: [
            {
              message: req.body.message,
              date: date,
              sentby: sender.id,
            },
          ],
        });
    }
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

module.exports = send_message;

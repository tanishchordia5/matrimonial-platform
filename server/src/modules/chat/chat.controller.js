const Chat = require("./chat.model");

const getChatByMatch = async (req, res) => {
  const { matchId } = req.params;
  const userId = req.user.userId;

  const chat = await Chat.findOne({
    matchId,
    participants: userId
  });

  if (!chat) {
    return res.status(403).json({ message: "No access to this chat" });
  }

  res.json(chat);
};

module.exports = { getChatByMatch };

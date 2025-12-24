const app = require("./app");
require("dotenv").config();
const connectDB = require("./config/db");
const http = require("http");
const Chat = require("./modules/chat/chat.model");
const socketAuthMiddleware = require("./middlewares/socketAuth.middleware");

const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});
connectDB();

io.use(socketAuthMiddleware);

io.on("connection", socket => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", roomId => {
    socket.join(roomId);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

  socket.on("sendMessage", async ({ matchId, text }) => {
    const userId = socket.user.userId;

    let chat = await Chat.findOne({ matchId });

    if (!chat) {
      return;
    }

    chat.messages.push({
      senderId: userId,
      text
    });

    await chat.save();

    io.to(matchId).emit("receiveMessage", {
      senderId: userId,
      text,
      createdAt: new Date()
    });
  });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});






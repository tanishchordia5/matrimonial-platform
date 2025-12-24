const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        senderId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true
        },
        text : {
            type : string,
            required : true
        }
    },
    {timestamps : true}
);


const chatSchema = new mongoose.Schema(
    {
        matchId : {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            unique : true
        },
        messages : [messageSchema],
        participants : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "User"
            }
        ]
    },
    {timestamps : true}
);

module.exports = mongoose.model("Chat" , chatSchema);
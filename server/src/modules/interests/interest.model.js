const mongoose = require("mongoose");

const interestSchema = new mongoose.Schema(
    {
        fromUserId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true
        },
        toUserId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true
        },
        status : {
            type : String,
            enum : ["PENDING" , "ACCEPTED" , "REJECTED"],
            default : "PENDING"
        }
    },
    {timestamps : true}
);

// Prevent duplicate interests
interestSchema.index(
  { fromUserId: 1, toUserId: 1 },
  { unique: true }
);

module.exports = mongoose.model("Interest" , interestSchema);
const Interest = require("./interest.model");

const sendInterest = async (req, res) => {

  const fromUserId = req.user.userId;
  const { toUserId } = req.body;

  if (fromUserId === toUserId) {
    return res.status(400).json({ message: "Cannot Send Interest to Yourself" });
  }


  const interest = await Interest.create({
    fromUserId,
    toUserId
  });

  await Profile.updateOne(
    { userId: toUserId },
    { $inc: { "analytics.interestsReceived": 1 } }
  );
  res.status(200).json({ message: "Interest sent", interest });
};


const respondToInterest = async (req, res) => {
  const userId = req.user.userId;
  const { interestId, action } = req.body; // Accept/Reject

  const interest = await Interest.findById(interestId);

  if (!interest) {
    return res.status(404).json({ message: "Interest not found" });
  }

  if (interest.toUserId.toString() !== userId) {
    return res.status(403).json({ message: "Not authorized" });
  }

  interest.status = action === "ACCEPT" ? "ACCEPTED" : "REJECTED";
  await interest.save();

  if (action === "ACCEPT") {
    await Profile.updateOne(
      { userId: interest.toUserId },
      { $inc: { "analytics.interestsAccepted": 1 } }
    );
  }

  res.json({ message: `Interest ${interest.status.toLowerCase()}` });

}

const getMyInterests = async (req, res) => {
  const userId = req.user.userId;

  const interests = await Interest.find({
    $or: [{ fromUserId: userId }, { toUserId: userId }]
  });

  res.json(interests);
};

module.exports = {
  sendInterest,
  respondToInterest,
  getMyInterests
};
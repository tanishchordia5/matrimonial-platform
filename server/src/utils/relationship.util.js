const Interest = require("../modules/interests/interest.model");

const getRelationshipStatus = async (viewerId, profileUserId) => {
  if (viewerId === profileUserId) return "SELF";

  const interest = await Interest.findOne({
    $or: [
      { fromUserId: viewerId, toUserId: profileUserId },
      { fromUserId: profileUserId, toUserId: viewerId }
    ]
  });

  if (!interest) return "NO_RELATION";

  if (interest.status === "ACCEPTED") return "MATCHED";

  if (interest.fromUserId.toString() === viewerId) {
    return "INTEREST_SENT";
  }

  return "INTEREST_RECEIVED";
};

module.exports = { getRelationshipStatus };

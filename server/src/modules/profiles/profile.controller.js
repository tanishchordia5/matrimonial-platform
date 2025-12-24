const Profile = require("./profile.model");
const { getRelationshipStatus } = require("../../utils/relationship.util");
const { applyPrivacyRules } = require("../../utils/profilePrivacy.util");

const createOrUpdateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.userId },
      { ...req.body, userId: req.user.userId },
      { upsert: true, new: true }
    );

    res.json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMyProfile = async (req, res) => {
  const profile = await Profile.findOne({ userId: req.user.userId });
  res.json(profile);
};

const viewProfile = async (req, res) => {
  const viewerId = req.user.userId;
  const profileUserId = req.params.userId;

  const profile = await Profile.findOne({ userId: profileUserId });

  if (!profile) {
    return res.status(404).json({ message: "Profile not found" });
  }

  const relationship = await getRelationshipStatus(viewerId, profileUserId);

  const safeProfile = applyPrivacyRules(profile.toObject(), relationship);

  res.json({
    relationship,
    profile: safeProfile
  });
};

module.exports = { createOrUpdateProfile, getMyProfile , viewProfile };

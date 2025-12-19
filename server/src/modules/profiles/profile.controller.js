const Profile = require("./profile.model");

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

module.exports = { createOrUpdateProfile, getMyProfile };

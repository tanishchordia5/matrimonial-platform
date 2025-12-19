const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    basicDetails: {
      fullName: String,
      gender: { type: String, enum: ["MALE", "FEMALE"] },
      dateOfBirth: Date,
      height: Number,
      maritalStatus: String
    },

    education: {
      degree: String,
      profession: String,
      company: String
    },

    family: {
      fatherName: String,
      motherName: String,
      siblings: Number
    },

    lifestyle: {
      diet: String,
      smoking: Boolean,
      drinking: Boolean
    },

    preferences: {
      minAge: Number,
      maxAge: Number,
      religion: String,
      location: String
    },

    visibilitySettings: {
      showPhotos: { type: Boolean, default: true },
      showContact: { type: Boolean, default: false }
    },

    completionPercentage: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);

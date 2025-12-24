const applyPrivacyRules = (profile, relationship) => {
  const result = JSON.parse(JSON.stringify(profile));

  // Always allow own profile
  if (relationship === "SELF") return result;

  // Hide contact details
  if (
    profile.visibilitySettings.showContactAfterMatch &&
    relationship !== "MATCHED"
  ) {
    delete result.basicDetails.phone;
    delete result.basicDetails.email;
  }

  // Hide family details
  if (
    profile.visibilitySettings.showFamilyDetailsAfterMatch &&
    relationship !== "MATCHED"
  ) {
    delete result.family;
  }

  // Hide photos
  if (
    profile.visibilitySettings.showPhotosToMatchesOnly &&
    relationship !== "MATCHED"
  ) {
    delete result.photos;
  }

  return result;
};

module.exports = { applyPrivacyRules };

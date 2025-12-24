const profile = require("../profiles/profile.model");

const findMatches = async (currentUserProfile) => {
    const {preferences} = currentUserProfile;

    const pipeline = [
    // exclude own profile
        {
            $match : {
                userId : {$ne : currentUserProfile.userId}
            }
        },

        //age calculation
        {
            $addFields : {
                age : {
                    $dateDiff : {
                        startDate: "$basicDetails.dateOfBirth",
                        endDate: "$$NOW",
                        unit : "year"
                    }
                }
            }
        },

        // hard Filters 
        {
            $match : {
                age : {
                    $gte : preferences.minAge,
                    $lte : preferences.maxAge
                },
                "preferences.location":preferences.location
            }
        },

        // Scoring logic
        {
            $addFields: {
                matchScore: {
                $add: [
                    { $cond: [{ $eq: ["$education.degree", preferences.degree] }, 20, 0] },
                    { $cond: [{ $eq: ["$lifestyle.diet", preferences.diet] }, 10, 0] }
                ]
                }
            }
        },

        // Sort by score
        {
            $sort: { matchScore: -1 }
        },

        // Limit results
        {
            $limit: 20
        } 
    ];

    return profile.aggregate(pipeline);
};

module.exports = { findMatches };


const Profile = require("../profiles/profile.model");
const matchService = require("./match.service");

const searchMatches = async(req,res) => {
    const myProfile = await Profile.findOne({userId : req.user.userId});
    
    if(!myProfile){
        return res.status(400).json({message : "Profile Not Completed"});
    }
    
    const matches = await matchService.findMatches(myProfile);
    console.log("HI",matches);
    res.json(matches)
};

module.exports = {searchMatches};
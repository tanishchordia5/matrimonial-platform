const express = require("express");
const router = express.Router();
const controller = require("./interest.controller");
const auth = require("../../middlewares/auth.middleware");


router.post("/send",auth,controller.sendInterest);
router.post("/respond",auth,controller.respondToInterest);
router.post("/my",auth,controller.getMyInterests);

module.exports = router;
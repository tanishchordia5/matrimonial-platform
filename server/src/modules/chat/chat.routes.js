const express = require("express");
const router = express.Router();
const controller = require("./chat.controller");
const auth = require("../../middlewares/socketAuth.middleware");

router.get("/:matchId", auth, controller.getChatByMatch);

module.exports = router;

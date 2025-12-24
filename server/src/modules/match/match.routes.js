const express = require("express");
const router = express.Router();
const controller = require("./match.controller");
const auth = require("../../middlewares/auth.middleware");

router.get("/search", auth, controller.searchMatches);

module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("./profile.controller");
const auth = require("../../middlewares/auth.middleware");

router.post("/", auth, controller.createOrUpdateProfile);
router.get("/me", auth, controller.getMyProfile);
router.get("/:userId", auth, controller.viewProfile);

module.exports = router;

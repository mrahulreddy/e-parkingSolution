const express = require("express");
const { registerUser, authUser } = require("../controllers/userController");
const { addPlace } = require("../controllers/placeController");
const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/addplaces").post(addPlace);

module.exports = router;

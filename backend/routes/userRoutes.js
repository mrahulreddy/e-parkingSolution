const express = require("express");
const {
  registerUser,
  authUser,
  getUsers,
} = require("../controllers/userController");
const { addPlace, getPlaces } = require("../controllers/placeController");
const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/getusers").get(getUsers);
router.route("/addplaces").post(addPlace);
router.route("/getplaces").get(getPlaces);

module.exports = router;

const express = require("express");
const {
  registerUser,
  authUser,
  getUsers,
  addAdmin,
  addOwner,
  validateUser,
  removeAdmin,
  removeOwner,
  requestOwner,
} = require("../controllers/userController");
const {
  addPlace,
  getPlaces,
  updateNbs,
} = require("../controllers/placeController");
const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/getusers").get(getUsers);
router.route("/addplaces").post(addPlace);
router.route("/getplaces").get(getPlaces);
router.route("/updatebook").put(updateNbs);
router.route("/addadmin").put(addAdmin);
router.route("/addowner").put(addOwner);
router.route("/removeAdmin").put(removeAdmin);
router.route("/removeOwner").put(removeOwner);
router.route("/requestOwner").put(requestOwner);
router.route("/validate").put(validateUser);

module.exports = router;

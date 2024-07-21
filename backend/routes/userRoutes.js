const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,

} = require("../controllers/userControllers.js");

const { protect } = require("../middleware/authMiddleware.js");
const { getS3SignedURL,
  getProfileImageFromS3 } = require("../utils/s3Service.js")
const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);
router.get("/presignedurl", getS3SignedURL);
router.get("/profile/image", getProfileImageFromS3);

module.exports = router;

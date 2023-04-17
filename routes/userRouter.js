const express = require("express");
const router = express.Router();
const {
  registerUser,
  updateUserInfo,
  loginUser,
  getUserDetails,
} = require("../controllers/userController");
const { authCheck } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.put("/:id", updateUserInfo, authCheck);
router.post("/login", loginUser);
router.get("/info", authCheck, getUserDetails )
module.exports = router;

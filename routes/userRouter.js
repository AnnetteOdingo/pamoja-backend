const express = require("express");
const router = express.Router();
const {
  registerUser,
  updateUserInfo,
  loginUser,
} = require("../controllers/userController");
const { authCheck } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.put("/:id", updateUserInfo, authCheck);
router.post("/login", loginUser);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getBugs,
  setBug,
  updateBug,
  deleteBug,
  addComment,
} = require("../controllers/bugController");
const { authCheck } = require("../middleware/authMiddleware");

router.get("/", authCheck, getBugs);
router.post("/", authCheck, setBug);
router.put("/:id", authCheck, updateBug);
router.put("/:id", authCheck, updateBug);
router.put("/:id/comments", authCheck, addComment);
module.exports = router;

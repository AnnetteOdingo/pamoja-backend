const express = require("express");
const router = express.Router();
const {
  getBugs,
  setBug,
  updateBug,
  deleteBug,
} = require("../controllers/bugController");
const { authCheck } = require("../middleware/authMiddleware");

router.get("/", authCheck, getBugs);
router.post("/", authCheck, setBug);
router.put("/:id", authCheck, updateBug);
router.delete("/:id", authCheck, deleteBug);
module.exports = router;

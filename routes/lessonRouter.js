const express = require("express");
const router = express.Router();
const {
  getLessons,
  setLesson,
  updateLesson,
  deleteLesson,
} = require("../controllers/lessonController");
const { authCheck } = require("../middleware/authMiddleware");

router.get("/", authCheck, getLessons);
router.post("/", authCheck, setLesson);
router.put("/:id", authCheck, updateLesson);
router.delete("/:id", authCheck, deleteLesson);
module.exports = router;

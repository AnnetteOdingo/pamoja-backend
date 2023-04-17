const express = require("express");
const router = express.Router();
const {
  getLessons,
  setLesson,
  updateLesson,
  deleteLesson,
  teachLesson,
  takeLesson,
} = require("../controllers/lessonController");
const { authCheck } = require("../middleware/authMiddleware");

router.get("/", authCheck, getLessons);
router.post("/", authCheck, setLesson);
router.put("/:id", authCheck, updateLesson);
router.put("/teach/:id", authCheck, teachLesson);
router.put("/attend/:id", authCheck, takeLesson);
router.delete("/:id", authCheck, deleteLesson);
module.exports = router;

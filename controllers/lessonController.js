const Lesson = require("../models/lessonModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const getLessons = asyncHandler(async (req, res) => {
  const lessons = await Lesson.find();
  res.status(200).json(lessons);
});

const setLesson = asyncHandler(async (req, res) => {
  const { topic, course } = req.body;
  if (!topic || !course) {
    res.status(400);
    throw new Error("Please add new fields");
  }
  const lesson = await Lesson.create({
    topic,
    course,
    user: req.user.id,
  });
  res.status(200).json(lesson);
});
const deleteLesson = asyncHandler(async (req, res) => {
    const lesson = await Lesson.findById(req.params.id);
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(401);
      throw new Error("User not found!");
    }
    if (lesson.user.toString() !== user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    if (!lesson) {
      res.status(400);
      throw new Error("Lesson not found");
    }
    await lesson.remove();
    res.status(200).json({ id: req.params });
  });
  const updateLesson = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    const lesson = await Lesson.findById(req.params.id);
    if (!user) {
      res.status(401);
      throw new Error("User not found!");
    }
  //   if (lesson.user.toString() !== user.id) {
  //     res.status(401);
  //     throw new Error("User not authorized");
  //   }
  
    if (!lesson) {
      res.status(400);
      throw new Error("Lesson not found");
    }
    const updatedLesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedLesson);
  });
  
  module.exports = {getLessons, setLesson, updateLesson, deleteLesson}
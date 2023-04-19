const Lesson = require("../models/lessonModel");
const User = require("../models/userModel");
const Comment = require("../models/commentModel");
const asyncHandler = require("express-async-handler");

const getLessons = asyncHandler(async (req, res) => {
  const lessons = await Lesson.find().populate("comments");
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
  if (!lesson) {
    res.status(400);
    throw new Error("Lesson not found");
  }
  if (lesson.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
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

  if (!lesson) {
    res.status(400);
    throw new Error("Lesson not found");
  }
  const updatedLesson = await Lesson.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedLesson);
});
const teachLesson = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const lesson = await Lesson.findById(req.params.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }
  if (!lesson) {
    res.status(400);
    throw new Error("Lesson not found");
  }
  if (lesson.user.toString() == user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  if (lesson.teachId.length > 2 || lesson.teachId) {
    res.status(401);
    throw new Error("Sorry lesson has already been taught!");
  }

  await Lesson.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ data: "lesson taught successfully" });
});
const takeLesson = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const lesson = await Lesson.findById(req.params.id);
  const teacher = await User.findById(lesson.teachId);
  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  if (!lesson) {
    res.status(400);
    throw new Error("Lesson not found");
  }

  if (!teacher) {
    res.status(401);
    throw new Error("Teacher not found!");
  }
  if (user.credits < 30) {
    res.status(401);
    throw new Error("Sorry you don't have enough credits!");
  }
  teacher.credits += 30;
  user.credits -= 30;

  await User.findByIdAndUpdate(req.user.id, user, {
    new: true,
  });
  await User.findByIdAndUpdate(Lesson.teachId, teacher, {
    new: true,
  });
  await Lesson.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({ data: "Lesson was successful" });
});
const addComment = asyncHandler(async (req, res) => {
  const lesson = await Lesson.findById(req.params.id).populate("comments");
  const poster = await User.findById(req.params.body)
  const comment = new Comment({
    comment: req.body.comment,
    userAvatar: poster.avatarUrl,
    username: poster.name
  });
  lesson.comments.push(comment);
  await comment.save();
  await lesson.save();
  res.status(201).send(comment);
});

module.exports = {
  getLessons,
  setLesson,
  updateLesson,
  deleteLesson,
  takeLesson,
  teachLesson,
  addComment,
};

const Book = require("../models/bookModel");
const User = require("../models/userModel");
const Comment = require("../models/commentModel");
const asyncHandler = require("express-async-handler");

const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find().populate("comments");
  res.status(200).json(books);
});
const setBook = asyncHandler(async (req, res) => {
  const { title, description, author, edition, location } = req.body;
  if (!title || !description || !author || !edition || !location) {
    res.status(400);
    throw new Error("Please add new fields");
  }
  const book = await Book.create({
    title,
    description,
    author,
    edition,
    location,
    user: req.user.id,
  });
  res.status(200).json(book);
});
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }
  if (book.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  if (!book) {
    res.status(400);
    throw new Error("Book not found");
  }
  await book.remove();
  res.status(200).json({ id: req.params });
});
const updateBook = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const book = await Book.findById(req.params.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  if (!book) {
    res.status(400);
    throw new Error("Book not found");
  }
  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedBook);
});
const purchaseBook = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const book = await Book.findById(req.params.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }
  if (book.user.toString() == user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  if (!book) {
    res.status(400);
    throw new Error("Book not found");
  }
  if (book.purchaseId.length > 2 || book.purchaseId) {
    res.status(401);
    throw new Error("Sorry book has already been purchased!");
  }
  if (user.credits < 50) {
    res.status(401);
    throw new Error("Sorry you don't have enough credits!");
  }
  await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ data: "book purchase successful" });
});
const giveBook = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const book = await Book.findById(req.params.id);
  const buyer = await User.findById(book.purchaseId);
  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  if (!book) {
    res.status(400);
    throw new Error("Book not found");
  }

  if (!buyer) {
    res.status(401);
    throw new Error("Buyer not found!");
  }
  user.credits += 50;
  buyer.credits -= 50;

  
  await User.findByIdAndUpdate(req.user.id, user, {
    new: true,
  });
  await User.findByIdAndUpdate(book.purchaseId, buyer, {
    new: true,
  });
  await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  
  res.status(200).json({ data: "book exchange successful" });
});
const addComment = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id).populate("comments");
  const comment = new Comment({
    comment: req.body.comment,
    postedBy: req.body.userId,
  });
  book.comments.push(comment);
  await comment.save();
  await book.save();
  res.status(201).send(comment);
});
module.exports = {
  getBooks,
  setBook,
  updateBook,
  deleteBook,
  purchaseBook,
  giveBook,
  addComment,
};

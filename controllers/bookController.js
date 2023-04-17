const Book = require("../models/bookModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find();
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
  console.log("updating book");
  const user = await User.findById(req.user.id);
  const book = await Book.findById(req.params.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }
  //   if (book.user.toString() !== user.id) {
  //     res.status(401);
  //     throw new Error("User not authorized");
  //   }

  if (!book) {
    res.status(400);
    throw new Error("Book not found");
  }
  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedBook);
});


module.exports = { getBooks, setBook, updateBook, deleteBook };

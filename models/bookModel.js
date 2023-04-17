const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add a book title"],
    },
    description: {
      type: String,
      required: [true, "Please add a book description"],
    },
    location: {
        type: String,
        required: [true, "Please add a pickup location"],
      },
    photo: {
      type: String,
      default: 'https://static.vecteezy.com/system/resources/previews/000/541/091/large_2x/green-book-on-white-background-vector.jpg',
    },
    author: {
      type: String,
      required: [true, "Please add author"],
    },
    edition: {
      type: String,
      required: [true, "Please add book edition"],
    },
    comments: {
      type: [String],
      default: [],
    },
    tags: {
        type: [String],
        default: [],
      },
    isEchanged: {
      type: String,
      default: 'false',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);

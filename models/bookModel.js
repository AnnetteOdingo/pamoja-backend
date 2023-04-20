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
    },
    author: {
      type: String,
      required: [true, "Please add author"],
    },
    edition: {
      type: String,
      required: [true, "Please add book edition"],
    },
    // comments: {
    //   type: [String],
    //   default: [],
    // },
    tags: {
      type: [String],
      default: [],
    },
    purchaseId: {
      type: String,
    },
    isExchanged: {
      type: Boolean,
      default: "false",
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);

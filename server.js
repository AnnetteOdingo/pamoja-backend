const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const cors = require('cors');

const port = process.env.PORT;
connectDB();
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/users", require("./routes/userRouter"));
app.use("/api/bugs", require("./routes/bugRouter"));
app.use("/api/lessons", require("./routes/lessonRouter"));
app.use("/api/books", require("./routes/bookRouter"));
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
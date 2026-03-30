const express = require("express");
const morgan = require("morgan");

const AppError = require("./utils/AppError");
const globalError = require("./middleware/globalError");

const bookRouter = require("./routers/bookRoute");
const userRouter = require("./routers/userRoute");

const app = express();

app.use(express.json());
// load  with the application middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/books", bookRouter);
app.use("/api/v1/users", userRouter);

//how to handle the unknown routes
app.use("/{*any}/", (req, res, next) => {
  // res.status(404).json({
  //   status: "Fail",
  //   message: `cannot found ${req.originalUrl} on the server `,
  // });
  // const err = new Error(`cannot found ${req.originalUrl} on the server `);
  // err.status = "Fail";
  // err.statusCode = 404;
  // next(err);
  next(new AppError(`cannot found ${req.originalUrl} on the server `, 404));
});

// error handling middleware
app.use(globalError);

module.exports = app;

// morgan  --> third party middleware

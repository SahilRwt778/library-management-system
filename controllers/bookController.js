const Book = require("../models/bookModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.createBook = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const newBook = await Book.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      newBook,
    },
  });
});

exports.getBooks = catchAsync(async (req, res, next) => {
  const books = await Book.find();
  res.status(200).json({
    status: "success",
    booklength: books.length,
    data: {
      books,
    },
  });
});

exports.getBook = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const book = await Book.findById(id);
  if (!book) {
    return next(new AppError(`Book not found with this Id`, 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      book,
    },
  });
});

// update book

exports.updateBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return next(new AppError(`Book not found with this Id`, 404));
  }
  Object.assign(book, req.body);
  
  await book.save();

  res.status(200).json({
    status: "success",
    data: {
      book,
    },
  });
});
// delete the book
exports.deleteBook = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const book = await Book.findByIdAndDelete(id);
  if (!book) {
    return next(new AppError(`Book not found with this Id`, 404));
  }
  res.status(204).json({
    status: "success",
  });
});

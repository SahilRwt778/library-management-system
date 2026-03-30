const { Schema, model, disconnect } = require("mongoose");

const bookSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please enter the title"],
    trim: true,
    lowercase: true,
    minLength: [6, "Title should be gretter than equals to 6"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Please enter the description"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Please enter the Price"],
    min: 0,
  },
  discount: {
    type: Number,
    // custom validation use only normal fn✅ ,  do not use  ()=>{}❌ create , .save()
    //    discount < price

    validate: {
      validator: function (discountValue) {
        // console.log(this);
        return discountValue < this.price;
        // 159 <700
      },
      message: "discount {VALUE} must be less than price",
    },
  },
  authorNames: {
    type: [String],
  },
  gener: {
    type: String,
    required: true,
    enum: {
      values: [
        "fantasy",
        "science_fiction",
        "mystery",
        "romance",
        "horror",
        "historical_fiction",
        "self_help",
        "biography",
      ],
      message: "Genre `{VALUE}` is not supported",
    },
  },
  publishedData: {
    type: Date,
  },
  isAvaliable: {
    type: Boolean,
    default: true,
  },
  stock: {
    type: Number,
    min: 0,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

const Book = model("books", bookSchema);

module.exports = Book;

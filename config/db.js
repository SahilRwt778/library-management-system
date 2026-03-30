const mongoose = require("mongoose");

const mongodb_url = process.env.MONGODB_URL;
const connectDB = async () => {
  await mongoose.connect(mongodb_url);
  console.log("connected to mongodb server");
};

module.exports = connectDB;

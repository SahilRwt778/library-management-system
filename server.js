// top import the dotenv
require("dotenv").config({
  path: `./config.${process.env.NODE_ENV}.env`,
  quiet: true,
});

const app = require("./app");
const connectDB = require("./config/db");

console.log(process.env.NODE_ENV, process.env.PORT);

connectDB();
const port = process.env.PORT;
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`server is running http://localhost:${port}`);
});

//? stages
//todo--- development , testing(qa) , preProduction , production
//         3000      ,   3001      , 5000        , 3002
//         dev       ,  test      , preDB       , DB+

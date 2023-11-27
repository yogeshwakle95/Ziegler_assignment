const mongoose = require("mongoose");
const path = require('path');
require('dotenv').config({path: __dirname + '/config.env'})

// console.log(process.env.MONGO_URI);
// const MONGO_URI =
//   "mongodb+srv://yogeshwakle99:yogeshwakle99@cluster0.hjn8k40.mongodb.net/Ecomm";

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connect to MongooDB....");
  })
  .catch((err) => {
    console.log(err);
  });

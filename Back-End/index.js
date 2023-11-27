// Require the NPM packages that we need
const path = require("path");
const cors = require('cors');

const express = require("express");
const app = express();
require("dotenv").config(); // access environment variables

const db = require("./config/database"); // Connect to Database
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const globalError = require("./middlewares/errorMiddleware");
const APIError = require("./utils/APIError");

// Routes

const categoryRouters = require("./router/category");
const productRouters = require("./router/products");
const subCategoryRouters = require("./router/subcategory");
const brandRouters = require("./router/brand");

const orderRouters = require("./router/order");
const featuredRouters = require("./router/featured");
const userRouters = require("./router/user");
const messageRoute = require("./router/messages");
const paymentRoute = require("./router/payment");

app.use(cors());
// Middleware
app.use(bodyParser.json({limit:'50mb'}));
  
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Static File
app.use(express.static(path.join(__dirname, "uploads")));

//Parse Cookie header
app.use(cookieParser());

// Routes Middlware

app.use("/api/users",userRouters);
app.use("/api/categories", categoryRouters);
app.use("/api/products", productRouters);
app.use("/api/subcategories", subCategoryRouters);
app.use("/api/brands", brandRouters);

app.use("/api/orders", orderRouters);
app.use("/api/featured",featuredRouters);
app.use("/api/message",messageRoute);
app.use("/api/payment",paymentRoute);





// Set a default environment port or cutom port - 3000
const PORT = process.env.PORT || 8000;

// Start out application
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

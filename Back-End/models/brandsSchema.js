const mongoose = require("mongoose");
require("dotenv").config();

// Create Schema
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand required"],
      unique: [true, "Brand must be unique"],
      minlength: [3, "Too short brand name"],
      maxlength: [32, "Too long brand name"],
    }
   
});

// Create model
const BrandModel = mongoose.model("Brand", brandSchema);
module.exports = BrandModel;

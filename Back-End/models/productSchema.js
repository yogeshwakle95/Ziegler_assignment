const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
// Create Schema
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
   
    description: {
      type: String,
      required: true,
      minlength: 20,
    },
    quantity: {
      type: Number,
      required: true,
    },
   
    price: {
      type: Number,
      required: true,
      trim: true,
      max: 200000,
    },
    priceAfterDiscount: {
      type: Number,
    },
   
    image: {
      type:String,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      require: true,
    },
    subcategories:
    //  [
      {
        type: mongoose.Schema.ObjectId,
        ref: "SubCategory",
      },
    // ],
    brand: {
      type: ObjectId,
      ref: "Brand",
    },
    Discount:{
      type:Number
    }
   
  }
  // ,
  // { timestamps: true }
);


// Create model
const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel;

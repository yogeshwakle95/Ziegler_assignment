const mongoose = require("mongoose");
require("dotenv").config();

// Create Schema
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type:mongoose.Schema.ObjectId,
      ref:'User',
      required: [true, "Order must be belong to user"],
    },
     product: {
          type: String
          // ref: "Product",
        },
        quantity: {
          type:Number
        },  
        price: 
        {
          type:Number
        },
        shippingdetails:
        {
          type: String
        } ,
      phone: {
        type: String
      },
      city: {
        type: String
      },
      postalCode: {
        type: String
      },
    totalOrderPrice: {
      type: Number
    },
    paymentMethodType: {
      type: String,
      enum: ["card", "cash"],
      default: "card",
    },
    isPaid: {
      type: Boolean,
      default: true,
    }
    
    
  },
 
);

// Create model
const orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel;

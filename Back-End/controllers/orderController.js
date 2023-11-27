const asyncHandler = require("express-async-handler");
const Order = require('../models/orderSchema');

exports.createCashOrder = asyncHandler(async (req, res, next) => {
 
});
// orderController.js




// Controller function for creating a new order
exports.createOrder = async (req, res) => {
  try {
    const { cartItems, shippingdetails, paymentMethodType, totalOrderPrice, userId, product,quantity,phone,city,isPaid,postalCode} = req.body;
    
    
    // Create the order
    const order = await Order.create({
      userId,
      cartItems,
      shippingdetails,
      totalOrderPrice,
      paymentMethodType,
      product,
      phone,
      quantity,
      city,
      postalCode,
      isPaid
    });

    // Return the created order in the response
    res.status(201).json({
      status: 'success',
      data: {
        order,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    // Assuming you have the user information available in req.user
    // const user = req.user._id; 

    // Fetch all orders for the current user
    const orders = await Order.find();

    // Return the orders in the response
    res.status(200).json({
      status: 'success',
      data: {
        orders,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};



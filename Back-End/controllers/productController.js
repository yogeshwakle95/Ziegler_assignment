const productModel = require("../models/productSchema");


const factory = require("../controllers/handlersFactory");


const ProductModel = require("../models/productSchema");


exports.createProduct = (req, res) => {
  const price = req.body.price;
  const priceAfterDiscount = req.body.priceAfterDiscount;
  
  // Calculate the discount as a decimal
  const discountDecimal = ((price - priceAfterDiscount) / price) * 100;

  // Round the discount to the nearest whole number
  const roundedDiscount = Math.round(discountDecimal);

  const product = new ProductModel({
    title: req.body.title,
    description: req.body.description,
    quantity: req.body.quantity,
    price: price,
    priceAfterDiscount: priceAfterDiscount,
    image: req.body.image,
    category: req.body.category,
    subcategories: req.body.subcategories,
    brand: req.body.brand,
    Discount: roundedDiscount, // Save the rounded discount as a whole number
  });

  product
    .save()
    .then((createdProduct) => {
      res.status(201).json(createdProduct);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.getProducts = async(req,res)=>{
  try {
    await productModel.find()
    .then((resp)=>{
      res.status(201).json(resp);
    }).catch((error)=>{
      res.status(501).json(error);
    })
  } catch (error) {
    res.status(501).json(error);
  }
}

exports.searchProducts = async (req, res) => {
  try {
    let keyword = req.params.key;
    let result = await productModel.find({
      title: { $regex: new RegExp(keyword, 'i') }, // Case-insensitive search for title
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(501).json(error);
  }
};


//  @desc Create a product
// exports.createProduct = factory.createOne(productModel);

//  @desc Update a product
exports.updateProduct = factory.updateOne(productModel, "product");

//  @desc Delete a product
exports.removeProduct = factory.deleteOne(productModel, "product");

//  @desc Get a single product
exports.getProduct = factory.getOne(productModel);

// ----------------------------------------------------------------------------------------------------------------------



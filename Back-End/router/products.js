const express = require("express");

//  Allow us to access parameters on other routers
const router = express.Router({ mergeParams: true });



const {
 
  getProducts,
  createProduct,
  getProduct,
  productById,
  removeProduct,
  updateProduct,
  searchProducts,
  
} = require("../controllers/productController");





// @desc Create a product
// @access Private/Admin
router.post(
  "/",
 
  createProduct
);

// @desc Update a product
// @access Private/Admin
router.put(
  "/:id",
 
  updateProduct
);

// @desc Delete a product
// @access Private/Admin
router.delete(
  "/:id",
  
  removeProduct
);

// @desc Get all products
// @access Public

// -------------------------------------------------------------------------------------------

router.get("/", getProducts);
router.get("/search/:key",searchProducts);

// --------------------------------------------------------------------------------------

// @desc  Get a single product
// @access Public
router.get("/:id/", getProduct);



module.exports = router;

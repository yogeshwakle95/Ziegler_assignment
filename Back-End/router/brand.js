const express = require("express");
const app = express();
const router = express.Router();



const {
  getBrand,
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
  brandById,
  uploadBrandImage,
  resizeImage,
} = require("../controllers/brandController");



// @desc Get List of Brands
// @access Public
router.get("/", getBrands);

// @desc Get specific Brand
// @access Public
// router.get("/:id", getSpecifiqueBrandValidator, getBrand);
router.get("/:id",getBrand);


//  @desc  Add new Brand
//  @access Private/Admin
router.post(
  "/",
 
  createBrand
);

// @desc Update specific Brand
// @access Private/Admin
router.put(
  "/:id",
 
  updateBrand
);

//  @desc Delete specific Brand
//  @access Private/Admin
router.delete(
  "/:id",
  
  deleteBrand
);

module.exports = router;

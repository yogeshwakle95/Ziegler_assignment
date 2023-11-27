const express = require("express");
const app = express();



// mergeParams: Allow us to access parameters on other routers
// We need to access categoryId from category router
const router = express.Router({ mergeParams: true });

const {
  getsubCategories,
  getsubCategory,
  createsubCategory,
  subCategoryById,
  updatesubCategory,
  deleteSubCategory,
  
} = require("../controllers/subcategoryController");



// @desc Create Subcategory
// @access Private/Admin
router.post(
  "/",
  
  createsubCategory
);

// @desc Update specific subCategory
// @access Private/Admin
router.put(
  "/:id",
  
  updatesubCategory
);

// @desc Delete specific subCategory
// @access Private/Admin
router.delete(
  "/:id",
  
  deleteSubCategory
);

// @desc Get List of subCategories
// @access Public
router.get("/", getsubCategories);

// @desc Get specific subCategory
router.get("/:subcategoryId", getsubCategory);

router.param("subcategoryId", subCategoryById);

module.exports = router;

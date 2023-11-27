const CategoryModel = require("../models/categorySchema");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const APIError = require("../utils/APIError");
const Joi = require("joi");

//  @desc Add new Category
exports.createCategory = (req, res) => {
  CategoryModel.create(req.body)
    .then((category) => {
      res.status(201).json(category);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

//  @desc Update specific Category
exports.updateCategory = (req, res) => {
  const { id } = req.params;
  req.body.slug = slugify(req.body.name);
  CategoryModel.findOneAndUpdate(
    { _id: id },
    req.body,
    { new: true },
    (err, result) => {
      if (err) {
        res.status(400).json({ err: "Something wrong when updating data!" });
      }
      res.json({ data: result, message: "Category updated" });
    }
  );
};

//  @desc Get specific Category
exports.getCategory = asyncHandler(async (req, res, next) => {
  const category = await CategoryModel.findById(req.params.id);
  if (!category) {
    return next(new APIError(`No category for this id ${req.params.id}`, 404));
  }
  res.send(category );
});

// @desc Get List of Categories
exports.allCategories = (req, res) => {
  

  CategoryModel.find()
   
    .exec((err, categories) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      }

      res.json(
        categories
      );
    });
};

// @desc Delete a category
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await CategoryModel.findByIdAndRemove(req.params.id);
  if (!category) {
    return next(new APIError(`No category for this id ${req.params.id}`, 404));
  }
  category.remove();
  res.status(204).json({});
});

//  @desc Get Category information Using Category ID
exports.categoryById = (req, res, next, id) => {
  CategoryModel.findById(id).exec((err, category) => {
    if (err || !category) {
     
      return next(new APIError(`No category for this id ${id}`, 404));
    }
    req.Category = category;
    next();
  });
};

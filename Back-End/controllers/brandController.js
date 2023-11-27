const brandModel = require("../models/brandsSchema");

const factory = require("./handlersFactory");



// @desc Add new Brand
exports.createBrand = factory.createOne(brandModel);

// @desc Get specific Brand
exports.getBrand = factory.getOne(brandModel);

// @desc Get List of Brands
exports.getBrands = factory.getAll(brandModel);

// @desc Update specific Brand
exports.updateBrand = factory.updateOne(brandModel, "Brand");

// @desc Delete specific Brand
exports.deleteBrand = factory.deleteOne(brandModel, "Brand");



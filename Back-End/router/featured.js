const route = require('express').Router();
const featuredController = require('../controllers/featuredController');

route.post('/',featuredController.createFeatured);
route.get('/',featuredController.getAllFeatured);
route.get('/:id',featuredController.getOneFeatured);
route.put('/:id',featuredController.UpdateFeatured);
route.delete('/:id',featuredController.deleteFeatured);

module.exports = route;
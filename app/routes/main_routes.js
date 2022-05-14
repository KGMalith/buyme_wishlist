let express = require('express');
let router = express.Router();

//Import Schemas
require('../models/index');


//Import Routing files
let wishlistRoutes = require('./wishlist_routes');

//Define Routing paths
router.use('/', wishlistRoutes);

module.exports = router;
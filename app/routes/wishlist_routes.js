const router = require('express').Router();
const { addItemValidation,removeItemValidation} = require('../validators/wishlist_validation');
const {checkToken} = require('../middleware/auth/tokenvalidation')
const wishlistController = require('../controllers/wishlist_controller');

router.post('/add-item',
    checkToken,
    addItemValidation,
    wishlistController.addItem
);

router.post('/remove-item',
    checkToken,
    removeItemValidation,
    wishlistController.removeItem
);

router.get('/get-all-items',
    checkToken,
    wishlistController.getAllItems
);

module.exports = router;

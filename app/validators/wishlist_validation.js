const {add_item,remove_item} = require('./wishlist_validation_schema');

module.exports = {
    addItemValidation: async (req, res, next) => {
        const respond = await add_item.validate(req.body);
        if (respond.error) {
            res.status(500).json({
                success: false,
                msg: respond.error.details[0].message,
                showMessage: true
            });
        } else {
            next();
        }
    },
    removeItemValidation: async (req, res, next) => {
        const respond = await remove_item.validate(req.body);
        if (respond.error) {
            res.status(500).json({
                success: false,
                msg: respond.error.details[0].message,
                showMessage: true
            });
        } else {
            next();
        }
    },
};
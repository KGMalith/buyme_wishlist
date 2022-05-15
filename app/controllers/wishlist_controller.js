const wishlistService = require('../services/wishlist_service');

module.exports.addItem = async (req, res) => {
    try {
        const serviceResponse = await wishlistService.addItem(req.body, req.user);
        return res.status(200).json({ success: true, msg: serviceResponse.msg, showMessage: false });
    } catch (err) {
        return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page' });
    }
};

module.exports.removeItem = async (req, res) => {
    try {
        const serviceResponse = await wishlistService.removeItem(req.body, req.user);
        return res.status(200).json({ success: true, msg: serviceResponse.msg, showMessage: true });
    } catch (err) {
        return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page' });
    }
};

module.exports.getAllItems = async (req, res) => {
    try {
        const serviceResponse = await wishlistService.getAllItems(req.user);
        return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });
    } catch (err) {
        return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page' });
    }
};


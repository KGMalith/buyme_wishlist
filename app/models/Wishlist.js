let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let WishlistSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    product: {
        _id: { type: String },
        title: { type: String },
        desc: { type: String },
        img: { type: String },
        size: { type: String },
        color: { type: String },
        price: { type: Number },
    },
});

module.exports = mongoose.model('Wishlist', WishlistSchema);
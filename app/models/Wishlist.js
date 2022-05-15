let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let WishlistSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    product: {
        product_id:{
            type: String,
        },
        product_name:{
            type: String,
        },
        product_image:{
            type: String,
        },
        price:{
            type: Number,
        }
    },
});

module.exports = mongoose.model('Wishlist', WishlistSchema);
let mongoose = require('mongoose');
let Wishlist = require('../models/Wishlist');


const BadRequestException = require('../middleware/exceptions/badRequestException');
const { GetProductDetailsEvent } = require('../middleware/events/events');

module.exports.addItem = async (requestBody,requestUser) => {

    //initiate session
    const session = await mongoose.startSession();
    //Start trasaction
    session.startTransaction();

    try {
        //check requested item already added
        let item = await Wishlist.find({ 'product.product_id': requestBody.product_id, user_id: requestUser.userID }).session(session);

        if(item.length > 0){
            throw new BadRequestException('Selected item already added to wishlist');
        }

        //get product details
        let payload = {
            event: 'GET_PRODUCT',
            data:{
                product_id: requestBody.product_id
            }
            
        };

        let productObj = null;
        let product_respond =  await GetProductDetailsEvent(payload);
        if (product_respond.status == 200){
            productObj = product_respond.data.data
        }else{
            throw new BadRequestException('Error occured in product module. Please try again later'); 
        }
        
        //create wishlist item
        await Wishlist.create({
            user_id: requestUser.userID,
            'product._id': productObj._id,
            'product.title': productObj.title,
            'product.desc': productObj.desc,
            'product.img': productObj.img,
            'product.categories': productObj.categories,
            'product.size': productObj.size,
            'product.color': productObj.color,
            'product.price': productObj.price,
        });


        //commit the transaction 
        await session.commitTransaction();
        return {
            msg: 'Item added to wishlist'
        };

    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        session.endSession();
    }
};

module.exports.removeItem = async (requestBody, requestUser) => {

    // eslint-disable-next-line no-useless-catch
    try {
        
        //check requested item already exists
        let item = await Wishlist.findById(requestBody.wishlist_id);

        if (!item) {
            throw new BadRequestException('Selected item not in wishlist');
        }

        //delete item
        await Wishlist.findByIdAndDelete(requestBody.wishlist_id);
       

        return {
            msg: 'Item removed from wshlist'
        };

    } catch (err) {
        throw err;
    }
};

module.exports.getAllItems = async (requestUser) => {

// eslint-disable-next-line no-useless-catch
    try {

        //get all wishlist items
        let item_list = await Wishlist.find({ user_id: requestUser.userID });
        
        return {
            msg: 'Wishlist items generated',
            data: item_list
        };

    } catch (err) {
        throw err;
    }
};
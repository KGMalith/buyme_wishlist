const Joi = require('joi');

const schema = {
    add_item: Joi.object({
        product_id: Joi.string().trim().required(),
    }),
    remove_item: Joi.object({
        product_id: Joi.string().trim().required(),
    }),
};

module.exports = schema;
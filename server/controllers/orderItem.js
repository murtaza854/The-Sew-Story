const OrderItem = require('../models').orderItem;

module.exports = {
    create(params) {
        return OrderItem.create({
            product_id: params.product_id,
            order_id: params.order_id,
            quantity: params.quantity,
            price_id: params.price_id
        });
    },
};
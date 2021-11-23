const OrderItem = require('../models').orderItem;

module.exports = {
    create(params) {
        return OrderItem.create({
            product_id: params.product_id,
            order_id: params.order_id,
            quantity: params.quantity,
            price_per_unit: params.price_per_unit
        })
        .then(function (data) {
            return data;
        })
    },
};
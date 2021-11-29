const OrderCoupon = require('../models').orderCoupon;

module.exports = {
    create(params) {
        return OrderCoupon.create({
            order_id: params.order_id,
            coupon_id: params.coupon_id,
        })
            .then(function (data) {
                return data;
            });
    },
};
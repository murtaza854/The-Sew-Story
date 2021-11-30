const ProductCoupon = require('../models').productCoupon;

module.exports = {
    create(params) {
        console.log('create', params);
        return ProductCoupon.create({
            product_id: params.product_id,
            coupon_id: params.coupon_id,
        }).then(productCoupon => {
            return productCoupon;
        });
    },
};
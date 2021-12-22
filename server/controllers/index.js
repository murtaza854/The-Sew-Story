const user = require('./user');
const state = require('./state');
const city = require('./city');
const category = require('./category');
const product = require('./product');
const type = require('./type');
const image = require('./image');
const detail = require('./detail');
const price = require('./price');
const order = require('./order');
const orderItem = require('./orderItem');
const subscribe = require('./subscribe');
const coupon = require('./coupon');
const promotionCode = require('./promotionCode');
const orderCoupon = require('./orderCoupon');
const productCoupon = require('./productCoupon');
const shippingRate = require('./shippingRate');

module.exports = {
    user,
    state,
    city,
    category,
    product,
    type,
    image,
    detail,
    price,
    order,
    orderItem,
    subscribe,
    coupon,
    promotionCode,
    orderCoupon,
    productCoupon,
    shippingRate
};
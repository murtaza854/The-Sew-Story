const Coupon = require('../models').coupon;
const promotionCode = require('../models').promotionCode;
const ProductCoupon = require('../models').productCoupon;
const Product = require('../models').product;

module.exports = {
    create(params) {
        return Coupon.create({
            id: params.id,
            name: params.name,
            type: params.type,
            amountOff: params.amountOff,
            percentOff: params.percentOff,
            redeemBy: params.redeemBy,
            maxRedemptions: params.maxRedemptions,
            appliedToProducts: params.appliedToProducts,
            hasPromotionCodes: params.hasPromotionCodes,
        })
            .then(function (data) {
                return data;
            });
    },
    getAll() {
        return Coupon.findAll({
            attributes: ['id', 'name', 'type', 'amountOff', 'percentOff', 'redeemBy', 'maxRedemptions', 'appliedToProducts', 'hasPromotionCodes'],
        })
            .then(function (data) {
                return data;
            });
    },
    getAllPromotionFlag() {
        return Coupon.findAll({
            attributes: ['id', 'name', 'type', 'amountOff', 'percentOff', 'redeemBy', 'maxRedemptions', 'appliedToProducts', 'hasPromotionCodes'],
            where: {
                hasPromotionCodes: true,
            },
        })
            .then(function (data) {
                return data;
            });
    },
    getAllClient() {
        console.log('getAllClient');
        return Coupon.findAll({
            attributes: ['name', 'type', 'amountOff', 'percentOff', 'redeemBy', 'maxRedemptions', 'appliedToProducts', 'hasPromotionCodes'],
            where: {
                hasPromotionCodes: true,
            },
            include: [
                {
                    model: ProductCoupon,
                    attributes: ['id', 'product_id', 'coupon_id'],
                    as: 'productCoupons',
                    // include: [
                    //     {
                    //         model: Product,
                    //         attributes: ['slug'],
                    //         as: 'product',
                    //     },
                    // ],
                },
            ],
        })
            .then(function (data) {
                console.log(1, data);
                return data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    getById(id) {
        return Coupon.findOne({
            where: {
                id: id,
            },
            attributes: ['id', 'name', 'type', 'amountOff', 'percentOff', 'redeemBy', 'maxRedemptions', 'appliedToProducts', 'hasPromotionCodes'],
        })
            .then(function (data) {
                return data;
            });
    },
    update(params) {
        const updateValues = {},
            updateKeys = ['name', 'redeemBy', 'maxRedemptions', 'appliedToProducts', 'hasPromotionCodes'];
        updateKeys.forEach(key => {
            if (key in params) {
                updateValues[key] = params[key];
            }
        }
        );
        return Coupon.update(updateValues, {
            where: {
                id: params.id,
            },
        })
            .then(function (data) {
                return data;
            });
    },
};
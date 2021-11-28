const Coupon = require('../models').coupon;

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
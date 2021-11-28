const promotionCode = require('../models').promotionCode;

module.exports = {
    create(params) {
        return promotionCode.create({
            id: params.id,
            code: params.code,
            coupon_id: params.coupon_id,
            user_id: params.user_id,
            expiresAt: params.expiresAt,
            maxRedemptions: params.maxRedemptions,
            firstTimeTransaction: params.firstTimeTransaction,
            minAmount: params.minAmount
        })
            .then(function (data) {
                return data;
            });
    },
    getAll() {
        return promotionCode.findAll({
            attributes: ['id', 'code', 'coupon_id', 'user_id', 'expiresAt', 'maxRedemptions', 'firstTimeTransaction', 'minAmount', 'timesRedeeemed', 'active'],
        })
            .then(function (data) {
                return data;
            });
    },
    getById(id) {
        return promotionCode.findOne({
            where: {
                id: id,
            },
            attributes: ['id', 'code', 'coupon_id', 'user_id', 'expiresAt', 'maxRedemptions', 'firstTimeTransaction', 'minAmount', 'timesRedeeemed', 'active'],
        })
            .then(function (data) {
                return data;
            });
    },
    update(params) {
        const updateValues = {},
            updateKeys = ['active'];
        updateKeys.forEach(key => {
            if (key in params) {
                updateValues[key] = params[key];
            }
        });
        return promotionCode.update(updateValues, {
            where: {
                id: params.id,
            },
        })
            .then(function (data) {
                return data;
            });
    },
};
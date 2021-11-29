const promotionCode = require('../models').promotionCode;
const Coupon = require('../models').coupon;
const User = require('../models').user;

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
    getAllInclude() {
        return promotionCode.findAll({
            attributes: ['id', 'code', 'coupon_id', 'user_id', 'expiresAt', 'maxRedemptions', 'firstTimeTransaction', 'minAmount', 'timesRedeeemed', 'active'],
            include: [
                {
                    model: Coupon,
                    attributes: ['id', 'name', 'type', 'amountOff', 'percentOff', 'redeemBy', 'maxRedemptions', 'appliedToProducts', 'hasPromotionCodes'],
                    as: 'coupon'
                },
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName', 'email'],
                    as: 'user'
                }
            ],
        })
            .then(function (data) {
                return data;
            });
    },
    getByPromotionCode(code) {
        return promotionCode.findOne({
            where: {
                code: code,
            },
            attributes: ['id', 'code', 'coupon_id', 'user_id', 'expiresAt', 'maxRedemptions', 'firstTimeTransaction', 'minAmount', 'timesRedeeemed', 'active'],
            include: [
                {
                    model: Coupon,
                    attributes: ['id', 'name', 'type', 'amountOff', 'percentOff', 'redeemBy', 'maxRedemptions', 'appliedToProducts', 'hasPromotionCodes'],
                    as: 'coupon'
                },
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName', 'email'],
                    as: 'user'
                }
            ],
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
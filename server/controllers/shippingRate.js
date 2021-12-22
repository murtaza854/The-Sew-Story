const ShippingRate = require('../models').shippingRate;

module.exports = {
    create(params) {
        return ShippingRate.create({
            id: params.id,
            name: params.name,
            fixedAmount: params.price,
            taxBehavior: params.taxBehavior,
            deliveryEstimateMinUnit: params.deliveryEstimateMinUnit,
            deliveryEstimateMin: params.deliveryEstimateMin,
            deliveryEstimateMaxUnit: params.deliveryEstimateMaxUnit,
            deliveryEstimateMax: params.deliveryEstimateMax,
            active: params.active
        })
            .then(function (data) {
                return data;
            });
    },
    getAll() {
        return ShippingRate.findAll({
            attributes: ['id', 'name', 'fixedAmount', 'taxBehavior', 'deliveryEstimateMinUnit', 'deliveryEstimateMin', 'deliveryEstimateMaxUnit', 'deliveryEstimateMax', 'active']
        })
            .then(function (data) {
                return data;
            });
    },
    getAllClient() {
        return ShippingRate.findAll({
            attributes: ['id', 'name', 'fixedAmount', 'taxBehavior', 'deliveryEstimateMinUnit', 'deliveryEstimateMin', 'deliveryEstimateMaxUnit', 'deliveryEstimateMax', 'active'],
            where: {
                active: true
            }
        })
            .then(function (data) {
                return data;
            });
    },
    getAllID() {
        return ShippingRate.findAll({
            attributes: ['id'],
            where: {
                active: true
            },
            raw: true
        })
            .then(function (data) {
                return data;
            });
    },
};
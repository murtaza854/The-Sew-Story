const Order = require('../models').order;

module.exports = {
    create(params) {
        return Order.create({
            id: params.orderNumber,
            orderStatus: params.orderStatus,
            orderDate: params.orderDate,
            orderTotal: params.orderTotal,
            user_id: params.user_id,
            firstName: params.firstName,
            lastName: params.lastName,
            email: params.email,
            contactNumber: params.contactNumber,
            addressLine1: params.addressLine1,
            addressLine2: params.addressLine2,
            city_id: params.city_id,
            zipCode: params.zipCode,
            stripe_sessionID: params.stripe_sessionID,
        })
            .then(function (data) {
                return data;
            });
    },
    checkOrderNumber(params) {
        return Order.findOne({
            attributes: ['id'],
            where: {
                id: params.orderNumber
            }
        })
            .then(function (data) {
                return data;
            });
    },
};
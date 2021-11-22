const Order = require('../models').order;

module.exports = {
    create(params) {
        return Order.create({
            orderNumber: params.orderNumber,
            orderStatus: params.orderStatus,
            orderDate: params.orderDate,
            orderTotal: params.orderTotal,
            user_id: params.user_id,
            firstName: params.firstName,
            lastName: params.lastName,
            email: params.email,
            contactNumber: params.contactNumber,
            city_id: params.city_id,
            zipCode: params.zipCode,
        })
            .then(function (data) {
                return data;
            });
    },
    checkOrderNumber(params) {
        return Order.findOne({
            where: {
                orderNumber: params.orderNumber
            }
        })
            .then(function (data) {
                return data;
            });
    },
};
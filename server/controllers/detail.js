const Detail = require('../models').detail;

module.exports = {
    create(params) {
        return Detail.create({
            label: params.label,
            text: params.text,
            type_id: params.type_id,
            product_id: params.product_id
        })
            .then(function (data) {
                return data;
            });
    },
    getById(id) {
        return Detail.findOne({
            where: {
                id: id
            }
        })
            .then(function (data) {
                return data;
            });
    },
    getAll() {
        return Detail.findAll({
            attributes: ['id', 'label', 'text', 'type_id', 'product_id'],
        })
            .then(function (data) {
                return data;
            });
    },
    update(params) {
        const updateValues = {},
            updateKeys = ['label', 'text', 'type_id', 'product_id'];
        updateKeys.forEach(function (key) {
            if (params[key]) {
                updateValues[key] = params[key];
            }
        });
        return Detail.update(updateValues, {
            where: {
                id: params.id
            }
        }).then(function (data) {
            return data;
        });
    }
}
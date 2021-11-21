const Price = require('../models').price;

module.exports = {
    create(params) {
        return Price.create({
            id: params.id,
            amount: params.amount,
            product_id: params.product_id,
            active: params.active,
        })
            .then(function (data) {
                return data;
            })
    },
    getById(id) {
        return Price.findOne({
            where: {
                id: id
            },
            attributes: ['id', 'amount', 'product_id'],
            include: [
                {
                    model: require('../models').product,
                    attributes: ['id', 'name', 'slug', 'productCode', 'story', 'storyImageFileName', 'storyImagePath', 'storyWrittenBy', 'price', 'quantity', 'active', 'category_id'],
                    as: 'product'
                },
            ],
        })
            .then(function (data) {
                return data;
            });
    },
    findBySlug(params) {
        return Price.findOne({
            attributes: ['id', 'amount', 'product_id'],
            where: {
                slug: params.slug,
                active: true
            },
            raw: true
        })
            .then(function (data) {
                return data;
            });
    },
    getAll() {
        return Price.findAll({
            attributes: ['id', 'amount', 'product_id'],
            include: [
                {
                    model: require('../models').product,
                    attributes: ['id', 'name', 'slug', 'productCode', 'story', 'storyImageFileName', 'storyImagePath', 'storyWrittenBy', 'price', 'quantity', 'active', 'category_id'],
                    as: 'product'
                },
            ],
        })
            .then(function (data) {
                return data;
            });
    },
    checkIfAmountIsActive(params) {
        return Price.findOne({
            attributes: ['id', 'amount', 'product_id'],
            where: {
                product_id: params.product_id,
                active: true
            },
            raw: true
        })
            .then(function (data) {
                return data;
            });
    },
    update(params) {
        const updateValues = {},
            updateKeys = ['amount', 'product_id'];
        updateKeys.forEach(function (key) {
            if (key in params) {
                updateValues[key] = params[key];
            }
        });
        return Price.update(updateValues, {
            where: {
                id: params.id
            }
        }).then(function (data) {
            return data;
        });
    },
    updateProductActiveFalse(params) {
        return Price.update({
            active: false
        }, {
            where: {
                product_id: params.product_id
            }
        }).then(function (data) {
            return data;
        });
    },
}
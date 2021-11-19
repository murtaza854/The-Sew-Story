const Product = require('../models').product;

module.exports = {
    create(params) {
        return Product.create({
            name: params.name,
            slug: params.slug,
            productCode: params.productCode,
            story: params.story,
            storyImageFileName: params.storyImageFileName,
            storyImagePath: params.storyImagePath,
            storyWrittenBy: params.storyWrittenBy,
            price: params.price,
            quantity: params.quantity,
            active: params.active,
            category_id: params.category_id
        })
            .then(function (data) {
                return data;
            })
    },
    getById(id) {
        return Product.findOne({
            attributes: ['id', 'name', 'slug', 'productCode', 'story', 'storyImageFileName', 'storyImagePath', 'storyWrittenBy', 'price', 'quantity', 'active', 'category_id'],
            include: [
                {
                    model: require('../models').category,
                    attributes: ['id', 'name', 'slug', 'active'],
                    as: 'category'
                },
                {
                    model: require('../models').image,
                    attributes: ['id', 'fileName', 'path'],
                    as: 'images'
                },
                {
                    model: require('../models').detail,
                    attributes: ['id', 'label', 'text', 'type_id'],
                    as: 'details',
                    include: [
                        {
                            model: require('../models').type,
                            attributes: ['id', 'name'],
                            as: 'type'
                        }
                    ]
                }
            ],
            order: [
                [{ model: require('../models').detail, as: 'details' }, 'order', 'ASC']
            ]
        })
            .then(function (data) {
                return data;
            });
    },
    findBySlug(params) {
        return Product.findOne({
            attributes: ['id', 'name', 'slug', 'productCode', 'story', 'storyImageFileName', 'storyImagePath', 'storyWrittenBy', 'price', 'quantity', 'active', 'category_id'],
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
        return Product.findAll({
            attributes: ['id', 'name', 'slug', 'productCode', 'story', 'storyImageFileName', 'storyImagePath', 'storyWrittenBy', 'price', 'quantity', 'active', 'category_id'],
            include: [
                {
                    model: require('../models').category,
                    attributes: ['id', 'name', 'slug', 'active'],
                    as: 'category'
                },
                {
                    model: require('../models').image,
                    attributes: ['id', 'fileName', 'path'],
                    as: 'images'
                },
                {
                    model: require('../models').detail,
                    attributes: ['id', 'label', 'text', 'type_id'],
                    as: 'details',
                    include: [
                        {
                            model: require('../models').type,
                            attributes: ['id', 'name'],
                            as: 'type'
                        }
                    ]
                }
            ],
            order: [
                [{ model: require('../models').detail, as: 'details' }, 'order', 'ASC']
            ]
        })
            .then(function (data) {
                return data;
            });
    },
    update(params) {
        const updateValues = {},
            updateKeys = ['name', 'slug', 'productCode', 'story', 'storyImageFileName', 'storyImagePath', 'storyWrittenBy', 'price', 'quantity', 'active', 'category_id'];
        updateKeys.forEach(function (key) {
            if (params[key]) {
                updateValues[key] = params[key];
            }
        });
        return Product.update(updateValues, {
            where: {
                id: params.id
            }
        }).then(function (data) {
            return data;
        });
    }
}
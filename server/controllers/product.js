const Product = require('../models').product;
const Category = require('../models').category;
const Image = require('../models').image;
const Price = require('../models').price;
const Detail = require('../models').detail;
const Type = require('../models').type;
const {
    Op
} = require('sequelize');

module.exports = {
    create(params) {
        return Product.create({
            name: params.name,
            slug: params.slug,
            shortDescription: params.shortDescription,
            productCode: params.productCode,
            story: params.story,
            storyImageFileName: params.storyImageFileName,
            storyImagePath: params.storyImagePath,
            storyWrittenBy: params.storyWrittenBy,
            quantity: params.quantity,
            active: params.active,
            category_id: params.category_id
        })
            .then(function (data) {
                return data;
            })
    },
    updateQuantity(id, quantity) {
        return Product.update({
            quantity: quantity
        }, {
            where: {
                id: id
            }
        }).then(function (data) {
            return data;
        })
    },
    getProducts(slugs) {
        return Product.findAll({
            include: [
                {
                    model: Image,
                    attributes: ['fileName', 'path'],
                    as: 'images'
                },
                {
                    model: Price,
                    attributes: ['amount', 'active'],
                    as: 'prices',
                    where: {
                        active: true
                    }
                },
                {
                    model: Detail,
                    attributes: ['label', 'text', 'order'],
                    as: 'details',
                    include: [
                        {
                            model: Type,
                            attributes: ['name'],
                            as: 'type',
                            where: {
                                name: 'Description'
                            }
                        }
                    ]
                }
            ],
            attributes: ['name', 'slug', 'quantity', 'active', 'shortDescription'],
            where: {
                slug: {
                    [Op.in]: slugs
                }
            },
            order: [
                [{ model: Detail, as: 'details' }, 'order', 'ASC']
            ]
        })
            .then(function (data) {
                return data;
            })
    },
    getProductsCartID(slugs) {
        return Product.findAll({
            include: [
                {
                    model: Price,
                    attributes: ['amount', 'active'],
                    as: 'prices',
                    where: {
                        active: true
                    }
                },
            ],
            attributes: ['id', 'name', 'slug', 'quantity', 'active'],
            where: {
                slug: {
                    [Op.in]: slugs
                }
            },
            raw: true
        })
            .then(function (data) {
                return data;
            })
    },
    getProductsCart(slugs) {
        return Product.findAll({
            include: [
                {
                    model: Price,
                    attributes: ['amount', 'active'],
                    as: 'prices',
                    where: {
                        active: true
                    }
                },
            ],
            attributes: ['name', 'slug', 'quantity', 'active'],
            where: {
                slug: {
                    [Op.in]: slugs
                }
            },
            raw: true
        })
            .then(function (data) {
                return data;
            })
    },
    getById(id) {
        return Product.findOne({
            where: {
                id: id
            },
            attributes: ['id', 'name', 'slug', 'productCode', 'story', 'storyImageFileName', 'storyImagePath', 'storyWrittenBy', 'quantity', 'active', 'category_id', 'shortDescription'],
            include: [
                {
                    model: Category,
                    attributes: ['id', 'name', 'slug', 'fileName', 'imagePath', 'comingSoon', 'active', 'homePage', 'ourStoryPage'],
                    as: 'category'
                },
                {
                    model: Image,
                    attributes: ['id', 'fileName', 'path'],
                    as: 'images'
                },
                {
                    model: Price,
                    attributes: ['id', 'amount', 'active'],
                    as: 'prices'
                },
                {
                    model: Detail,
                    attributes: ['id', 'label', 'text', 'type_id', 'order'],
                    as: 'details',
                    include: [
                        {
                            model: Type,
                            attributes: ['id', 'name'],
                            as: 'type'
                        }
                    ]
                }
            ],
        })
            .then(function (data) {
                return data;
            });
    },
    findBySlug(params) {
        return Product.findOne({
            attributes: ['id', 'name', 'slug', 'productCode', 'story', 'storyImageFileName', 'storyImagePath', 'storyWrittenBy', 'quantity', 'active', 'category_id', 'shortDescription'],
            where: {
                slug: params.slug,
                active: true
            },
            include: [
                {
                    model: Image,
                    attributes: ['id', 'fileName', 'path'],
                    as: 'images'
                },
                {
                    model: Price,
                    attributes: ['id', 'amount', 'active'],
                    as: 'prices'
                },
                {
                    model: Detail,
                    attributes: ['id', 'label', 'text', 'type_id'],
                    as: 'details',
                    include: [
                        {
                            model: Type,
                            attributes: ['id', 'name'],
                            as: 'type'
                        }
                    ]
                }
            ],
            raw: true
        })
            .then(function (data) {
                return data;
            });
    },
    findBySlugClient(params) {
        return Product.findOne({
            attributes: ['name', 'slug', 'productCode', 'story', 'storyImageFileName', 'storyImagePath', 'storyWrittenBy', 'quantity', 'active', 'shortDescription'],
            where: {
                slug: params.slug,
                active: true
            },
            include: [
                {
                    model: Image,
                    attributes: ['fileName', 'path'],
                    as: 'images'
                },
                {
                    model: Price,
                    attributes: ['amount', 'active'],
                    as: 'prices',
                    where: {
                        active: true
                    }
                },
                {
                    model: Detail,
                    attributes: ['label', 'text', 'order'],
                    as: 'details',
                    include: [
                        {
                            model: Type,
                            attributes: ['name'],
                            as: 'type'
                        }
                    ]
                }
            ],
            order: [
                [{ model: Detail, as: 'details' }, 'order', 'ASC']
            ]
        })
            .then(function (data) {
                return data;
            });
    },
    getAll() {
        return Product.findAll({
            attributes: ['id', 'name', 'slug', 'productCode', 'story', 'storyImageFileName', 'storyImagePath', 'storyWrittenBy', 'quantity', 'active', 'category_id', 'shortDescription'],
            include: [
                {
                    model: Category,
                    attributes: ['id', 'name', 'slug', 'fileName', 'imagePath', 'comingSoon', 'active', 'homePage', 'ourStoryPage'],
                    as: 'category'
                },
                {
                    model: Image,
                    attributes: ['id', 'fileName', 'path'],
                    as: 'images'
                },
                {
                    model: Price,
                    attributes: ['id', 'amount', 'active'],
                    as: 'prices',
                    where: {
                        active: true
                    }
                },
                {
                    model: Detail,
                    attributes: ['id', 'label', 'text', 'type_id'],
                    as: 'details',
                    include: [
                        {
                            model: Type,
                            attributes: ['id', 'name'],
                            as: 'type'
                        }
                    ]
                }
            ],
            order: [
                [{ model: Detail, as: 'details' }, 'order', 'ASC']
            ]
        })
            .then(function (data) {
                return data;
            });
    },
    getAllByCategoryId(params) {
        if (params.limit) {
            return Product.findAll({
                attributes: ['id', 'name', 'slug', 'productCode', 'story', 'storyImageFileName', 'storyImagePath', 'storyWrittenBy', 'quantity', 'active', 'category_id', 'shortDescription'],
                where: {
                    category_id: params.category_id,
                    active: true
                },
                include: [
                    {
                        model: Category,
                        attributes: ['id', 'name', 'slug', 'fileName', 'imagePath', 'comingSoon', 'active', 'homePage', 'ourStoryPage'],
                        as: 'category'
                    },
                    {
                        model: Image,
                        attributes: ['id', 'fileName', 'path'],
                        as: 'images'
                    },
                    {
                        model: Price,
                        attributes: ['id', 'amount', 'active'],
                        as: 'prices'
                    },
                    {
                        model: Detail,
                        attributes: ['id', 'label', 'text', 'type_id'],
                        as: 'details',
                        include: [
                            {
                                model: Type,
                                attributes: ['id', 'name'],
                                as: 'type'
                            }
                        ]
                    }
                ],
                order: [
                    [{ model: Detail, as: 'details' }, 'order', 'ASC']
                ],
                limit: parseInt(params.limit),
            })
                .then(function (data) {
                    return data;
                });
        } else {
        return Product.findAll({
            attributes: ['name', 'slug', 'quantity', 'active', 'shortDescription'],
            where: {
                category_id: params.category_id,
                active: true
            },
            include: [
                {
                    model: Image,
                    attributes: ['fileName', 'path'],
                    as: 'images'
                },
                {
                    model: Price,
                    attributes: ['amount', 'active'],
                    as: 'prices',
                    where: {
                        active: true
                    }
                },
            ],
            order: [
                ['name', 'ASC']
            ]
        })
            .then(function (data) {
                return data;
            });
        }
    },
    update(params) {
        // console.log('params', params);
        const updateValues = {},
            updateKeys = ['name', 'slug', 'productCode', 'story', 'storyImageFileName', 'storyImagePath', 'storyWrittenBy', 'quantity', 'active', 'category_id', 'shortDescription'];
        updateKeys.forEach(function (key) {
            if (key in params) {
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
    },
    deleteById(id) {
        return Product.destroy({
            where: {
                id: id
            }
        }).then(function (data) {
            return data;
        });
    },
}
const Category = require('../models').category;

module.exports = {
    create(params) {
        return Category.create({
            name: params.name,
            slug: params.slug,
            fileName: params.fileName,
            imagePath: params.imagePath,
            comingSoon: params.comingSoon,
            active: params.active,
        })
            .then(function (data) {
                return data;
            });
    },
    getById(id) {
        return Category.findOne({
            where: {
                id: id
            }
        })
            .then(function (data) {
                return data;
            });
    },
    findBySlug(params) {
        return Category.findOne({
            attributes: ['id', 'name', 'slug', 'fileName', 'imagePath', 'comingSoon', 'active'],
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
        return Category.findAll({
            attributes: ['id', 'name', 'slug', 'fileName', 'imagePath', 'comingSoon', 'active'],
        })
            .then(function (data) {
                return data;
            });
    },
    update(params) {
        const updateValues = {},
            updateKeys = ['name', 'slug', 'fileName', 'imagePath', 'comingSoon', 'active'];
        updateKeys.forEach(function (key) {
            if (params[key]) {
                updateValues[key] = params[key];
            }
        });
        return Category.update(updateValues, {
            where: {
                id: params.id
            }
        }).then(function (data) {
            return data;
        });
    }
}
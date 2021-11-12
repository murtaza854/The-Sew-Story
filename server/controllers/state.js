const States = require('../models').state;

module.exports = {
    create(params) {
        return States.create({
            name: params.name,
            slug: params.slug
        })
            .then(function (data) {
                return data;
            });
    },
    findBySlug(params) {
        return States.findOne({
            attributes: ['id', 'name', 'slug', 'active'],
            where: {
                slug: params.slug,
            },
            raw: true
        })
            .then(function (data) {
                return data;
            });
    },
    getAll() {
        return States.findAll({
            attributes: ['id', 'name', 'slug', 'active']
        })
            .then(function (data) {
                return data;
            });
    },
    update(params) {
        const updateValues = {},
            updateKeys = ['name', 'slug', 'active'];
        updateKeys.forEach(function (key) {
            if (params[key]) {
                updateValues[key] = params[key];
            }
        });
        return States.update(updateValues, {
            where: {
                id: params.id
            }
        }).then(function (data) {
            return data;
        });
    }
}
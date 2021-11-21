const States = require('../models').state;

module.exports = {
    create(params) {
        return States.create({
            name: params.name,
            slug: params.slug,
            active: params.active,
        })
            .then(function (data) {
                return data;
            });
    },
    getById(id) {
        return States.findOne({
            where: {
                id: id,
            },
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
                active: true
            },
            raw: true
        })
            .then(function (data) {
                return data;
            });
    },
    getSearch(params) {
        return States.findAll({
            attributes: ['name', 'slug', 'active'],
            where: {
                name: {
                    [params.sequelize.Op.like]: '%' + params.search + '%'
                },
                active: true
                // name: params.sequelize.where(params.sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + params.search.toLowerCase() + '%'),
            }
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
            if (key in params) {
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
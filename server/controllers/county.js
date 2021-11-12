const Counties = require('../models').county;

module.exports = {
    create(params) {
        return Counties.create({
            name: params.name,
            slug: params.slug,
            state_id: params.state_id,
        })
            .then(function (data) {
                return data;
            });
    },
    findBySlug(params) {
        return Counties.findOne({
            attributes: ['id', 'name', 'state_id', 'slug', 'active'],
            where: {
                slug: params.slug,
            }
        })
            .then(function (data) {
                return data;
            });
    },
    getSearch(params) {
        return Counties.findAll({
            attributes: ['name', 'state_id', 'slug', 'active'],
            where: {
                name: {
                    [params.sequelize.Op.like]: '%' + params.search + '%'
                },
                state_id: params.state_id,
                active: 1
                // name: params.sequelize.where(params.sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + params.search.toLowerCase() + '%'),
            }
        })
            .then(function (data) {
                return data;
            });
    },
    getAll() {
        return Counties.findAll({
            attributes: ['id', 'name', 'state_id', 'slug', 'active']
        })
            .then(function (data) {
                return data;
            });
    },
    update(params) {
        const updateValues = {},
            updateKeys = ['name', 'state_id', 'slug', 'active'];
        updateKeys.forEach(function (key) {
            if (params[key]) {
                updateValues[key] = params[key];
            }
        });
        return Counties.update(updateValues, {
            where: {
                id: params.id
            }
        }).then(function (data) {
            return data;
        });
    }
}
const Cities = require('../models').city;

module.exports = {
    create(params) {
        return Cities.create({
            name: params.name,
            slug: params.slug,
            county_id: params.county_id,
        })
            .then(function (data) {
                return data;
            });
    },
    findBySlug(params) {
        return Cities.findOne({
            where: {
                slug: params.slug,
            },
            raw: true,
        })
            .then(function (data) {
                return data;
            });
    },
    getAll() {
        return Cities.findAll({
            attributes: ['id', 'name', 'slug', 'county_id', 'active'],
        })
            .then(function (data) {
                return data;
            });
    },
    update(params) {
        const updateValues = {},
            updateKeys = ['name', 'slug', 'county_id', 'active'];
        updateKeys.forEach(function (key) {
            if (params[key]) {
                updateValues[key] = params[key];
            }
        });
        return Cities.update(updateValues, {
            where: {
                id: params.id
            }
        }).then(function (data) {
            return data;
        });
    }
}
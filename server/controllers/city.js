const City = require('../models').city;
const State = require('../models').state;

module.exports = {
    create(params) {
        return City.create({
            name: params.name,
            slug: params.slug,
            state_id: params.state_id,
            active: params.active,
        })
            .then(function (data) {
                return data;
            });
    },
    getCityByNameAndStateIds(name, stateIds) {
        return City.findOne({
            attributes: ['id'],
            where: {
                name: name,
                state_id: stateIds
            },
            raw: true
        })
            .then(function (data) {
                return data;
            });
    },
    findBySlug(params) {
        return City.findOne({
            attributes: ['id', 'name', 'slug', 'state_id', 'active'],
            where: {
                slug: params.slug,
            },
        })
            .then(function (data) {
                return data;
            });
    },
    getById(id) {
        return City.findOne({
            attributes: ['id', 'name', 'slug', 'state_id', 'active'],
            where: {
                id: id,
            },
            include: [{
                model: State,
                as: 'state',
                attributes: ['id', 'name', 'slug'],
            }],
        })
            .then(function (data) {
                return data;
            });
    },
    getIdbySlug(params) {
        console.log(params);
        return City.findOne({
            attributes: ['id', 'name', 'state_id'],
            where: {
                slug: params[0].slug,
            },
            raw: true,
        })
            .then(function (data) {
                return data;
            });
    },
    insertIfnotExist(params) {
        return City.findOne({
            attributes: ['id', 'name', 'slug', 'state_id', 'active'],
            where: {
                name: params.name,
            },
            raw: true,
        })
            .then(function (data) {
                if (data) {
                    return data;
                } else {
                    return City.create({
                        name: params.name,
                        slug: params.slug,
                        state_id: params.state_id,
                        active: params.active,
                    })
                        .then(function (data) {
                            return data;
                        });
                }
            });
    },
    getSearch(params) {
        return City.findAll({
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
        return City.findAll({
            attributes: ['id', 'name', 'slug', 'state_id', 'active'],
            include: [
                {
                    model: State,
                    as: 'state',
                    attributes: ['id', 'name', 'slug', 'active'],
                }
            ],

        })
            .then(function (data) {
                return data;
            });
    },
    update(params) {
        const updateValues = {},
            updateKeys = ['name', 'slug', 'state_id', 'active'];
        updateKeys.forEach(function (key) {
            if (key in params) {
                updateValues[key] = params[key];
            }
        });
        return City.update(updateValues, {
            where: {
                id: params.id
            }
        }).then(function (data) {
            return data;
        });
    }
}
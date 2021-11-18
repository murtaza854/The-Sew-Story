const Type = require('../models').type;

module.exports = {
    create(params) {
        return Type.create({
            name: params.name,
        })
            .then(function (data) {
                return data;
            });
    },
    getById(id) {
        return Type.findOne({
            where: {
                id: id
            }
        })
            .then(function (data) {
                return data;
            });
    },
    getAll() {
        return Type.findAll({
            attributes: ['id', 'name'],
        })
            .then(function (data) {
                return data;
            });
    },
    update(params) {
        const updateValues = {},
            updateKeys = ['name'];
        updateKeys.forEach(function (key) {
            if (params[key]) {
                updateValues[key] = params[key];
            }
        });
        return Type.update(updateValues, {
            where: {
                id: params.id
            }
        }).then(function (data) {
            return data;
        });
    }
}
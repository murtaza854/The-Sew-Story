const Image = require('../models').image;

module.exports = {
    create(params) {
        return Image.create({
            fileName: params.fileName,
            path: params.path,
            product_id: params.product_id
        })
            .then(function (data) {
                return data;
            });
    },
    getById(id) {
        return Image.findOne({
            where: {
                id: id
            }
        })
            .then(function (data) {
                return data;
            });
    },
    getAll() {
        return Image.findAll({
            attributes: ['id', 'fileName', 'path', 'product_id'],
            where: {
                product_id: null
            }
        })
            .then(function (data) {
                return data;
            });
    },
    update(params) {
        const updateValues = {},
            updateKeys = ['fileName', 'path', 'product_id'];
        updateKeys.forEach(function (key) {
            if (params[key]) {
                updateValues[key] = params[key];
            }
        });
        return Image.update(updateValues, {
            where: {
                id: params.id
            }
        }).then(function (data) {
            return data;
        });
    }
}
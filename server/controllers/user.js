const Users = require('../models').user;

module.exports = {
    create(params) {
        return Users.create({
            firstName: params.firstName,
            lastName: params.lastName,
            email: params.email,
            uid: params.uid
        })
            .then(function (data) {
                return data;
            });
    },
    findByEmail(params) {
        return Users.findOne({
            where: {
                email: params.email,
            }
        })
            .then(function (data) {
                return data;
            });
    },
    findByUid(params) {
        return Users.findOne({
            where: {
                uid: params.uid,
            }
        })
            .then(function (data) {
                return data;
            });
    },
    getAll() {
        return Users.findAll({
            attributes: ['id', 'firstName', 'lastName', 'email', 'uid', 'subscribed']
        })
            .then(function (data) {
                return data;
            });
    },
    updateByEmail(params) {
        return Users.update({
            subscribed: params.subscribed
        }, {
            where: {
                email: params.email,
            }
        })
            .then(function (data) {
                return data;
            });
    },
    update(params) {
        const updateValues = {},
            updateKeys = ['firstName', 'lastName', 'email', 'subscribed'];
        updateKeys.forEach(function (key) {
            if (params[key]) {
                updateValues[key] = params[key];
            }
        });
        return Users.update(updateValues, {
            where: {
                uid: params.uid,
            }
        }).then(function (data) {
            return data;
        });
    }
}
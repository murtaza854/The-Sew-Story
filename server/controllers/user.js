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
    getAll(usersList) {
        return Users.findAll({
            attributes: ['id', 'firstName', 'lastName', 'email', 'uid', 'subscribed']
        })
            .then(function (data) {
                const users = [];
                data.forEach(function (user) {
                    const userData = usersList.users.find(element => element.uid === user.uid);
                    if (userData) {
                        users.push({
                            id: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            uid: user.uid,
                            admin: userData.customClaims.admin,
                            emailVerified: userData.emailVerified,
                        });
                    }
                });
                return users;
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
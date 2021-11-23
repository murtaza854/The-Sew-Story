const Subscribe = require('../models').subscribe;

module.exports = {
    createIfNotExists(params) {
        return Subscribe.findOrCreate({
            where: {
                email: params.email
            },
            defaults: {
                email: params.email
            }
        })
            .then(function (data) {
                return data;
            })
    }
};

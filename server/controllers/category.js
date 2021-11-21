const Category = require('../models').category;

module.exports = {
    create(params) {
        return Category.create({
            name: params.name,
            slug: params.slug,
            fileName: params.fileName,
            imagePath: params.imagePath,
            comingSoon: params.comingSoon,
            active: params.active,
            homePage: params.homePage,
            ourStoryPage: params.ourStoryPage,
        })
            .then(function (data) {
                return data;
            });
    },
    getById(id) {
        return Category.findOne({
            where: {
                id: id
            }
        })
            .then(function (data) {
                return data;
            });
    },
    findBySlug(params) {
        return Category.findOne({
            attributes: ['id', 'name', 'slug', 'fileName', 'imagePath', 'comingSoon', 'active', 'homePage', 'ourStoryPage'],
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
    getBySlugClient(slug) {
        return Category.findOne({
            attributes: ['name', 'slug', 'fileName', 'imagePath', 'comingSoon', 'active', 'homePage', 'ourStoryPage'],
            where: {
                slug: slug,
                active: true
            },
        })
            .then(function (data) {
                return data;
            });
    },
    getAll() {
        return Category.findAll({
            attributes: ['id', 'name', 'slug', 'fileName', 'imagePath', 'comingSoon', 'active', 'homePage', 'ourStoryPage'],
        })
            .then(function (data) {
                // console.log('data', data);
                return data;
            });
    },
    getAllWithCustomCheck(params) {
        const getValues = {},
            getKeys = ['name', 'slug', 'fileName', 'imagePath', 'comingSoon', 'active', 'homePage', 'ourStoryPage'];
        getKeys.forEach(function (key) {
            if (key in params) {
                getValues[key] = params[key];
            } else if (key === 'active') {
                getValues[key] = true;
            }
        });
        return Category.findAll({
            attributes: ['name', 'slug', 'fileName', 'imagePath', 'comingSoon', 'active', 'homePage', 'ourStoryPage'],
            where: getValues,
            order: [
                ['name', 'DESC'],
            ],
        })
            .then(function (data) {
                return data;
            });
    },
    update(params) {
        const updateValues = {},
            updateKeys = ['name', 'slug', 'fileName', 'imagePath', 'comingSoon', 'active', 'homePage', 'ourStoryPage'];
        updateKeys.forEach(function (key) {
            if (key in params) {
                updateValues[key] = params[key];
            }
        });
        return Category.update(updateValues, {
            where: {
                id: params.id
            }
        }).then(function (data) {
            return data;
        });
    }
}
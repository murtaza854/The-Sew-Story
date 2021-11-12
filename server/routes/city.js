const router = require('express').Router();
const countyController = require('../controllers').county;
const cityController = require('../controllers').city;
const Sequelize = require('sequelize');

router.get('/get-cities-search', async (req, res) => {
    try {
        const { cityText, counties } = req.query;
        const countiesArray = JSON.parse(counties);
        if (countiesArray.length > 0) {
            const county = await countyController.findBySlug({ slug: countiesArray[0].slug });
            const cities = await cityController.getSearch({ search: cityText, county_id: county.id, sequelize: Sequelize });
            res.json({ data: cities });
        } else {
            res.json({ data: [] });
        }
    } catch (error) {
        res.json({ error: error.message });
    }
});

module.exports = router;
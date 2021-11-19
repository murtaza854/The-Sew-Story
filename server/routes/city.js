const router = require('express').Router();
const stateController = require('../controllers').state;
const cityController = require('../controllers').city;
const Sequelize = require('sequelize');

router.get('/get-cities-search', async (req, res) => {
    try {
        const { cityText, states } = req.query;
        const statesArray = JSON.parse(states);
        if (statesArray.length > 0) {
            const state = await stateController.findBySlug({ slug: statesArray[0].slug });
            const cities = await cityController.getSearch({ search: cityText, state_id: state.id, sequelize: Sequelize });
            res.json({ data: cities });
        } else {
            res.json({ data: [] });
        }
    } catch (error) {
        res.json({ error: error.message });
    }
});

module.exports = router;
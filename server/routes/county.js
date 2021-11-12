const router = require('express').Router();
const stateController = require('../controllers').state;
const countyController = require('../controllers').county;
const Sequelize = require('sequelize');

router.get('/get-counties-search', async (req, res) => {
    try {
        const { countyText, states } = req.query;
        const statesArray = JSON.parse(states);
        if (statesArray.length > 0) {
            const state = await stateController.findBySlug({ slug: statesArray[0].slug });
            const counties = await countyController.getSearch({ search: countyText, state_id: state.id, sequelize: Sequelize });
            res.json({ data: counties });
        } else {
            res.json({ data: [] });
        }
    } catch (error) {
        res.json({ error: error.message });
    }
});

module.exports = router;
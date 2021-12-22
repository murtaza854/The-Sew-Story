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

router.get('/getAllCities', async (req, res) => {
    try {
        const cities = await cityController.getAll();
        res.json({ data: cities });
    } catch (error) {
        res.json({ data: [], error: error.message });
    }
});

router.post('/getById', async (req, res) => {
    try {
        const { id } = req.body;
        const city = await cityController.getById(id);
        res.json({ data: city });
    } catch (error) {
        res.json({ data: [], error: error.message });
    }
});

router.post('/add', async (req, res) => {
    try {
        const newCity = await cityController.create({
            name: req.body.name,
            state_id: req.body.state.id,
            slug: slugify(req.body.name, { lower: true }),
            active: req.body.active,
        });
        res.json({ data: newCity });
    } catch (error) {
        res.json({ data: null, error: error.message });
    }
});

router.post('/update', async (req, res) => {
    try {
        const { id, name, state, active } = req.body;
        let slug = slugify(name, { lower: true });
        while (true) {
            const city = await cityController.findBySlug({ slug: slug });
            if (city) {
                if (parseInt(state.slug.split('-')[1]) > 0) {
                    slug = slug + '-' + parseInt(state.slug.split('-')[1]) + 1;
                } else {
                    slug = slug + '-1';
                }
            } else {
                break;
            }
        }
        const updatedCity = await cityController.update({
            id,
            name,
            state_id: state.id,
            slug,
            active,
        });
        res.json({ data: updatedCity });
    } catch (error) {
        res.json({ data: null, error: error.message });
    }
});

module.exports = router;
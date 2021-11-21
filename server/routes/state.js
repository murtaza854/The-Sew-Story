const router = require('express').Router();
const stateController = require('../controllers').state;
const slugify = require('slugify');
const Sequelize = require('sequelize');

router.get('/get-states-search', async (req, res) => {
    try {
        const { stateText } = req.query;
        const states = await stateController.getSearch({ search: stateText, sequelize: Sequelize });
        res.json({ data: states });
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.get('/getAllStates', async (req, res) => {
    try {
        const states = await stateController.getAll();
        res.json({ data: states });
    } catch (error) {
        res.json({ data: [], error: error });
    }
});

router.post('/getById', async (req, res) => {
    try {
        const { id } = req.body;
        const state = await stateController.getById(id);
        res.json({ data: state });
    } catch (error) {
        console.log(error);
        res.json({ data: [], error: error.message });
    }
});

router.post('/add', async (req, res) => {
    try {
        const newState = await stateController.create({
            name: req.body.name,
            slug: slugify(req.body.name, { lower: true }),
            active: req.body.active,
        });
        res.json({ data: newState });
    } catch (error) {
        res.json({ data: null, error: error.message });
    }
});

router.post('/update', async (req, res) => {
    try {
        const { id, name, active } = req.body;
        let slug = slugify(name, { lower: true });
        while (true) {
            const state = await stateController.findBySlug(slug);
            if (state) {
                if (parseInt(state.slug.split('-')[1]) > 0) {
                    slug = slug + '-' + parseInt(state.slug.split('-')[1]) + 1;
                } else {
                    slug = slug + '-1';
                }
            } else {
                break;
            }
        }
        const state = await stateController.update({
            id,
            name,
            slug,
            active,
        });
        res.json({ data: state });
    } catch (error) {
        res.json({ data: null, error: error.message });
    }
});


module.exports = router;
const router = require('express').Router();
const typeController = require('../controllers').type;

router.get('/getAllTypes', async (req, res) => {
    try {
        const types = await typeController.getAll();
        res.json({ data: types });
    } catch (error) {
        res.json({ data: [], error: error });
    }
});

router.post('/getById', async (req, res) => {
    try {
        const type = await typeController.getById(req.body.id);
        res.json({ data: type });
    } catch (error) {
        res.json({ data: null, error: error });
    }
});

router.post('/add', async (req, res) => {
    try {
        const obj = await typeController.create(
            {
                name: req.body.name,
            }
        );
        res.json({ data: obj });
    } catch (error) {
        res.json({ data: null, error: error });
    }
});

router.post('/update', async (req, res) => {
    try {
        await typeController.update({
            id: req.body.id,
            name: req.body.name,
        });
        const editObj = await typeController.getById(req.body.id);
        res.json({ data: editObj });
    } catch (error) {
        res.json({ data: null, error: error });
    }
});

module.exports = router;
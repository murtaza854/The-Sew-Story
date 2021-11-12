const router = require('express').Router();
const stateController = require('../controllers').state;

router.get('/get-states-search', async (req, res) => {
    try {
    const { stateText } = req.query;
    const states = await stateController.getStatesSearch({search: stateText});
    res.json({ data: states });
    } catch (error) {
        res.json({ error: error.message });
    }
});

module.exports = router;
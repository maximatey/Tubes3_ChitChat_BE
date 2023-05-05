const express = require('express')
const router = express.Router()
const getChatHistory = require('../main').getChatHistory

// Get chat history for a specific hist_id
router.route('/:hist_id').get(async(req, res, next) => {
    try {
        const hist_id = req.params.hist_id;
        const result = await getChatHistory(hist_id);
        res.send(result);
        console.log(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// Receive a new message for a specific hist_id
router.route('/:hist_id').post(async(req, res, next) => {
    try {
        const hist_id = req.params.hist_id;
        const message = req.body.message;
        const result = await getChatHistory(hist_id);
        // Do something with the message and hist_id
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
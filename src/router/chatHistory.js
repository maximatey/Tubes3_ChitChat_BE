const express = require('express')
const router = express.Router()
const getChatHistory = require('../main').getChatHistory

// Get all users
router.route('/').get(async(req, res, next) => {
    try {
        const result = await getChatHistory(hist_id);
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;

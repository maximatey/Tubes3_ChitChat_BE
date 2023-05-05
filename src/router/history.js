const express = require('express')
const router = express.Router()
const getHistory = require('../main').getHistory

// Get all users
router.route('/').get(async(req, res, next) => {
    try {
        const result = await getHistory();
        res.send(result);

    } catch {
        if (err) throw err;
    }
});

module.exports = router;
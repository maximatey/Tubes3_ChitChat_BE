const express = require('express')
const router = express.Router()
const getChatHistory = require('../main').getChatHistory

// Get all users
router.route('/').get(async(req, res, next) => {
    try {
        getChatHistory(hist_id).then((result) => {
            res.send(result);
        });
    } catch {
        if (err) throw err;
    }
});

module.exports = router;
const express = require('express')
const router = express.Router()
const createNewHistory = require('../main').createNewHistory

// Get all users
router.route('/').get(async(req, res, next) => {
    try {
        createNewHistory();
        res.send('New History created!');
    } catch {
        if (err) throw err;
    }

});

module.exports = router;
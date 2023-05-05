const express = require('express')
const router = express.Router()
const getServices = require('../main').getServices

// Get all users
router.route('/').get(async(req, res, next) => {
    try {
        getServices(userInput, hist_ID, algorithm);
        res.send('Services called!');
    } catch {
        if (err) throw err;
    }

});

module.exports = router;
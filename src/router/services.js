const express = require('express')
const router = express.Router()
const getServices = require('../main').getServices

// Get all users
router.route('/').post(async(req, res, next) => {
    try {
        const hist_id = req.body.hist_id;
        const userInput = req.body.userInput;
        const algorithm = req.body.algorithm;
        // Do something with the message and hist_id
        getServices(userInput, hist_id, algorithm);
        res.send('Services called!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
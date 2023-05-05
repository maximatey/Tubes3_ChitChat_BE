const express = require('express')
const router = express.Router()
const con = require('../database').con

// Get all users
router.route('/').get(async (req, res, next) => {
    try {
        con.query('SELECT * FROM Chat', (err, results) => {
            console.log(results);
            res.send(results);
          });    
    } catch {
        if (err) throw err;
    }
    
  });

  module.exports = router;
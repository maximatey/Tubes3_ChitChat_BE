const express = require('express')
const router = express.Router()
const con = require('../database').con

// Get all users
router.route('/').get(async (req, res, next) => {
    try {
        con.query('SELECT * FROM Chat', (err, results) => {
            res.json(results);
          });    
    } catch {
        if (err) throw err;
    }
    
  });

  module.exports = router;
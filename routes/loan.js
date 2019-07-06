const express = require('express');
const router = express.Router();
const { availableLoans } = require('../models/Loans');
const { currentUsers } = require('../models/Users');
const moment = require('moment');

// get all loans
//@route is /loans/all
// route is public
router.get('/all', (req, res) => {
  const loans = availableLoans;
  res.send({ loans });
});

module.exports = router;

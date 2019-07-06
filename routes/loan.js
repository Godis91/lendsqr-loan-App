const express = require('express');
const router = express.Router();
const { currentUsers } = require('../models/Users');
const { availableLoans } = require('../models/Loans');

// This route is to create a new use
// @route is /users/create
//it is a public route

router.post('/create', (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userExists = currentUsers.find(user => user.email === email);

  if (userExists) {
    return res.status(400).send({
      errorMessage: 'User Already Exists'
    });
  }

  const id = currentUsers.length + 1;
  const loans = [];

  const newUser = {
    id,
    firstName,
    lastName,
    email,
    password,
    loans
  };

  currentUsers.push(newUser);

  res.send(currentUsers);
});

module.exports = router;

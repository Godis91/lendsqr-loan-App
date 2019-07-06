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

// Login route
// @route is users/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .send({ msg: 'please input your email and password' });
  }

  const user = currentUsers.find(user => user.email === email);

  if (!user) return res.status(404).send('User Does Not Exist');

  if (user.password !== password) {
    return res.status(400).send('Invalid login credentials');
  }

  res.status(200).send({ user });
});

//Should get all users
// @route is /user/all
router.get('/all', (req, res) => {
  const users = currentUsers;
  res.status(200).send({ users });
});

// This route should return a single user by id
router.get('/:user_id', async (req, res) => {
  try {
    const user = await currentUsers.find(
      user => user.id === Number(req.params.user_id)
    );
    res.status(200).send({ user });
  } catch (e) {
    res.status(500).send('server error');
  }
});

module.exports = router;

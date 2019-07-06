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

// Apply for a loan route
//@route is /loans/:loan_id/user/:user_id

router.post('/:loan_id/users/:user_id', (req, res) => {
  const userIndex = currentUsers.findIndex(
    user => user.id === Number(req.params.user_id)
  );

  const loan = availableLoans.find(
    loan => loan.id === Number(req.params.loan_id)
  );

  const user = currentUsers.find(
    user => user.id === Number(req.params.user_id)
  );

  const newLoan = {
    id: loan.id,
    startDate: moment(),
    endDate: moment().add(parseInt(loan.tenure), 'months')
  };

  currentUsers[userIndex].loans.push(newLoan);

  const { user_id, loan_id } = req.params;

  if (!user_id)
    return res.status(400).send({
      error: 'Sorry, ID is required'
    });

  if (!loan_id)
    return res.status(400).send({
      error: 'Sorry,ID is required'
    });

  if (!user)
    return res.status(404).send({
      errorMessage: 'User Not Found'
    });

  if (!loan) {
    return res.status(404).send({
      errorMessage: 'Loan details not found'
    });
  }

  const validLoanApplication = user.loans.filter(loan =>
    moment(loan.endDate).isAfter(moment())
  );

  if (validLoanApplication.length > 0) {
    res.status(406).send({
      errorMessage:
        'Sorry, you can only apply for a loan after your current loan tenure has elapsed'
    });
  } else {
    res.send(currentUsers);
  }
});

module.exports = router;

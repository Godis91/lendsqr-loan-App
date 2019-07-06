const express = require('express');

// set up express app
const app = express();

// set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set up routes
app.use('/users', require('./routes/user'));
app.use('/loans', require('./routes/user'));

const port = process.env.PORT || 5000;

// listen to server
app.listen(port, () => console.log(`server is up on port ${port}`));

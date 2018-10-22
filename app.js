var express = require('express');

var usersRouter = require('./routes/users');

var app = express();

app.use('/users', usersRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening..')
});

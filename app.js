const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const usersRouter = require('./routes/users');
const entriesRouter = require('./routes/entries');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', usersRouter);
app.use('/entries', entriesRouter);

mongoose.set('useCreateIndex', true);
mongoose.connect(
  'mongodb://localhost/eteninvlijmen',
  { useNewUrlParser: true }
);

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening..');
});

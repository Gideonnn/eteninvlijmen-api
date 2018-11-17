const express = require('express');
const router = express.Router();

const User = require('../models/user.model');

router.get('/', async (req, res) => {
  const result = await User.find().sort('name');
  res.send(result);
});

router.post('/', async (req, res) => {
  try {
    const result = await User.create({
      name: req.body.name,
      avatar: req.body.avatar,
    });

    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const result = await User.findOneAndUpdate({ name }, req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

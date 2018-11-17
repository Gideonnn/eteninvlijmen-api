const express = require('express');
const router = express.Router();

const Entry = require('../models/entry.model');

router.get('/', async (req, res) => {
  const { year, week, userId } = req.query;
  const result = await Entry.findOne({ year, week, userId });

  if (result) {
    res.json(result.preferences);
  } else {
    res.json([false, false, false, false, false, false, false]);
  }
});

router.put('/', async (req, res) => {
  try {
    const { year, week, userId } = req.query;
    const { preferences } = req.body;

    const entry = { year, week, userId, preferences };
    const result = await Entry.findOneAndUpdate({ year, week, userId }, entry, { upsert: true });

    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

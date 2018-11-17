const express = require('express');
const router = express.Router();

const Entry = require('../models/entry.model');

const _getDayPreferences = async (year, week, userId) => {
  const result = await Entry.findOne({ year, week, userId });
  return result ? result.preferences : [false, false, false, false, false, false, false];
};

const _getSummary = async (year, week) => {
  const result = await Entry.find({ year, week });
  return result
    .map(res => res.preferences)
    .reduce(
      (acc, cur) => {
        acc[0] += cur[0];
        acc[1] += cur[1];
        acc[2] += cur[2];
        acc[3] += cur[3];
        acc[4] += cur[4];
        acc[5] += cur[5];
        acc[6] += cur[6];
        return acc;
      },
      [0, 0, 0, 0, 0, 0, 0]
    )
    .map(sum => (sum > 0 ? Math.floor((sum / result.length) * 100) : 0));
};

router.get('/', async (req, res) => {
  const { year, week, userId } = req.query;

  if (userId) {
    res.json(await _getDayPreferences(year, week, userId));
  } else {
    res.json(await _getSummary(year, week));
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

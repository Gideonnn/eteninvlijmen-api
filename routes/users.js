var express = require('express');
var router = express.Router();

router.post('/', (req, res, next) => {
  return res.send('hello world');
});

module.exports = router;

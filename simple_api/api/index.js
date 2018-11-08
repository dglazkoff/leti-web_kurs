var router = require('express').Router();
const fs = require('fs');
const scoreJSON = require('../score.json');

router.get('/users', function(req, res, next) {
  res.json(scoreJSON.users);
});

module.exports = router;

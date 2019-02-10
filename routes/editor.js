var express = require('express');
var router = express.Router();

/* GET ace editor. */
router.get('/', function(req, res, next) {
    res.render('editor', { title: 'Ace Editor Demo' });
  });

module.exports = router;

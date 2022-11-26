var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('hello world');
  res.status(200).json({
    fullname: 'Sanmook Nantasukon'
  })
});

router.get('/bio', function(req, res, next) {
  // res.send('hello world');
  res.status(200).json({
    fullname: 'Sanmook Nantasukon',
    nickname: "mook",
    hobby: "sleep",
    gitusername: "arabbitategrass"
  })
});

module.exports = router;

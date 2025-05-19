var express = require('express');
var router = express.Router();
const apiRoutes = require('./api');

/* GET home page. */
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to Demo API !!' });
});

router.use('/api', apiRoutes);

module.exports = router;
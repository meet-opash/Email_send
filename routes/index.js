var express = require('express');
var router = express.Router();
const apiRoutes = require('./api');

/* GET home page. */
router.get('/', function(req, res) {
  // const user = new usersModel({
  // });
  res.render('index', { title: 'Welcome to Demo API !!' });
});
router.use('/api', apiRoutes);

module.exports = router;
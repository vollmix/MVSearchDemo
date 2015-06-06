var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  });

router.post('/', function(req, res){
  var username = req.body.username;
  console.log('username' + username);
 res.render('index', { title: 'Express' });
});
/* GET home page. */
router.get('/helloworld', function(req, res, next) {
  res.render('helloworld', { title: 'Hello World' });
});

module.exports = router;

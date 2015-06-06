var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', session : req.session });
  });

router.post('/', function(req, res){
  var username = req.body.User;
  var password = req.body.Password;
  console.log('Username :' + username);
  console.log('Password :' + password);
    req.session['username'] = username;
    req.session['password'] = password;
 res.render('index', { title: 'Express', session : req.session });
});
/* GET home page. */
router.get('/helloworld', function(req, res, next) {
  res.render('helloworld', { title: 'Hello World' });
});

module.exports = router;

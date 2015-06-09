var express = require('express');
var router = express.Router();

//var marklogic = require("marklogic");
//var conn = require("./env.js").connection;
var ml = require('./MVSearchModule.js')();

//var db = marklogic.createDatabaseClient(conn);
//var qb = marklogic.queryBuilder;



/* GET home page. */
router.get('/', function (req, res, next) {
  ml.FacetSearch(req, res, "state");
  //res.render('index', { search : '', session : req.session });
  });

router.post('/search', function(req, res){
  ////var username = req.body.User;
  ////var password = req.body.Password;
  ////console.log('Username :' + username);
  ////console.log('Password :' + password);
  ////  req.session['username'] = username;
  //  //  req.session['password'] = password;
    //try{
    //db.documents.query(
    //    qb.where(
    //        qb.collection("housedata"),
    //        qb.parsedFrom(req.body.SearchString))
    //        .orderBy(qb.sort(qb.score(), "descending"))
                
    //        .withOptions({ categories: 'none' })
    //    )
    
                
            //db.documents.query(
            //    qb.where(qb.parsedFrom(req.body.SearchString))
            //                    .slice(qb.snippet())
                                //.withOptions({categories: ['content', 'metadata']})
                                //.withOptions({categories: ['content']})
    //    db.documents.query(
    //        qb.where(
    //            qb.parsedFrom(req.body.SearchString)
    //        )//.slice(qb.snippet())
    //    )
    //.result(function (documents) {
    //    //documents.forEach(function (document) {
    //    //    console.log(document.content.name + " at " + document.uri);
    //    //})
    //        res.render('index', { title: 'MVSearch', results : documents });
    //        res.end();
    //}, function (error) {
    //    console.dir(error);
    //    res.render('index', { title: 'MVSearch',  error : error });
    //        res.end();
    //    });
    //}
    //catch (e) {
    //    res.render('index', { title: 'MVSearch', session : req.session, exp : e });
    //    console.log(e);
    //}       
    ml.Keysearch(req, res);
});

router.post('/searchrel', function (req, res) {
    ml.KeysearchRel(req, res);
});

router.post('/facetsearch', function (req, res) {
    ml.FacetSearch(req, res, "state");
});

router.post('/fieldsearch', function (req, res) {
    ml.FieldSearch(req, res );
});
/* GET home page. */
router.get('/helloworld', function(req, res, next) {
  res.render('helloworld', { title: 'Hello World' });
});


module.exports = router;



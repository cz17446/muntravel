var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});

/* GET newyork page. */
router.get('/newyork', function(req, res) {
    res.render('newyork', { title: 'New York' });
});

/* GET seattle page. */
router.get('/seattle', function(req, res) {
    res.render('seattle', { title: 'New York' });
});

/* GET toronto page. */
router.get('/toronto', function(req, res) {
    res.render('toronto', { title: 'New York' });
});

/* GET lasvegas page. */
router.get('/lasvegas', function(req, res) {
    res.render('lasvegas', { title: 'New York' });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

module.exports = router;
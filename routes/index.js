var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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


/* POST to Add Review Service */
router.post('/addreview', function(req, res) {
    console.log("Start to save to MongoDB");
    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var usernameInput = req.body.usernameInput;
    var commentInput = req.body.commentInput;

    console.log("username: " + usernameInput);

    // Set our collection
    var collection = db.get('userreview');

    // Submit to the DB
    collection.insert({
        "usernameInput" : usernameInput,
        "commentInput" : commentInput
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.render('lasvegas', {
                title : 'Las Vegas'
            });
        }
    });
});
module.exports = router;
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

var latitude;
var longitude;
router.post('/geolocation', function(req, res) {
    latitude = req.body.latitude;
    longitude = req.body.longitude;
    console.log("location received by node: " + latitude + longitude);
    res.sendStatus(200);
})

/* POST to Add Review Service */
router.post('/addreview', function(req, res) {
    console.log("Start to save to MongoDB");
    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var username = req.body.username;
    var usertype = req.body.usertype;
    var reviewcomment= req.body.reviewcomment;

    // Set our collection
    var collection = db.get('userreview');

    // Submit to the DB
    //TODO: city, and googlemap string
    collection.insert({
        "timestamp" : new Date(),
        "status" : "posted",
        "username" : username,
        "usertype": usertype,
        "reviewcomment" : reviewcomment,
        "replyusername": null,
        "replyusertype": null,
        "replycomment": null,
        "latitude": latitude,
        "longitude": longitude
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.redirect("lasvegas");
        }
    });
});

/* POST to update Review Service */
router.post('/updatereview', function(req, res) {
    console.log("Start to update to MongoDB: " + req);
    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var reviewid = req.body.reviewid;
    var username = req.body.username;
    var usertype = req.body.usertype;
    var reviewcomment= req.body.reviewcomment;

    console.log("reviewid " + reviewid)

    // Set our collection
    var collection = db.get('userreview');

    // Submit to the DB
    collection.update({_id : reviewid}, 
        {$set: {
            "replyusername": username,
            "replyusertype": usertype,
            "replycomment": reviewcomment,
            }
        }, 
        function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                res.redirect("lasvegas");
            }
    });
});

/* POST to Delete Review Service */
router.post('/deletereview', function(req, res) {
    var db = req.db;
    var collection = db.get('userreview');
    var reviewid = req.body.reviewid;
    
    // Submit to the DB
    collection.update({_id : reviewid}, 
        {$set: {
            "status" : "deleted"
            }
        }, 
        function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                res.redirect("lasvegas");
            }
    });
});


module.exports = router;
var express = require('express');
var router = express.Router();

function newyork(req, res) {
    var db = req.db;
    var collection = db.get('userreview');

    collection.find({status: "posted", city: "newyork"},{ sort : { timestamp : -1 } }, function(err, cursor){
        console.log("search posted comments"  + cursor);
      collection.find({status: "deleted", city: "newyork"},{ sort : { timestamp : -1 } },function(err,docs){
          console.log("search deleted comments " + docs);
          res.render('newyork', {
              "reviewlist" : (cursor === undefined) ? {} : cursor,
              "deletedreviewlist" : (docs === undefined) ? {} : docs
          });
      });
    });
}

/* GET newyork page. */
router.get('/', newyork);

module.exports = router;
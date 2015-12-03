var express = require('express');
var router = express.Router();

function toronto(req, res) {
    var db = req.db;
    var collection = db.get('userreview');

    collection.find({status: "posted", city: "toronto"},{ sort : { timestamp : -1 } }, function(err, cursor){
        console.log("search posted comments"  + cursor);
      collection.find({status: "deleted", city: "toronto"},{ sort : { timestamp : -1 } },function(err,docs){
          console.log("search deleted comments " + docs);
          res.render('toronto', {
              "reviewlist" : (cursor === undefined) ? {} : cursor,
              "deletedreviewlist" : (docs === undefined) ? {} : docs
          });
      });
    });
}

/* GET toronto page. */
router.get('/', toronto);

module.exports = router;
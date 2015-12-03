var express = require('express');
var router = express.Router();

function lasvegas(req, res) {
    var db = req.db;
    var collection = db.get('userreview');

    collection.find({status: "posted"},{ sort : { timestamp : -1 } }, function(err, cursor){
        console.log("search posted comments"  + cursor);
      collection.find({status: "deleted"},{ sort : { timestamp : -1 } },function(err,docs){
          console.log("search deleted comments " + docs);
          res.render('lasvegas', {
              "reviewlist" : (cursor === undefined) ? {} : cursor,
              "deletedreviewlist" : (docs === undefined) ? {} : docs
          });
      });
    });
}

/* GET lasvegas page. */
router.get('/', lasvegas);

module.exports = router;
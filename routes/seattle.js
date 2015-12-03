var express = require('express');
var router = express.Router();

function seattle(req, res) {
    var db = req.db;
    var collection = db.get('userreview');

    collection.find({status: "posted", city: "seattle"},{ sort : { timestamp : -1 } }, function(err, cursor){
        console.log("search posted comments"  + cursor);
      collection.find({status: "deleted", city: "seattle"},{ sort : { timestamp : -1 } },function(err,docs){
          console.log("search deleted comments " + docs);
          res.render('seattle', {
              "reviewlist" : (cursor === undefined) ? {} : cursor,
              "deletedreviewlist" : (docs === undefined) ? {} : docs
          });
      });
    });
}

/* GET seattle page. */
router.get('/', seattle);

module.exports = router;
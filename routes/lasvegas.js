var express = require('express');
var router = express.Router();

function lasvegas(req, res) {
    var db = req.db;
    var collection = db.get('userreview');
    collection.find({},{},function(e,docs){
        res.render('lasvegas', {
            "reviewlist" : docs
        });
    });
}

/* GET lasvegas page. */
router.get('/', lasvegas);

module.exports = router;
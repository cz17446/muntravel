var express = require('express');
var router = express.Router();
var common = require('./common.js');

function lasvegas(req, res) {
    // localStorage.clear();
    var reviewListName = "reviewslist_lasvegas";
    var deletedReviewListName = "deletedReviewslist_lasvegas";
    // common.reloadList(reviewListName, "reviewsBlock", true, reviewListName,
    // deletedReviewListName);
    // common.reloadList(deletedReviewListName, "deletedReviewsBlock", false,
    // reviewListName, deletedReviewListName);

    // Get user location at the beginning
    //common.initMap();
//    var addButton = document.getElementById("addButton");
//    if (addButton != null) {
//        addButton.onclick = function() {
//            common.addButtonClick(reviewListName, deletedReviewListName)
//        };
//    }
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
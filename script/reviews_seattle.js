window.onload = init;
function init() {
    //localStorage.clear();
    var reviewListName = "reviewslist_seattle";
    var deletedReviewListName = "deletedReviewslist_seattle";
    reloadList(reviewListName, "reviewsBlock", true, reviewListName, deletedReviewListName);
    reloadList(deletedReviewListName, "deletedReviewsBlock", false, reviewListName, deletedReviewListName);

    // Get user location at the beginning
    initMap();
    var addButton = document.getElementById("addButton");
    if(addButton != null) {
        addButton.onclick = function(){addButtonClick(reviewListName, deletedReviewListName)};
    }

    var clearStorageButton = document.getElementById("clearStorageButton");
    if(clearStorageButton != null) {
        clearStorageButton.onclick = function() {
            localStorage.clear();
            window.location.reload(true);
        }
    }
}


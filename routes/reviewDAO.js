function removeReview(item, listName) {
    var reviewListArray = getStoreArray(listName);
    console.log("before reviewListArray: " + JSON.stringify(reviewListArray));
    console.log("try to remove item from list, id: " + item.id)
    var index;
    for(var i = 0; i < reviewListArray.length; i++) {
        var review = reviewListArray[i];
        if(review.id == item.id) {
            index = i;
        }
    }
    if(index != null) {
        console.log("remove item index: " + index);
        reviewListArray.splice(index, 1);
    } else {
        console.log("remove item not found!");
    }
    //localStorage.setItem(listName, JSON.stringify(reviewListArray));

    reviewListArray = getStoreArray(listName);
    console.log("after reviewListArray: " + JSON.stringify(reviewListArray));
}

function saveReviews(item, listName) {
    var reviewListArray = getStoreArray(listName);
    reviewListArray.push(item);
    localStorage.setItem(listName, JSON.stringify(reviewListArray));
}

function getStoreArray(key) {
    //var storeArray = localStorage.getItem(key);
    var storeArray;
    if (storeArray == null || storeArray == "") {
        storeArray = new Array();
    } else {
        storeArray = JSON.parse(storeArray);
    }
    return storeArray;
}

module.exports = {
        getStoreArray: getStoreArray
}
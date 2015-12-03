var latitudeValue;
var longitudeValue;
var reviewDAO =  require('./reviewDAO.js');

//function initMap() {
//    if (navigator.geolocation) {
//        navigator.geolocation.getCurrentPosition(getPosition, displayError);
//    } else {
//        alert("Oops, no geolocation support");
//    }
//}

function getPosition(position) {
    var coords = position.coords;
    latitudeValue = coords.latitude;
    longitudeValue = coords.longitude;
    console.log("getPosition: You are at Latitude: " + latitudeValue + ", Longitude: " + longitudeValue);
}

function reloadList(listName, parentBlock, mapEnabled, reviewListName, deletedReviewListName) {
    var reviewslistArray = reviewDAO.getStoreArray(listName);
    console.log("****reloadList: " + listName);
    console.log("****List: " + JSON.stringify(reviewslistArray));
    if (reviewslistArray != null && reviewslistArray.length > 0) {
        for (var i = reviewslistArray.length - 1; i >= 0; i--) {
            // Display reviews from bottom to top
            var review = reviewslistArray[i];
            var reviewDiv;
            var reviewBlockDiv = document.getElementById(parentBlock);

            if(review.parent != null) {
                console.log("***Reply Review");
                //Reply comment, try to find the parent review
                var reviewParentId = review.parent;
                var parentReview;
                for(var i = reviewslistArray.length - 1; i >= 0; i--) {
                    var parentReviewTemp = reviewslistArray[i];
                    if(parentReviewTemp.id == reviewParentId) {
                        console.log("Parent and child match found!");
                        parentReview = parentReviewTemp;
                        break;
                    }
                }
                if(parentReview != null) {
                    var parentReviewDiv = createNewReviewDiv(parentReview, mapEnabled, reviewListName, deletedReviewListName);
                    var childReviewDiv = createNewReviewDiv(review, mapEnabled, reviewListName, deletedReviewListName);
                    parentReviewDiv.appendChild(childReviewDiv);
                    reviewBlockDiv.appendChild(parentReviewDiv);

                    var mapId = "map"+ parentReview.id;
                    if(mapEnabled) {
                        showMap(mapId, parentReview.latitude, parentReview.longitude);
                    }

                    mapId = "map"+ review.id;
                    if(mapEnabled) {
                        showMap(mapId, review.latitude, review.longitude);
                    }
                }
            } else {
                console.log("***Normal Review");
                reviewDiv = createNewReviewDiv(review, mapEnabled, reviewListName, deletedReviewListName);
                reviewBlockDiv.appendChild(reviewDiv);

                var mapId = "map"+ review.id;
                if(mapEnabled) {
                    showMap(mapId, review.latitude, review.longitude);
                }
            }
        }
    }
}

function createNewReviewDiv(review, mapEnabled, reviewListName, deletedReviewListName) {
    var reviewIndex = review.id;
    // Role + Comment Text Boxes
    var reviewRole = document.createElement("h3");
    reviewRole.innerHTML = "User Type: " + review.userRole + " <br> User Name: " + review.userName;
    var reviewComment = document.createElement("p");
    reviewComment.innerHTML = review.comment;

    var reviewDiv = document.createElement("div");
    reviewDiv.id = "review" + reviewIndex;
    reviewDiv.appendChild(reviewRole);
    reviewDiv.appendChild(reviewComment);

    //Depends on if having parent, it is a review or reply
    if(review.parent == null) {
        reviewDiv.className = "reviewComment";
    } else {
        reviewDiv.className = "replyComment";
    }

    //Reply&delete functions
    var deleteButton = createButton("Delete", reviewIndex);
    var replyButton = createButton("Reply", reviewIndex);
    var replyLabel = document.createElement("p");
    replyLabel.innerHTML = "Please Use the Text Area on the Page Bottom to Reply";

    // Map Div
    if(mapEnabled) {
        var mapDiv = document.createElement("div");
        mapDiv.id = "map" + reviewIndex;
        mapDiv.className = "googleMap";
        mapDiv.innerHTML = "Map Place Holder";
        console.log("map created, mapId: " + (mapDiv.id));
        reviewDiv.appendChild(mapDiv);
        reviewDiv.appendChild(replyLabel);
        reviewDiv.appendChild(replyButton);
        reviewDiv.appendChild(deleteButton);
    }
    console.log("reviewDiv.id: " + reviewDiv.id);

    // Add listener after append the review to parent
    console.log("add listener to delete/reply buttons " + reviewListName + " " + deletedReviewListName);
    if(deleteButton != null) {
        console.log("Add onclick for delete, reviewId" + review.id);
        deleteButton.onclick = function(){deleteButtonClick(review, reviewListName, deletedReviewListName)};
    }
    if(replyButton != null) {
        console.log("Add onclick for delete, reviewId" + review.id);
        replyButton.onclick = function(){replyButtonClick(reviewIndex, reviewListName, deletedReviewListName)};
    }
    return reviewDiv;
}

function addButtonClick(reviewListName, deletedReviewListName) {
    if(latitudeValue == null || longitudeValue == null) {
        alert("Location not loaded yet. Please enjoy a cup of coffee!")
    } else {
        console.log("add button clicked " + reviewListName + deletedReviewListName);
        var review = createReviewFromInput(null, latitudeValue, longitudeValue, reviewListName);
        if(review != null) {
            var newReviewDiv = createNewReviewDiv(review, true, reviewListName, deletedReviewListName);

            // Save to local storage
            saveReviews(review, reviewListName);

            // Append reviewDiv
            var reviewBlockDiv = document.getElementById("reviewsBlock");
            reviewBlockDiv.insertBefore(newReviewDiv, reviewBlockDiv.firstChild);

            var mapId = "map" + review.id;
            showMap(mapId, review.latitude, review.longitude);
        }
    }
}

function createReviewFromInput(reviewParentIndex, latitudeValue, longitudeValue, reviewListName) {
    // Get input values
    var commentInput = document.getElementById("commentInput");
    var userRoleInput = document.getElementById("userRoleInput");
    var userNameInput = document.getElementById("userNameInput");
    var commentValue = commentInput.value;
    var userRoleValue = userRoleInput.value;
    var userNameValue = userNameInput.value;

    if(commentValue == null || commentValue == "") {
        alert("Please Leave Comment in the Text Area");
    } else if(userNameValue == null || userNameValue == "") {
        alert("Please Leave Your Name");
    } else {
        // Fetch the saved list again to get the index
        var reviewslistArray = reviewDAO.getStoreArray(reviewListName);
        var lastReview = reviewslistArray[reviewslistArray.length - 1];
        var reviewIndex;
        if(lastReview == null) {
            reviewIndex = 0;
        } else {
            reviewIndex = lastReview.id + 1;
        }

        console.log("reviewIndex: " + reviewIndex);

        // Create reviewDiv
        var review = {id: reviewIndex,
            parent: reviewParentIndex,
            userRole: userRoleValue,
            userName: userNameValue,
            comment: commentValue,
            latitude: latitudeValue,
            longitude: longitudeValue};
        console.log("review is created: " + JSON.stringify(review));

        // Clear text boxes
        eraseText("commentInput");
        eraseText("userNameInput");
    }
    return review;
}

function replyButtonClick(reviewParentIndex, reviewListName, deletedReviewListName) {
    console.log("reply button clicked");

    var review = createReviewFromInput(reviewParentIndex, latitudeValue, longitudeValue, reviewListName);
    var newReviewDiv = createNewReviewDiv(review, true, reviewListName, deletedReviewListName);

    // Save to local storage
    saveReviews(review, reviewListName);

    // Append reviewDiv
    var parentReviewDiv = document.getElementById("review" + reviewParentIndex);
    parentReviewDiv.appendChild(newReviewDiv);

    var mapId = "map" + review.id;
    showMap(mapId, review.latitude, review.longitude);
}

function deleteButtonClick(review, reviewListName, deletedReviewListName) {
    console.log("delete button clicked, try to remove " + review.id);
    console.log("reviewListName " + reviewListName + " deletedReviewListName " + deletedReviewListName);
    var reviewParentId = review.parent;
    if(reviewParentId == null) {
        console.log("No parent remove");
        //If no parent, search see if have child
        var childReview;
        var reviewslistArray = reviewDAO.getStoreArray(reviewListName);
        var isParent = false;
        if (reviewslistArray != null) {
            for(var i = 0; i < reviewslistArray.length; i++) {
                var reviewTemp = reviewslistArray[i];
                if(review.id == reviewTemp.parent) {
                    console.log("Match found for delete child");
                    isParent = true;
                    childReview = reviewTemp;
                    break;
                }
            }
        }
        if(!isParent) {
            //Remove child when delete parent
            deleteReview(review, reviewListName, deletedReviewListName);
        } else if(isParent) {
            alert("Please Delete Feedback then Delete Review!");
        }
    } else {
        console.log("Detach from parent");
        review.parent = null;
        deleteReview(review, reviewListName, deletedReviewListName);
    }
}

function deleteReview(review, reviewListName, deletedReviewListName) {
    var reviewIndex = review.id;
    var deletedDiv = document.getElementById("review" + reviewIndex);
    if(deletedDiv != null) {
        // Remove map from deleted div
        var mapId = "map" + reviewIndex;
        var mapDiv = document.getElementById(mapId);
        deletedDiv.removeChild(mapDiv);

        // Remove buttons
        var deleteButtonId = "Delete" + reviewIndex;
        var deleteButton = document.getElementById(deleteButtonId);
        deletedDiv.removeChild(deleteButton);

        var replyButtonId = "Reply" + reviewIndex;
        var replyButton = document.getElementById(replyButtonId);
        deletedDiv.removeChild(replyButton);

        // Remove div from User Reviews
        deletedDiv.parentNode.removeChild(deletedDiv);

        var deletedReviewsBlockDiv = document.getElementById("deletedReviewsBlock");
        deletedReviewsBlockDiv.appendChild(deletedDiv);
        console.log("Save review into " + deletedReviewListName);
        saveReviews(review, deletedReviewListName);
        console.log("Delete review from " + reviewListName);
        removeReview(review, reviewListName)
    }
}

function createButton(display, buttonId){
    var button = document.createElement("input");
    button.type = "button";
    button.value = display;
    button.id = display + buttonId;
    console.log("button.id: " + button.id);
    return button;
}

function createCommentInput(display, textId){
    var comment = document.createElement("input");
    comment.type = "comment";
    comment.value = display;
    comment.id = display + textId;
    console.log("comment.id: " + comment.id);
    return comment;
}

function eraseText(textId) {
    document.getElementById(textId).value = "";
}

module.exports = {
        reloadList: reloadList(),
}
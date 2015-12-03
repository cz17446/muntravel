window.onload = init;
var latitudeValue;
var longitudeValue;
function init() {
    initMap();
}

function initMap() {
    console.log("Start get current location");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition, displayError);
    } else {
        alert("Oops, no geolocation support");
    }
}

function getPosition(position) {
    var coords = position.coords;
    latitudeValue = coords.latitude;
    longitudeValue = coords.longitude;
    console.log("getPosition: You are at Latitude: " + latitudeValue
            + ", Longitude: " + longitudeValue);
    
    //Send to server
    $.post('/geolocation', {
        latitude : latitudeValue,
        longitude : longitudeValue
    });
}

function displayError(error) {
    var errorTypes = {
        0 : "Unknown error",
        1 : "Permission denied by user",
        2 : "Position is not available",
        3 : "Request timed out"
    };
    var errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMessage = errorMessage + " " + error.message;
    }
    var div = document.getElementById("location");
    div.innerHTML = errorMessage;
}
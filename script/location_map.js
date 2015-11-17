function showMap(mapId, latitude, longitude) {
    console.log("ShowMap: You are at Latitude: " + latitude + ", Longitude: " + longitude);
    var mapDiv = document.getElementById(mapId);
    console.log("mapId = " + mapId + " mapDiv is null? " + (mapDiv == null));

    if(mapDiv != null) {
        var googleLatAndLong = new google.maps.LatLng(latitude, longitude);
        var mapOptions = {
            center: googleLatAndLong,
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(mapDiv, mapOptions);

        var title = "Your Location";
        var content = "You are here: " + latitude + ", " + longitude;
        addMarker(map, googleLatAndLong, title, content);
    }
}

function displayError(error) {
    var errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };
    var errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMessage = errorMessage + " " + error.message;
    }
    var div = document.getElementById("location");
    div.innerHTML = errorMessage;
}

function addMarker(map, latlong, title, content) {
    var markerOptions = {
        position: latlong,
        map: map,
        title: title,
        clickable: true
    };
    var marker = new google.maps.Marker(markerOptions);

    var infoWindowOptions = {
        content: content,
        position: latlong
    };
    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    google.maps.event.addListener(marker, "click", function() {
        infoWindow.open(map);
    });
}

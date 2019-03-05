var resedentialAssociationsSrc = "http://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1EhA2C9e8eKnb1edGd8gyBj0yhTY&ver=" + Date.now();

var torontoCenter = { lat: 43.72, lng: -79.3849 };
var torontoBounds = { north: 43.9, east: -78.75, south: 43.56, west: -80 };

function captureOpen() {
  var capture = document.getElementById("capture");
  if (!capture.classList.contains("open")) {
    capture.classList.add("open");
  }
}

function captureClose() {
  var capture = document.getElementById("capture");
  if (capture.classList.contains("open")) {
    capture.classList.remove("open");
  }
}

document.getElementById("capture-close").addEventListener("click", captureClose);

function clickHandler(event) {
  var feature = event.featureData;
  console.log(feature)
  var name = feature.name;
  var description = feature.description || "";
  var nameEl = "<div class='feature-item feature-name'><div class='feature-item-title'>name</div>" + name + "</div>";
  var descriptionEl = "<div class='feature-item feature-description'><div class='feature-item-title'>description</div>" + description + "</div>";
  var content = nameEl + descriptionEl;
  var captureTitle = document.getElementById('capture-title');
  var captureContent = document.getElementById('capture-content');
  captureTitle.innerHTML = name;
  captureContent.innerHTML = content;
  captureOpen();
}

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    minZoom: 11,
    zoom: 11,
    center: torontoCenter,
    restriction: {
      latLngBounds: torontoBounds,
      strictBounds: false
    },
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
    }
  });

  map.data.loadGeoJson("data/toronto-boundary.json");
  map.data.setStyle({ strokeWeight: 0, fillOpacity: 0.15, clickable: false });

  var raKmlLayer = new google.maps.KmlLayer(resedentialAssociationsSrc, {
    suppressInfoWindows: true,
    preserveViewport: true,
    map: map
  });
  raKmlLayer.addListener('click', clickHandler);

  var wardLayer = new google.maps.Data();
  wardLayer.loadGeoJson("data/toronto-wards.json");
  wardLayer.setStyle({ fillColor: "transparent", strokeColor: "red", strokeWeight: 2, zIndex: 1 });
  wardLayer.setMap(map);
}
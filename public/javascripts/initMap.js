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

function createFeatureItem(title, content) {
  return "<div class='feature-item'><div class='feature-item-title'>" + title + "</div>" + content + "</div>";
}

function clickHandler(event) {
  var name = "";
  var content = "";
  if (event.featureData) {
    var nameItem = createFeatureItem("name", event.featureData.name);
    var descriptionItem = createFeatureItem("description", event.featureData.description || "");
    name = event.featureData.name;
    content += nameItem + descriptionItem;
  } else {
    name = event.feature.getProperty("name");
    event.feature.forEachProperty(function(value, key) {
      var item = createFeatureItem(key, value);
      content += item;
    });
  }
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

  var libraryLayer = new google.maps.Data();
  libraryLayer.loadGeoJson("data/toronto-libraries.json")
  libraryLayer.setStyle({
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      scaledSize: new google.maps.Size(32, 32)
    },
    zIndex: 2
  })
  libraryLayer.addListener('click', clickHandler);
  libraryLayer.addListener('mouseover', function(e) {
    libraryLayer.revertStyle();
    libraryLayer.overrideStyle(e.feature, {
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        scaledSize: new google.maps.Size(38, 38)
      }
    });
  });
  libraryLayer.addListener('mouseout', function(e) {
    libraryLayer.revertStyle();
  });
  libraryLayer.setMap(map);

  var tdsbLayer = new google.maps.Data();
  tdsbLayer.loadGeoJson("data/school_tdsb.geojson.json")
  tdsbLayer.setStyle({
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      scaledSize: new google.maps.Size(32, 32)
    },
    zIndex: 2
  })
  tdsbLayer.addListener('click', clickHandler);
  tdsbLayer.addListener('mouseover', function(e) {
    tdsbLayer.revertStyle();
    tdsbLayer.overrideStyle(e.feature, {
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
        scaledSize: new google.maps.Size(38, 38)
      }
    });
  });
  tdsbLayer.addListener('mouseout', function(e) {
    tdsbLayer.revertStyle();
  });
  tdsbLayer.setMap(map);

  var communityCentresLayer = new google.maps.Data();
  communityCentresLayer.loadGeoJson("data/community_centres.geojson.json")
  communityCentresLayer.setStyle({
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
      scaledSize: new google.maps.Size(32, 32)
    },
    zIndex: 2
  })
  communityCentresLayer.addListener('click', clickHandler);
  communityCentresLayer.addListener('mouseover', function(e) {
    communityCentresLayer.revertStyle();
    communityCentresLayer.overrideStyle(e.feature, {
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
        scaledSize: new google.maps.Size(38, 38)
      }
    });
  });
  communityCentresLayer.addListener('mouseout', function(e) {
    communityCentresLayer.revertStyle();
  });
  communityCentresLayer.setMap(map);
}
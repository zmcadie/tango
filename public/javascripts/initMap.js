var torontoCenter = { lat: 43.72, lng: -79.3849 };
var torontoBounds = { north: 43.9, east: -78.75, south: 43.56, west: -80 };

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
}
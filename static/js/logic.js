function createMap(earthquakes) {

  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });
  var baseMap = {
    "Light Map": lightmap
  };
  var overlayMap = {
    "Earthquakes": earthquakes
  };

  var map = L.map("mapid", {
    center: [50, 29],
    zoom: 12,
    layers: [lightmap, earthquakes]
  });

  L.control.layers(baseMap, overlayMap, {
    collapsed: false
  }).addTo(map);
}

function createMarkers(response) {
  var earthquakes = response.features;
  console.log(earthquakes)
  var earthquakeMarkers = [];

  for (var index = 0; index < earthquakes.length; index++) {
    var earthquake = earthquakes[index].geometry.coordinates;
    console.log(earthquake)
    var earthquakeMarker = L.marker([earthquake[0], earthquake[1]])
    .bindPopup("EARTHQUAKEEEE");

    earthquakeMarkers.push(earthquakeMarker);
  }
  createMap(L.layerGroup(earthquakeMarkers));
  console.log(earthquakeMarkers)
}

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson").then(createMarkers);

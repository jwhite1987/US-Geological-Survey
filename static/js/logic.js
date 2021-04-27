

var map = L.map("map", {
  center: [50.67, 29.79],
  zoom: 3,
  attributionControl: false
});

L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  // attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  maxZoom: 18,
  id: "streets-v11",
  accessToken: API_KEY
}).addTo(map);

// L.control.layers(baseMaps, overlayMaps, {
//   collapsed: false
// }).addTo(map);


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson").then(function(response) {
  var earthquakes = response.features;
  console.log(earthquakes)
  // var markers = L.markerClusterGroup();
  L.geoJson(response).addTo(map);
  for (var index = 0; index < earthquakes.length; index++) {
    var earthquake = earthquakes[index].geometry.coordinates;
    console.log(earthquake[0], earthquake[1]);
    L.circleMarker([earthquake[0], earthquake[1]]).addTo(map)
    .bindPopup("EARTHQUAKEEEE"); }

    geojson = L.choropleth(data, {

      // Define what  property in the features to use
      valueProperty: "MHI2016",

      // Set color scale
      scale: ["#ffffb2", "#b10026"],

      // Number of breaks in step range
      steps: 10,

      // q for quartile, e for equidistant, k for k-means
      mode: "q",
      style: {
        // Border color
        color: "#fff",
        weight: 1,
        fillOpacity: 0.8
      },

      // Binding a pop-up to each layer
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Zip Code: " + feature.properties.ZIP + "<br>Median Household Income:<br>" +
          "$" + feature.properties.MHI2016);
      }
    }).addTo(map);



    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend");
      var limits = geojson.options.limits;
      var colors = geojson.options.colors;
      var labels = [];

      // Add min & max
      var legendInfo = "<h1>Median Income</h1>" +
        "<div class=\"labels\">" +
          "<div class=\"min\">" + limits[0] + "</div>" +
          "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
        "</div>";

      div.innerHTML = legendInfo;

      limits.forEach(function(limit, index) {
        labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
      });

      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;
    };

    // Adding legend to the map
    legend.addTo(map);






});

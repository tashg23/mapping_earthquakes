// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
});

// We create a second, optional tile layer
let satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
});

let baseMaps = {
  Street: streets, 
  Satellite: satellite
};

// Create the map object with center, zoom level and default layer. -- alternative to setView method
let map = L.map('mapid', {
  center: [39.5, -98.5],
  zoom: 3,
  layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map 
L.control.layers(baseMaps).addTo(map);

let earthquakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// This function returns the style data for each of the earthquakes we plot on the map
// We pass the magnitude of the earthquake into a function to calculate the radius 

function styleInfo (feature) {
  return {
    opacity: 1, 
    fillOpacity: 1, 
    fillColor: "#ffae42", 
    color: "#000000",
    radius: getRadius(), 
    stroke: true, 
    weight: 0.5
  };
}

// This function determines the radius of the earthquake marker based on its magnitude 
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1

function getRadius (magnitude) {
  if (magnitude === 0) {
    return 1; 
  }
  return magnitude * 4;
};

// Grabbing our GeoJSON data 
d3.json(earthquakes).then(function(data) {
  console.log(data);
  // Creating a GeoJSON layer with the retrieved data 
  L.geoJSON(data, {
    // We turn each feature into a circleMarker on the map
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    }, 
    style: styleInfo
  })
  .addTo(map)
});
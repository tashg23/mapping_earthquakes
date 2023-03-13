// Create the map object with a center of the Earth
//let map = L.map('mapid').setView([30,30], 2);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
});

// We create the tile layer that will be the background of our map.
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
  center: [43.7, -79.3],
  zoom: 11,
  layers: [satellite]
})

// Pass our map layers into our layers control and add the layers control to the map 
L.control.layers(baseMaps).addTo(map);

let torontoHoods = "https://raw.githubusercontent.com/tashg23/mapping_earthquakes/Mapping_GeoJSON_Polygons/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json"

// Create a style for the lines 
let myStyle = {
  color: "#ffffa1", 
  weight: 5
};

// Grabbing our GeoJSON data 
d3.json(torontoHoods).then(function(data) {
  console.log(data);
  // Creating a GeoJSON layer with the retrieved data 
  L.geoJSON(data, {
    fillColor: "yellow", 
    color: "blue", 
    weight: 1, 
    onEachFeature: function (feature, layer) {
      layer.bindPopup("<h2> Neighbourhood: " + feature.properties.AREA_NAME + "</h2>")
    }
  })
  .addTo(map)
});


















// // Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"14",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

// // Grabbing our GeoJSON data 
// L.geoJson(sanFranAirport, {
//   onEachFeature: function(feature, layer) {
//     console.log(layer); 
//     layer.bindPopup("<h2>" + feature.properties.faa + "</h2> <hr> <h3>" +feature.properties.name + "</h3>");
//   }
// }).addTo(map);


// // Grabbing our GeoJSON data 
// L.geoJSON(sanFranAirport, {
//   // We turn each feature into a marker on the map 
//   pointToLayer: function (feature, latlng) {
//     console.log(feature); 
//     return L.marker(latlng)
//     .bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3> " + feature.properties.city + ", " + feature.properties.country + "</h3");
//   }
// }).addTo(map);

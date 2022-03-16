let map = L.map('map', {
  center: [30, 120],
  zoom: 9,
});


L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
  maxZoom: 20,
  attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
}).addTo(map);

let allLayers = L.layerGroup().addTo(map);

// https://stackoverflow.com/questions/34897704/use-svg-as-map-using-leaflet-js

var myRenderer = L.canvas({ padding: 0.5 });
var line = L.polyline(coordinates, { renderer: myRenderer });
var circle = L.circle(center, { renderer: myRenderer });


























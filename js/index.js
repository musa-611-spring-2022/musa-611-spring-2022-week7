
let map = L.map('map').setView([29.9652, -90.09820], 13);

let SchoolCensus = 'https://raw.githubusercontent.com/bri-ne/JSstorymap/main/Data/SchoolCensus.geojson'
let rtcc = 'https://raw.githubusercontent.com/bri-ne/JSstorymap/main/Data/RTCC4326.geojson'

var nopdIcon = L.icon({
  iconUrl: 'img/nopd.png',
  iconSize: [40, 40],
  iconAnchor: [0, 0],
  popupAnchor: [-3, -10]
});
var markerCustom = L.icon({
  iconUrl: 'img/marker2.png',
  iconSize: [32, 40],
  iconAnchor: [0, 0],
  popupAnchor: [12, 40]
});


const cartopositron = 'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png'
const mapurl = 'https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=709be316cae8460c88880ef29293ca56'
const dburl = 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png'
L.tileLayer(cartopositron, {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
}).addTo(map);


/*
L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
}).addTo(map);
*/

/* Map color Functions*/
function getColorSchoolFunding(d) {
  return d > 70000 ? '#800026' :
    d > 60000  ? '#BD0026' :
    d > 50000  ? '#E31A1C' :
    d > 40000  ? '#FC4E2A' :
    d > 30000   ? '#FD8D3C' :
    d > 20000   ? '#FEB24C' :
    d > 10000   ? '#FED976' :
                '#FFEDA0';
  }
function styleSchoolFunding(feature) {
  return {
      fillColor: getColorSchoolFunding(feature.properties.TotalTotal),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

function onEachFeatureSchoolFunding(feature, layer){
  //use feature.properties to construct popup html
  var popupContentFunding = `<p> School: ${feature.properties.School} <br> Funding per Pupil: ${feature.properties.TotalTotal} </p> 
  <p> 30% Income: ${feature.properties.P30P} </p>`;

  layer.bindPopup(popupContentFunding);
  };
/*
function onEachFeatureDemo(feature, layer){
  //use feature.properties to construct popup html
  var popupContentDemo = '<p>' + 'Black or African American Population: ' + feature.properties.BAA.toString() + '</p>' ;
  layer.bindPopup(popupContentDemo);
};*/



fetch(SchoolCensus)
  .then(resp => resp.json())
  .then(data => { 
    L.geoJSON(data, {style: styleSchoolFunding,  
      onEachFeature: onEachFeatureSchoolFunding
    }).addTo(map);
    });



/* below works but trying something else 
fetch(SchoolCensus)
  .then(resp => resp.json())
  .then(data => {
    L.geoJSON(data, {style: feature => {
      let color;
      if (feature.properties.TotalTotal > 1000) {
        color = 'pink';
      } else {
        color = 'yellow';
      }
      return {
        color: color
      }},
      onEachFeature: function(feature, layer) {
        var popupContent = '<p>' + 'Black or African American Population: ' + feature.properties.BAA.toString() + '</p>' ;
        layer.bindPopup(popupContent);
    }
  }).addTo(map);
  });
*/



fetch(rtcc)
.then(resp => resp.json())
.then(data => {
  L.geoJSON(data, {onEachFeature: function(feature) {
    var markersClust = new L.MarkerClusterGroup();
    var marker = L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]]);
    markersClust.addLayer(marker);
    markersClust.addTo(map)
    }});
});

/*
fetch(rtcc)
.then(resp => resp.json())
.then(data => {
  L.geoJSON(data, {onEachFeature: function(feature) {
    var markersClust = new L.MarkerClusterGroup();
    markersClust.addLayer(L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], 
      {icon: markerCustom}));
    markersClust.addTo(map)
    }});
});

*/

L.marker([29.87048922812714, -90.00716378733559], 
  {icon: nopdIcon}).addTo(map);




/* Map color Functions*/
function getColor(d) {
  return d > 99 ? '#fde725' :
    d > 8  ? '#bddf26' :
    d > 79  ? '#7ad151' :
    d > 69  ? '#44bf70' :
    d > 59   ? '#22a884' :
    d > 49   ? '#21918c' :
    d > 39   ? '#2a788e' :
    d > 29   ? '#355f8d' :
    d > 19   ? '#414487' :
    d > 9   ? '#482475' :
                '#440154';
  }

/* DEMO */  
function styleDemo(feature) {
  return {
      fillColor: getColor(feature.properties.NonWhite_P),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

function onEachFeatureDemo(feature, layer){
  //use feature.properties to construct popup html
  var popupContentDemo = `<p> Percent Non-White Population: ${feature.properties.NonWhite_P} <br> Camera Count: ${feature.properties.CameraCount} </p>`;

  layer.bindPopup(popupContentDemo);
  };
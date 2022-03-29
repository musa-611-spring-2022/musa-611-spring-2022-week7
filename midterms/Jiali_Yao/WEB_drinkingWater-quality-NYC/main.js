var map = L.map('map').setView([40.70, -73.94], 10);
const timeLayer = L.layerGroup().addTo(map);

L.tileLayer('https://api.mapbox.com/styles/v1/yaoyun/cl0r2ny3l000m14jsfu46ldim/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoieWFveXVuIiwiYSI6ImNqb25zMXRldDExb2Uzdm10dWxrNjg4c3EifQ.6ap1T463dqPFnH0MGiVXDQ', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//const schoolList = document.querySelector('#school-list');
//const gradeLevelSelect = document.querySelector('#grade-level-select');
//const zipCodeSelect = document.querySelector('#zip-code-select');

var geojsonMarkerOptions = {
    radius: 3,
    fillColor: "#89CFEF",
    color: "#000",
    weight: 0.5,
    opacity: 1,
    fillOpacity: 1
};

let updatesiteMarkers = (sitesToShow) => {
  timeLayer.clearLayers();
  sitesToShow.forEach((SampleSite) => {
    const marker = L.geoJson(SampleSite, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
      }
    })
    .bindPopup('Sample Site:' + SampleSite.properties['Sample_Site']);
    timeLayer.addLayer(marker);
  });
};

let districtStyle = {
  weight: 1,
  color: "#FA8072",
  fillOpacity: 0
}

L.geoJson(BoroughBoundaries, { style: districtStyle }).bindTooltip(layer => `Click on the map titled <b>${layer.feature.properties.boro_name}</b>
   <br>for more details about the drinking water</br> quality in this district`,
  {permanent: false,
    offset: [-50, -60],
    direction: "right",
}).addTo(map);




updatesiteMarkers(SampleSites);

/* globals showdown */

let map = L.map('map').setView([0, 0], 0);
let layerGroup = L.layerGroup().addTo(map);
let lifeCollection = { features: [] };

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map);

fetch('https://opendata.arcgis.com/datasets/8bc0786524a4486bb3cf0f9862ad0fbf_0.geojson')
  .then(resp => resp.json())
  .then(data => {
    L.geoJSON(data, {
      filter(feature) {
        if (feature.properties.NAME10 == 13 ||
          feature.properties.NAME10 == 20 ||
          feature.properties.NAME10 == 32 ||
          feature.properties.NAME10 == 33 ||
          feature.properties.NAME10 == 36)
          return true;
      },
      onEachFeature(feature, layer) {
        layer.bindTooltip(feature.properties.NAMELSAD10);
        layer.setStyle({ fillColor: "#000000" });
        layer.setStyle({ color: "#4287f5" });
      },
    }).addTo(map);
  });

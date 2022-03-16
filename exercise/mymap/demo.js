function initDemoMap() {
  // var Esri_WorldImagery = L.tileLayer(
  //   "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  //   {
  //     attribution:
  //       "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, " +
  //       "AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
  //   }
  // );

  var Esri_DarkGreyCanvas = L.tileLayer(
    "http://{s}.sm.mapstack.stamen.com/" +
    "(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/" +
    "{z}/{x}/{y}.png",
    {
      attribution:
        "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, " +
        "NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community"
    }
  );

  // var baseLayers = {
  //   Satellite: Esri_WorldImagery,
  //   "Grey Canvas": Esri_DarkGreyCanvas
  // };

  var map = L.map("map", {
    layers: [Esri_DarkGreyCanvas]
  });

  // var layerControl = L.control.layers(baseLayers);
  // layerControl.addTo(map);
  map.setView([-22, 150], 5);

  return {
    map: map,
    // layerControl: layerControl
  };
}

// demo map
var mapStuff = initDemoMap();
var map = mapStuff.map;

$.getJSON("data/wind-global.json", function (data) {
  var velocityLayer = L.velocityLayer({
    displayValues: true,
    displayOptions: {
      velocityType: "Global Wind",
      position: "bottomleft",
      emptyString: "No wind data"
    },
    data: data,
    // minVelocity: 10,
    // maxVelocity: 15,
    colorScale: ["rgba(255,255,255,100)"],
    velocityScale: 0.005,
    particleAge: 90,
    opacity: 0.1,
    particleMultiplier: 0.011,

  });

  // layerControl.addOverlay(velocityLayer, "Wind - Global");
  velocityLayer.addTo(map);
});

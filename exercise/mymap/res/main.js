let map = L.map('map', {
  center: mapCenter,
  zoom: 2,
  scrollWheelZoom: false,
  zoomSnap: 0.001,
  dragging: false,
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 20
}).addTo(map);

// L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
//   maxZoom: 20,
//   attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
// }).addTo(map);

let allLayers = L.layerGroup().addTo(map);

// https://stackoverflow.com/questions/34897704/use-svg-as-map-using-leaflet-js

// var myRenderer = L.canvas({ padding: 0.5 });
// var line = L.polyline(coordinates, { renderer: myRenderer });
// var circle = L.circle(center, { renderer: myRenderer });

class Camera {
  constructor(map) {
    this.map = map;
    this.zoom = map.getZoom();

    // this.animationLoop;
    // this.then = Date.now();
    // this.v = 0.2; // pixel per frame
    // this.frameRate = 60;
    // this.draw = this.draw.bind(this);
    this.update = this.update.bind(this);
  }

  getCenter() {
    let coords = this.map.getCenter();
    this.x = coords.lat;
    this.y = coords.lng;
  }

  setDestination(x, y) {
    this.destinationX = x;
    this.destinationY = y;
  }

  update() {
    this.zoom = this.map.getZoom();

    // this.dx = (this.destinationX - this.x) * this.v;
    // this.dy = (this.destinationY - this.y) * this.v;
    // this.dz = (this.destinationZ - this.zoom) * 0.1;
    // this.zoom += this.dz;

    // if (this.dx ** 2 + this.dy ** 2 < 0.001) {
    //   this.x = this.destinationX;
    //   this.y = this.destinationY;
    //   return
    // }

    // this.x = this.x + this.dx;
    // this.y = this.y + this.dy;

    this.map.setView([this.destinationX, this.destinationY], this.zoom,
      { animate: true, duration: 1, });
  }

  // draw() {
  //   this.animationLoop = requestAnimationFrame(this.draw);
  //   let now = Date.now();
  //   let delta = now - this.then;
  //   let frameTime = 1000 / this.frameRate;
  //   if (delta > frameTime) {
  //     this.then = now - delta % frameTime;
  //     this.zoom = this.map.getZoom();
  //     this.dz = (this.destinationZ - this.zoom) * 0.2;
  //     this.zoom += this.dz;
  //     this.map.setView([this.destinationX, this.destinationY], this.zoom,
  //       { animate: true, duration: 1, });
  //   }
  // }
}

let camera = new Camera(map);
camera.setDestination(...mapCenter);
// camera.draw()

// =============
// getting data

let beap;
$.getJSON('data/trail-great.geojson', (data) => {
  // console.log(data.features);
  beap = data.features.filter((x) => {
    return x.properties["individual-local-identifier"] === "XNC"
  });
});

let windLayer;
$.getJSON("data/wind-global.json", function (data) {
  windLayer = L.velocityLayer({
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
});

// =======================================
// # section 2 #
sectionRenderer[2] = () => {
  if (!beap) {
    console.log("section 1 not ready!");
    return;
  }
  L.geoJSON(beap[0], {
    pointToLayer: (x, y) => L.circleMarker(y),
    style: { color: "darkorange" }
  })
    .bindTooltip("Broome, Australia", { offset: [20, 0], direction: "right" })
    .addTo(allLayers)
    .openTooltip();
};


// =======================================
// # section 3 #

sectionRenderer[3] = () => {
  if (!beap) return;
  let pts = beap.slice(0, 60).map(x => x.geometry.coordinates.slice().reverse());
  console.log(pts)

  pts.forEach((pt) => {
    L.circleMarker(pt, {
      color: "darkorange",
      radius: 4,
    }).addTo(allLayers);
  })

  L.polyline(pts, {
    color: "darkorange",
  }).addTo(allLayers);

  windLayer.addTo(allLayers);
};




$(() => {
  onScroll();
});





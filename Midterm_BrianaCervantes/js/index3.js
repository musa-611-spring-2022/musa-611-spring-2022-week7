let map = L.map('map').setView([29.9652, -90.09820], 13);
const cartopositron = 'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png'
L.tileLayer(cartopositron, {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
}).addTo(map);
let layerGroup = L.layerGroup().addTo(map)
let secondlayerGroup = L.layerGroup()

var overlayMaps = {
  "Cameras": secondlayerGroup
};

L.control.layers(overlayMaps).addTo(map);
/*var control = L.control.layers(overlayMaps)
control.addTo(map);*/

/* === This is my Data === */
const SchoolCensus = 'https://raw.githubusercontent.com/bri-ne/JSstorymap/main/Data/SchoolCensus.geojson'
const rtcc = 'https://raw.githubusercontent.com/bri-ne/JSstorymap/main/Data/RTCC4326.geojson'
const demo = 'https://raw.githubusercontent.com/bri-ne/JSstorymap/main/Data/census/DemoCamera_BG4326.geojson'
const rent = 'https://raw.githubusercontent.com/bri-ne/JSstorymap/main/Data/census/RentCamera_BG4326.geojson'
const schoolData =  'https://raw.githubusercontent.com/bri-ne/JSstorymap/main/Data/schoolonly/SchoolData_geo3452.geojson'
const mort = 'https://raw.githubusercontent.com/bri-ne/JSstorymap/main/Data/census/mortCamera_BG4326.geojson'
/* === These are my vars for my functions to fill the slides === */
const slideTitleDiv = document.querySelector('.slide-title');
const slideContentDiv = document.querySelector('.slide-content');
const slidePrevButton = document.querySelector('#prev-slide');
const slideNextButton = document.querySelector('#next-slide');

/* == Set the slide == */

let slideToShow = { features: [] };
let currentSlideIndex = 0;


function getData(callback) {
  fetch('js/locations.json')
  .then(resp => resp.json())
  .then(data => { 
    slideToShow = data;
    if (callback){
      callback();
    };
  })
  }; 


function makeDataCollection(slide_number) {
    return {
      type: 'FeatureCollection',
      features: slideToShow.features.filter(f => f.properties.slide === slide_number),
    };
  }


function initialSlide() {
  const slideNOW = slides[0];
  fillSlide(slideNOW);
  let mapToShow = makeDataCollection(slideNOW.slide);
  updateMap(mapToShow, slideNOW)
  let layer = updateMap(mapToShow, slideNOW);
  if (slideNOW.showimg) {
    layer.eachLayer(l => {
      l.bindPopup(l => l.feature.properties.img, {
        maxWidth : 560} ) 
      l.openPopup();
    });
  }; 
  if (slideNOW.autobounds === 'no') {
    map.flyTo([29.9652, -89.97020], 12); 
  } else {
    map.flyToBounds(layer.getBounds());
  }
  return layer
  /*map.flyToBounds(layer.getBounds())*/
};

function showCurrentSlide() {
  const slideNOW = slides[currentSlideIndex];
  fillSlide(slideNOW);
  let mapToShow = makeDataCollection(slideNOW.slide);  
  updateMap(mapToShow, slideNOW);
  let layer = updateMap(mapToShow, slideNOW);
  if (slideNOW.autobounds === 'no') {
    map.flyTo([29.996276618892175, -90.00590556714026], 12);
  } else {
    map.flyToBounds(layer.getBounds());
  };
  if (slideNOW.showpopups) {
    layer.eachLayer(l => {
      l.bindTooltip(l.feature.properties.label, { permanent: true });
      l.openTooltip();
    });
  }; 
  if (slideNOW.showimg) {
    layer.eachLayer(l => {
      l.bindPopup(l => l.feature.properties.img, {
        maxWidth : 560} ) 
      l.openPopup();
    });
  }; 
};


function fillSlide(slide) {
  const converter = new showdown.Converter({ smartIndentationFix: true });

  slideTitleDiv.innerHTML = `<h2>${slide.title}</h2>`;
  slideContentDiv.innerHTML = converter.makeHtml(slide.content);
};


function updateMap(mapToShow, slide) {
  layerGroup.clearLayers();
  iconuse = slide.icon;

  if (slide.dataUse === "cameraData") {
    fetch(rtcc)
    .then(resp => resp.json())
    .then(data => {
      L.geoJSON(data, {onEachFeature: function(feature) {
        var marker = L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
          {icon: iconuse});
          layerGroup.addLayer(marker);
        }});
    });
    
    const geoJsonLayer = layerGroup;
    return geoJsonLayer;
  }

  if (slide.dataUse === "mortData") {
    fetch(mort)
    .then(resp => resp.json())
    .then(data => { 
      L.geoJSON(data, {style: styleMort,  
        onEachFeature: onEachFeatureMort
      }).addTo(layerGroup)
      });

    fetch(rtcc)
    .then(resp => resp.json())
    .then(data => {
      L.geoJSON(data, {onEachFeature: function(feature) {
        var marker = L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
          {icon: iconuse});
          secondlayerGroup.addLayer(marker);
        }});
      }); 

      
    const geoJsonLayer =  layerGroup;
    return geoJsonLayer;
  }  

  if (slide.dataUse === "demoData") {
    fetch(demo)
    .then(resp => resp.json())
    .then(data => { 
      L.geoJSON(data, {style: styleDemo,  
        onEachFeature: onEachFeatureDemo
      }).addTo(layerGroup)
      });
    
    const geoJsonLayer =  layerGroup;
    return geoJsonLayer;
    
  }

  if (slide.dataUse === "rentData") {
    fetch(rent)
    .then(resp => resp.json())
    .then(data => { 
      L.geoJSON(data, {style: styleRent,  
        onEachFeature: onEachFeatureRent
      }).addTo(layerGroup)
      });

    fetch(rtcc)
    .then(resp => resp.json())
    .then(data => {
      var markersClust = new L.MarkerClusterGroup();
      L.geoJSON(data, {onEachFeature: function(feature) {
        var marker = L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
          {icon: iconuse});
          secondlayerGroup.addLayer(marker);
        }});
      });
    const geoJsonLayer =  layerGroup;  
    return geoJsonLayer;

  } else {
    if (slide.icon && slide.img) {
      const geoJsonLayer = L.geoJSON(mapToShow, { pointToLayer: (p, latlng) => L.marker(latlng, 
        {icon: iconuse}) })
        /* .bindTooltip(l => l.feature.properties.label, { permanent: true }) */
        .bindPopup(l => l.feature.properties.img, {
          maxWidth : 560} ) 
        .addTo(layerGroup).openPopup();

        return geoJsonLayer;
    } 
    if (slide.icon && !slide.img) {
      const geoJsonLayer = L.geoJSON(mapToShow, { pointToLayer: (p, latlng) => L.marker(latlng, 
        {icon: iconuse}) }).addTo(layerGroup)/*
        .bindTooltip(l => l.feature.properties.label, { permanent: true })
        .addTo(layerGroup).openTooltip();*/

        return geoJsonLayer;
    } 
    if (slide.img && !slide.icon) {
      const geoJsonLayer = L.geoJSON(mapToShow, { pointToLayer: (p, latlng) => L.marker(latlng) })
        .bindTooltip(l => l.feature.properties.label, { permanent: true })
        .bindPopup( l => l.feature.properties.img, {
          maxWidth : 450}  )  /*getCaption(slide) +  getIMG(slide) */
        .addTo(layerGroup).openPopup();

        return geoJsonLayer;
    } else {
      const geoJsonLayer = L.geoJSON(mapToShow, { pointToLayer: (p, latlng) => L.marker(latlng) })
        .bindTooltip(l => l.feature.properties.label, { permanent: true })
        .addTo(layerGroup).openTooltip();

        return geoJsonLayer;
    }

  
    
  };

}

function getIMG(slide) {
  let image = slide.img;
  return image;
}

function getIMG2(mapToShow) {
  let image = slide.img;
  return image;
}


function getCaption(slide) {
  let caption = slide.caption;
  return caption;
}

function nextSlide() {
  currentSlideIndex++;

  if (currentSlideIndex === slides.length) {
    currentSlideIndex = 0;
  }
  map.removeControl(legend);
  map.removeControl(legend2);
  showCurrentSlide();
};

function prevSlide(){
  currentSlideIndex--;

  if (currentSlideIndex < 0) {
    currentSlideIndex = slides.length - 1;
  }
  map.removeControl(legend);
  map.removeControl(legend2);
  showCurrentSlide();
}


slidePrevButton.addEventListener('click', prevSlide);
slideNextButton.addEventListener('click', nextSlide);



getData(initialSlide);
console.log("data in");

console.log('istherestuffonthemap')



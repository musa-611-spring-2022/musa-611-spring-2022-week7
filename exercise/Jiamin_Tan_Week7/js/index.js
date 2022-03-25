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
      /* ==========
      onEachFeature(feature, layer) {
        layer.bindTooltip(feature.properties.NAMELSAD10);
        layer.setStyle({ fillColor: "#000000" });
        layer.setStyle({ color: "#4287f5" });
      },
      ========== */
    })
    //.addTo(map);
  });

fetch('./data/Fall_2021_Routes.geojson')
  .then(resp => resp.json())
  .then(data => {
    L.geoJSON(data, {
			filter(feature) {
        if (feature.properties.LineAbbr == '12' ||
          feature.properties.LineAbbr == '49' ||
          feature.properties.LineAbbr == '64')
          return true;
      },
      /* ==========
      onEachFeature(feature, layer) {
        layer.bindTooltip(feature.properties.NAMELSAD10);
        layer.setStyle({ fillColor: "#000000" });
        layer.setStyle({ color: "#4287f5" });
      },
      ========== */
    })
    .addTo(map);
  });


/////////////////////////////////////////////////////////////
//copied from Mjumbe

let currentSlideIndex = 0;

const slideTitleDiv = document.querySelector('.slide-title');
const slideContentDiv = document.querySelector('.slide-content');
const slidePrevButton = document.querySelector('#prev-slide');
const slideNextButton = document.querySelector('#next-slide');
const slideJumpSelect = document.querySelector('#jump-to-slide');

function updateMap(collection) {
  layerGroup.clearLayers();
  const geoJsonLayer = L.geoJSON(collection, { pointToLayer: (p, latlng) => L.marker(latlng) })
    .bindTooltip(l => l.feature.properties.label)
    .addTo(layerGroup);

  return geoJsonLayer;
}

function makeSecCollection(section) {
  return {
    type: 'FeatureCollection',
    features: lifeCollection.features.filter(f => f.properties.section === section),
  };
}

function showSlide(slide) {
  const converter = new showdown.Converter({ smartIndentationFix: true });

  slideTitleDiv.innerHTML = `<h2>${slide.title}</h2>`;
  slideContentDiv.innerHTML = converter.makeHtml(slide.content);

  const collection = slide.section ? makeSecCollection(slide.section) : lifeCollection;
  const layer = updateMap(collection);

  function handleFlyEnd() {
    if (slide.showpopups) {
      layer.eachLayer(l => {
        l.bindTooltip(l.feature.properties.label, { permanent: true });
        l.openTooltip();
      });
    }
    map.removeEventListener('moveend', handleFlyEnd);
  }

  map.addEventListener('moveend', handleFlyEnd);
  if (slide.bounds) {
    map.flyToBounds(slide.bounds);
  } else if (slide.section) {
    map.flyToBounds(layer.getBounds());
  }
}

function showCurrentSlide() {
  const slide = slides[currentSlideIndex];
  showSlide(slide);
}

function goNextSlide() {
  currentSlideIndex++;

  if (currentSlideIndex === slides.length) {
    currentSlideIndex = 0;
  }

  showCurrentSlide();
}

function goPrevSlide() {
  currentSlideIndex--;

  if (currentSlideIndex < 0) {
    currentSlideIndex = slides.length - 1;
  }

  showCurrentSlide();
}

function jumpToSlide() {
  currentSlideIndex = parseInt(slideJumpSelect.value, 10);
  showCurrentSlide();
}

function initSlideSelect() {
  slideJumpSelect.innerHTML = '';
  for (const [index, slide] of slides.entries()) {
    const option = document.createElement('option');
    option.value = index;
    option.innerHTML = slide.title;
    slideJumpSelect.appendChild(option);
  }
}

function loadLifeData() {
  fetch('data/GraysFerry.json')
    .then(resp => resp.json())
    .then(data => {
      lifeCollection = data;
      showCurrentSlide();
    });
}

slidePrevButton.addEventListener('click', goPrevSlide);
slideNextButton.addEventListener('click', goNextSlide);
slideJumpSelect.addEventListener('click', jumpToSlide);

initSlideSelect();
showCurrentSlide();
loadLifeData();

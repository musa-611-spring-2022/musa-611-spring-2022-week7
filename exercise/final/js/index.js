/* globals showdown, slides */

let map = L.map('map').setView([0, 0], 0);
let layerGroup = L.layerGroup().addTo(map);
let lifeCollection = { features: [] };

L.tileLayer('https://api.mapbox.com/styles/v1/mjumbe-test/cl0r2nu2q000s14q9vfkkdsfr/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWp1bWJlLXRlc3QiLCJhIjoiY2wwb3BudmZ3MWdyMjNkbzM1c2NrMGQwbSJ9.2ATDPobUwpa7Ou5jsJOGYA', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  id: 'mapbox/streets-v11',
}).addTo(map);

let currentSlideIndex = 0;

const slideTitleDiv = document.querySelector('.slide-title');
const slideContentDiv = document.querySelector('.slide-content');
const slidePrevButton = document.querySelector('#prev-slide');
const slideNextButton = document.querySelector('#next-slide');
const slideJumpSelect = document.querySelector('#jump-to-slide');

let myIcon = L.icon({
  iconUrl: 'pic/free-soccer-icon-459-thumb.png',
  iconSize: [35, 45],
});

function makeEraCollection(era) {
  return {
    type: 'FeatureCollection',
    features: lifeCollection.features.filter(f => f.properties.era === era),
  };
}

function updateMap(collection) {
  layerGroup.clearLayers();
  let geoJsonLayer = L.featureGroup();
  collection.features.forEach(feature => {
    if (feature.properties.type === 'goal') {
      L.geoJSON(feature, { pointToLayer: (p, latlng) => L.marker(latlng, { icon: myIcon }) })
        .bindTooltip(feature.properties.label)
        .addTo(geoJsonLayer)
        .addTo(layerGroup);
    } else {
      L.geoJSON(feature, { pointToLayer: (p, latlng) => L.marker(latlng) })
        .bindTooltip(feature.properties.label)
        .addTo(geoJsonLayer)
        .addTo(layerGroup);
    }
  });
  return geoJsonLayer;
}

function showSlide(slide) {
  const converter = new showdown.Converter({ smartIndentationFix: true });

  slideTitleDiv.innerHTML = `<h2>${slide.title}</h2>`;
  slideContentDiv.innerHTML = converter.makeHtml(slide.content);
  slideJumpSelect.value = currentSlideIndex;

  const collection = slide.era ? makeEraCollection(slide.era) : lifeCollection;
  const layer = updateMap(collection);

  function handleFlyEnd() {
    if (slide.showpopups) {
      layer.eachLayer(l => {
        l.eachLayer(ls => {
          if (ls.feature.properties.type === 'club') {
            ls.bindTooltip(ls.feature.properties.label, { permanent: true });
            ls.openTooltip();
          } else {
            ls.bindTooltip(ls.feature.properties.label);
            ls.openTooltip();
          }
        });
      });
    }
    map.removeEventListener('moveend', handleFlyEnd);
  }

  map.addEventListener('moveend', handleFlyEnd);
  if (slide.bounds) {
    map.flyToBounds(slide.bounds);
  } else if (slide.era) {
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
  fetch('data/journey.json')
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

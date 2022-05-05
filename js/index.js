/* globals showdown */
var redIcon = new L.Icon({
	iconUrl: 'data/marker-icon-2x-red.png',
	shadowUrl: 'data/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

let map = L.map('map').setView([0, 0], 2);
let layerGroup = L.layerGroup().addTo(map);
let lifeCollection = { features: [] };
var BackgroundColor="AliceBlue";
document.body.style.backgroundColor=BackgroundColor //changing bg color

L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
}).addTo(map);

/* ==========
## Step 1: Slide time
Think about how to represent your slides. What information do you want to show
for each slide?
- Probably a title and some descriptive text.
- Should the text be related to the map data?
- Do you want to show any images?
What do you want the map or the data on the map to do when you go to a different
slide?
- Should it pan and zoom to specific features?
- Should it highlight or show a popup on any features?
- Should the features shown be filtered?
## Step 2: App Behavior
Think about what you want/need your application to do. It's often helpful to
frame these app behaviors in a "When... then..." format. For example:
- When I click the "⧏" button, then the app should show the slide before the
  current one.
- When I click the "⧐" button, then the app should show the slide after the
  current one.
- When the page loads, then the app should show the first slide.
These behavior descriptions can help you determine what functions you need to
write. For example, the behaviors above imply that you should have functions to
handle the next/previous button clicks, and a function to show a given slide.
## Step 3: Function Signatures
========== */

let currentSlideIndex = 0;

const slideTitleDiv = document.querySelector('.slide-title');
const slidetimeDiv = document.querySelector('.slide-time');
const slidelocationDiv = document.querySelector('.slide-location');
const slidenationDiv = document.querySelector('.slide-Total_nations');
const slideeventDiv = document.querySelector('.slide-Total_events');
const slideimgDiv = document.querySelector('.slide-img');
const slideconDiv = document.querySelector('.slide-content');
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

function makeEraCollection(era) {
  return {
    type: 'FeatureCollection',
    features: lifeCollection.features.filter(f => f.properties.era === era),
  };
}

function showSlide(slide) {
  const converter = new showdown.Converter({ smartIndentationFix: true });

  slideTitleDiv.innerHTML = `<h2>${slide.title}</h2>`;
  slidetimeDiv.innerHTML = slide.time;
  slidelocationDiv.innerHTML = slide.location;
  slidenationDiv.innerHTML = slide.Total_nations;
  slideeventDiv.innerHTML = slide.Total_events;
  slideimgDiv.innerHTML =  `<img src="${slide.img}">`;
  slideconDiv.innerHTML = slide.content;

  const collection =  lifeCollection;
  const layer = updateMap(collection);

  function handleFlyEnd() {
    if (slide.showpopups) {
      layer.eachLayer(l => {
        if(slide.era ===l.feature.properties.era){
          l.bindTooltip(l.feature.properties.label, { permanent: true });
          l.openTooltip();
          l.setIcon(redIcon);
        }

      });
    }
    map.removeEventListener('moveend', handleFlyEnd);
  }

  map.addEventListener('moveend', handleFlyEnd);
  layer.eachLayer(l => {
    if(slide.era ===l.feature.properties.era){
      map.flyTo(l.getLatLng());
    }

  });
  /*if (slide.bounds) {
    map.flyToBounds(slide.bounds);
  } else if (slide.era) {
    map.flyToBounds(layer.getBounds());
  }*/
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
  fetch('data/data1.json')
    .then(resp => resp.json())
    .then(data => {
      lifeCollection = data;
      updateMap(lifeCollection);
      showCurrentSlide();
    });
}

slidePrevButton.addEventListener('click', goPrevSlide);
slideNextButton.addEventListener('click', goNextSlide);
slideJumpSelect.addEventListener('click', jumpToSlide);

initSlideSelect();
showCurrentSlide();
loadLifeData();

/* globals showdown */

let map = L.map('map').setView([12.886250, 88.789727], 4);
let layerGroup = L.layerGroup().addTo(map);
let lifeCollection = { features: [] };

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
 attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
 subdomains: 'abcd',
 maxZoom: 20
}).addTo(map);


/* ==========
## Step 1: Slide Content
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

const slideCountryDiv = document.querySelector('.slide-Country-json');
const slideFromDiv = document.querySelector('.slide-from');
const slideToDiv = document.querySelector('.slide-to');
const slideFlightDiv = document.querySelector('.slide-flght-json');
const slideTimeDiv = document.querySelector('.slide-time-json');
const slideCasualtyDiv = document.querySelector('.slide-casualty-json');
const slidePlanetypeDiv = document.querySelector('.slide-planetype-json');
const slideimgDiv = document.querySelector('.slide-img');
const slideSummaryDiv = document.querySelector('.slide-summary');
const slidePrevButton = document.querySelector('#prev-slide');
const slideNextButton = document.querySelector('#next-slide');
const slideJumpSelect = document.querySelector('#jump-to-slide');



// function updateMap(collection) {
//   layerGroup.clearLayers();
//   const geoJsonLayer = L.geoJSON(collection, {
//     style: function (feature) {
//         return {color: '#FED976'}
//       }
//     .bindTooltip(l => l.feature.properties.Casualty)
//     .addTo(layerGroup)
//
// })  return geoJsonLayer;
// })


function updateMap(collection) {
  layerGroup.clearLayers();
  const geoJsonLayer = L.geoJSON(collection, {
    style: {
        color: "red",
        weight: 5
    }
})
    .bindTooltip(l => l.feature.properties.Flight)
    .addTo(layerGroup);

  return geoJsonLayer;
}



function makeEraCollection(Flight) {
  return {
    type: 'FeatureCollection',
    features: lifeCollection.features.filter(f => f.properties.Flight === Flight),
  };
}

function showSlide(slide) {
  const converter = new showdown.Converter({ smartIndentationFix: true });

  slideCountryDiv.innerHTML = slide.Country;
  slideFromDiv.innerHTML = slide.From;
  slideToDiv.innerHTML = slide.To;
  slideFlightDiv.innerHTML = slide.Flight;
  slideTimeDiv.innerHTML = slide.Time;
  slideCasualtyDiv.innerHTML = slide.Casualty;
  slidePlanetypeDiv.innerHTML = slide.Planetype;
  slideimgDiv.innerHTML =  `<img src="${slide.img}">`;
  slideSummaryDiv.innerHTML =  slide.summary;

  const collection = slide.Flight ? makeEraCollection(slide.Flight) : lifeCollection;
  const layer = updateMap(collection);

  function handleFlyEnd() {
    if (slide.showpopups) {
      layer.eachLayer(l => {
        if(slide.Country ===l.feature.properties.Country){
          l.bindTooltip(l.feature.properties.Flight, { permanent: true });
          l.openTooltip();
        }

      });
    }
    map.removeEventListener('moveend', handleFlyEnd);
  }

  map.addEventListener('moveend', handleFlyEnd);
  layer.eachLayer(l => {
    if(slide.Country ===l.feature.properties.Country){

      var lat = $(this).attr('data-latitude');
      var lng = $(this).attr('data-longitude');


      map.flyTo(`slide.centroid`,13);
    }

  });
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
    option.innerHTML = slide.Country;
    slideJumpSelect.appendChild(option);
  }
}

function loadLifeData() {
  fetch('data/incidents.json')
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

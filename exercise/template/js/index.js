/* globals showdown */
let map = L.map('map').setView([39.9526, -75.1652], 12);

let slideNumber = 0;
let currentLayer = new L.LayerGroup().addTo(map);


L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
}).addTo(map);


function updateSlideTitle(title){
  document.getElementsByClassName('slide-title')[0].innerHTML = title;
}

function updateSlideContent(content) {
  document.getElementsByClassName('slide-content')[0].innerHTML = content;
}

function updateMapFeatures(features) {
  currentLayer.clearLayers();
  // for properties dataset
  feature_json = features.addTo(currentLayer);
  map.flyToBounds(feature_json.getBounds())
}

function updateMapBounds(bounds) {

}

function showPreviousSlide() {
  if(slideNumber > 0) {
    slideNumber = slideNumber - 1;
  }
  else {
    slideNumber = slides.length - 1;
  }
  showSlide(slideNumber);
}

function showNextSlide() {
  if(slideNumber < slides.length - 1) {
    slideNumber = slideNumber + 1;
  }
  else {
    slideNumber = 0;
  }
  showSlide(slideNumber);
}

function showSlide(slideNumber) {
  updateSlideTitle(slides[slideNumber].title);
  updateSlideContent(slides[slideNumber].content);
  updateMapFeatures(slides[slideNumber].features);
}

document.getElementById('next-slide').addEventListener("click", showNextSlide);
document.getElementById('prev-slide').addEventListener("click", showPreviousSlide);

window.addEventListener('load', (event) => {
  showSlide(slideNumber);
});

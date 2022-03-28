/* eslint-disable no-undef */
let map = L.map('map').setView([52.20408251869462, 24.662590026855465], 5);
let horodetz_marker =  L. marker([ 52.203714307355916, 24.662590026855465]).bindTooltip('<strong>Horodetz</strong>').addTo(map);

let slideNumber = 0;
let currentLayer = new L.LayerGroup().addTo(map);

let select = document.getElementById('jump-to-slide');

let Stamen_TonerLite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);





function updateSlideTitle(title) {
  document.getElementsByClassName('slide-title')[0].innerHTML = title;
  select.value = slideNumber;
}

function updateSlideContent(content) {
  document.getElementsByClassName('slide-content')[0].innerHTML = content;
}

function updateMapFeatures(features) {
  currentLayer.clearLayers();
  let featureJson = features.addTo(currentLayer);
 //map.flyToBounds([10.546875,48.253941,36.298828,57.774518]);
}


function showSlide(slideNum) {
  updateSlideTitle(slides[slideNum].title);
  updateSlideContent(slides[slideNum].content);
  updateMapFeatures(slides[slideNum].features);
}

function showPreviousSlide() {
  if (slideNumber > 0) {
    slideNumber -= 1;
  } else {
    slideNumber = slides.length - 1;
  }
  showSlide(slideNumber);
}

function showNextSlide() {
  if (slideNumber < slides.length - 1) {
    slideNumber += 1;
  } else {
    slideNumber = 0;
  }
  showSlide(slideNumber);
}

document.getElementById('next-slide').addEventListener('click', showNextSlide);
document.getElementById('prev-slide').addEventListener('click', showPreviousSlide);

select.addEventListener('change', () => {
  slideNumber = parseInt(select.value, 10);
  showSlide(slideNumber);
});

slides.forEach((slide, i) => {
  let opt = document.createElement('option');
  opt.value = i;
  opt.innerHTML = slide.title;
  select.appendChild(opt);
});

window.addEventListener('load', () => {
  showSlide(slideNumber);
})


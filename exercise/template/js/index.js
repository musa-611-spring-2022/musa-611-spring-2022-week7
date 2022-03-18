/* eslint-disable no-undef */
let map = L.map('map').setView([39.9526, -75.1652], 12);

let slideNumber = 0;
let currentLayer = new L.LayerGroup().addTo(map);

let select = document.getElementById('jump-to-slide');

L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
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
  map.flyToBounds(featureJson.getBounds());
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
});

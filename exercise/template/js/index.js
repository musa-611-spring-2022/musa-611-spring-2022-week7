/* globals showdown */

let map = L.map('map').setView([0, 0], 0);
let layerGroup = L.layerGroup().addTo(map);
let lifeCollection = { features: [] };

L.tileLayer('https://api.mapbox.com/styles/v1/zinkm/cl0r7a69x000214pjtro7pxaf/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoiemlua20iLCJhIjoiY2wwcjc2bXVkMDBwNDNjazN5em1zdXM1dCJ9.KAWOxtNGJa8GL1lw0KODTw', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
}).addTo(map);

let currentSlideIndex = 0;

const slidesDiv = document.querySelector('.slides');

function updateMap(collection) {
  layerGroup.clearLayers();
  const geoJsonLayer = L.geoJSON(collection, { style: {fillColor: "#F2F7E2", color: "#F2F7E2"}, pointToLayer: (p, latlng) => L.marker(latlng) })
    .bindTooltip(l => l.feature.properties.label)
    .addTo(layerGroup);

  return geoJsonLayer;
}

function makeOriginCollection(origin) {
  return {
    type: 'FeatureCollection',
    features: lifeCollection.features.filter(f => f.properties.origin === origin),
  };
}

function syncMapToSlide(slide) {
  const collection = slide.origin ? makeOriginCollection(slide.origin) : lifeCollection;
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
  } else if (slide.origin) {
    map.flyToBounds(layer.getBounds());
  }
}

function syncMapToCurrentSlide() {
  const slide = slides[currentSlideIndex];
  syncMapToSlide(slide);
}

function initSlides() {
  const converter = new showdown.Converter({ smartIndentationFix: true });

  slidesDiv.innerHTML = '';
  for (const [index, slide] of slides.entries()) {
    const slideDiv = htmlToElement(`
      <div class="slide" id="slide-${index}">
        <h2>${slide.title}</h2>
        ${converter.makeHtml(slide.content)}
      </div>
    `);
    slidesDiv.appendChild(slideDiv);
  }
}

function loadLifeData() {
  fetch('data/journey.json')
    .then(resp => resp.json())
    .then(data => {
      lifeCollection = data;
      syncMapToCurrentSlide();
    });
}

function calcCurrentSlideIndex() {
  const scrollPos = window.scrollY;
  const windowHeight = window.innerHeight;
  const slideDivs = document.getElementsByClassName('slide');

  let i;
  for (i = 0; i < slideDivs.length; i++) {
    const slidePos = slideDivs[i].offsetTop;
    if (slidePos - scrollPos - windowHeight > 0) {
      break;
    }
  }

  if (i === 0) {
    currentSlideIndex = 0;
  } else if (currentSlideIndex != i - 1) {
    currentSlideIndex = i - 1;
    syncMapToCurrentSlide();
  }
}

document.addEventListener('scroll', calcCurrentSlideIndex);

initSlides();
syncMapToCurrentSlide();
loadLifeData();

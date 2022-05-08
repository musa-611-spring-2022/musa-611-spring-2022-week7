/* globals showdown */

let map = L.map('map').setView([500, 500], 0);
let layerGroup = L.layerGroup().addTo(map);
let lifeCollection = { features: [] };

L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.jpg', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
}).addTo(map);

let currentSlideIndex = 0;

const slidesDiv = document.querySelector('.slides');

function updateMap(collection) {
  layerGroup.clearLayers();
  const geoJsonLayer = L.geoJSON(collection, { pointToLayer: (p, latlng) => L.marker(latlng) })
    .bindTooltip(l => l.feature.properties.Plaza)
    .addTo(layerGroup);

  return geoJsonLayer;
}

function makePlazaCollection(Plaza) {
  return {
    type: 'FeatureCollection',
    features: lifeCollection.features.filter(f => f.properties.Plaza === Plaza),
  };
}

function syncMapToSlide(slide) {
  const collection = slide.Plaza ? makeEraCollection(slide.Plaza) : lifeCollection;
  const layer = updateMap(collection);

  function handleFlyEnd() {
    if (slide.showpopups) {
      layer.eachLayer(l => {
        l.bindTooltip(l.feature.properties.Plaza, { permanent: true });
        l.openTooltip();
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

/* globals showdown */

// npx http-server --port 8000

let map = L.map('map').setView([0, 0], 0);
let layerGroup = L.layerGroup().addTo(map);
let lifeCollection = { features: [] };

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
}).addTo(map);

const graysFerryData = fetch('data/GraysFerry.json')
  .then(resp => resp.json())
  .then(data => data);

// census tracts
const ct = fetch('https://opendata.arcgis.com/datasets/8bc0786524a4486bb3cf0f9862ad0fbf_0.geojson')
  .then(resp => resp.json())
  .then(data => data.features.filter(feature => feature.properties.NAME10 === '13'
  || feature.properties.NAME10 === '20' || feature.properties.NAME10 === '33' || feature.properties.NAME10 === '36'));

// bus routes
const bus = fetch('./data/Fall_2021_Routes.geojson')
  .then(resp => resp.json())
  .then(data => data.features.filter(feature => feature.properties.LineAbbr === '12'
    || feature.properties.LineAbbr === '49'
    || feature.properties.LineAbbr === '64'));

// indego station
const ind = fetch('https://kiosks.bicycletransit.workers.dev/phl')
  .then(resp => resp.json())
  .then(data => data.features.filter(feature => feature.properties.id === 3252));

// City limit
const cl = fetch('https://opendata.arcgis.com/datasets/405ec3da942d4e20869d4e1449a2be48_0.geojson')
  .then(resp => resp.json())
  .then(data => data.features);

const getAllData = async () => {
  let gfData = await graysFerryData;
  let ctData = await ct;
  let busData = await bus;
  let indData = await ind;
  let clData = await cl;

  ctData.forEach((element) => (element.properties.section = 'CensusData'));
  ctData.forEach((element) => (element.properties.label = element.properties.NAMELSAD10));
  busData.forEach((element) => (element.properties.section = 'Transit'));
  busData.forEach((element) => (element.properties.label = `Route ${element.properties.LineAbbr}, ${element.properties.LineName}`));
  indData.forEach((element) => (element.properties.section = 'Amenities'));
  indData.forEach((element) => (element.properties.label = 'Indego Staion'));
  clData.forEach((element) => (element.properties.section = 'Introduction'));
  clData.forEach((element) => (element.properties.label = 'Philadelphia, PA'));

  ctData.forEach(element => gfData.features.push(element));
  busData.forEach(element => gfData.features.push(element));
  indData.forEach(element => gfData.features.push(element));
  clData.forEach(element => gfData.features.push(element));

  // console.log(gfData);
  // console.log(ctData);
  // console.log(busData);
  // console.log(indData);
  // console.log(clData);

  return gfData;
};

// codes below are based on Mjumbe's sample codes

let currentSlideIndex = 0;

const slideTitleDiv = document.querySelector('.slide-title');
const slideContentDiv = document.querySelector('.slide-content');
const slidePrevButton = document.querySelector('#prev-slide');
const slideNextButton = document.querySelector('#next-slide');
const slideJumpSelect = document.querySelector('#jump-to-slide');

function updateMap(collection) {
  layerGroup.clearLayers();
  const geoJsonLayer = L.geoJSON(collection, { pointToLayer: (p, latlng) => L.marker(latlng) })
    .eachLayer(l => {
      if (l.feature.properties.section.includes('ProjectOverview')) {
        l.setStyle({
          color: l.feature.properties.stroke,
          fillColor: l.feature.properties.fill,
          fillOpacity: l.feature.properties['fill-opacity'],
        });
      }
    })
    .bindTooltip(l => l.feature.properties.label)
    .addTo(layerGroup);

  return geoJsonLayer;
}

function makeSecCollection(section) {
  return {
    type: 'FeatureCollection',
    features: lifeCollection.features.filter(f => f.properties.section.includes(section)),
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
      });
    } else {
      layer.eachLayer(l => {
        if (l.feature.properties.section.includes('ProjectOverview')) {
          l.bindPopup(`<h1>${l.feature.properties.label}</h1> <img src=${l.feature.properties.img} />`, { maxWidth: 'auto' });
        }
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
  getAllData()
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

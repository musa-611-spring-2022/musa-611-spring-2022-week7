/* globals showdown */

// npx http-server --port 8000

let map = L.map('map').setView([0, 0], 0);
let layerGroup = L.layerGroup().addTo(map);
let lifeCollection = { features: [] };

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map);

const graysFerryData = fetch('data/GraysFerry.json')
	.then(resp => resp.json())
	.then(data => {
		return data;
	});

const getAllData = async () => {
  let gf_data = await graysFerryData;
  let ct_data = await ct;
	let bus_data = await bus;
	let ind_data = await ind;
	let cl_data = await cl;

	ct_data.forEach(element => element.properties['section'] = 'CensusData');
	ct_data.forEach(element => element.properties['label'] = element.properties.NAMELSAD10);
	bus_data.forEach(element => element.properties['section'] = 'Transit');
	bus_data.forEach(element => element.properties['label'] = `Route ${element.properties.LineAbbr}, ${element.properties.LineName}`);
	ind_data.forEach(element => element.properties['section'] = 'Amenities');
	ind_data.forEach(element => element.properties['label'] = 'Indego Staion');
	cl_data.forEach(element => element.properties['section'] = 'Introduction');
	cl_data.forEach(element => element.properties['label'] = 'Philadelphia, PA');

	ct_data.forEach(element => gf_data.features.push(element));
	bus_data.forEach(element => gf_data.features.push(element));
	ind_data.forEach(element => gf_data.features.push(element));
	cl_data.forEach(element => gf_data.features.push(element));

	//console.log(gf_data);
	//console.log(ct_data);
	//console.log(bus_data);
	//console.log(ind_data);
	//console.log(cl_data);

	return gf_data
};



//getAllData()

// census tracts
const ct = fetch('https://opendata.arcgis.com/datasets/8bc0786524a4486bb3cf0f9862ad0fbf_0.geojson')
	.then(resp => resp.json())
  .then(data => {
		return data.features.filter(feature => feature.properties.NAME10 == 13 ||
			feature.properties.NAME10 == 20 ||
			feature.properties.NAME10 == 32 ||
			feature.properties.NAME10 == 33 ||
			feature.properties.NAME10 == 36)

		/* ==========
    return L.geoJSON(data, {
      filter(feature) {
        if (feature.properties.NAME10 == 13 ||
          feature.properties.NAME10 == 20 ||
          feature.properties.NAME10 == 32 ||
          feature.properties.NAME10 == 33 ||
          feature.properties.NAME10 == 36)
          return true;
      },
      onEachFeature(feature, layer) {
        layer.bindTooltip(feature.properties.NAMELSAD10);
        layer.setStyle({ fillColor: "#000000" });
        layer.setStyle({ color: "#4287f5" });
      },
    })
		========== */
    //.addTo(map);
  });

//const getct = async () => {
  //const result = await ct;
	//console.log(result[0]);
//};

//getct()

/* ==========
const getct = async () => {
  const a = await ct;
	a.addTo(map);
};
========== */

//getct();

// bus routes
const bus = fetch('./data/Fall_2021_Routes.geojson')
  .then(resp => resp.json())
  .then(data => {
		return data.features.filter(feature => feature.properties.LineAbbr == '12' ||
			feature.properties.LineAbbr == '49' ||
			feature.properties.LineAbbr == '64')
		/* ==========
    L.geoJSON(data, {
			filter(feature) {
        if (feature.properties.LineAbbr == '12' ||
          feature.properties.LineAbbr == '49' ||
          feature.properties.LineAbbr == '64')
          return true;
      },
      onEachFeature(feature, layer) {
        layer.bindTooltip('Line ' +
				feature.properties.LineAbbr +
				'<br>' +
				feature.properties.LineName);
        //layer.setStyle({ fillColor: "#000000" });
        //layer.setStyle({ color: "#4287f5" });
      },
    })
		========== */
    //.addTo(map);
  });

// indego station
const ind = fetch('https://kiosks.bicycletransit.workers.dev/phl')
  .then(resp => resp.json())
  .then(data => {
		return data.features.filter(feature => feature.properties.id == 3252)
		/* ==========
    L.geoJSON(data, {
			filter(feature) {
        if (feature.properties.id == 3252)
          return true;
      },
      onEachFeature(feature, layer) {
        layer.bindTooltip('Name: ' +
				feature.properties.name +
				'<br> Available Docks:' +
				feature.properties.docksAvailable +
				'<br> Available Bikes:' +
				feature.properties.bikesAvailable);
        //layer.setStyle({ fillColor: "#000000" });
        //layer.setStyle({ color: "#4287f5" });
      },
    })
		========== */
    //.addTo(map);
  });

// City limit
const cl = fetch('https://opendata.arcgis.com/datasets/405ec3da942d4e20869d4e1449a2be48_0.geojson')
  .then(resp => resp.json())
  .then(data => {
		return data.features;
		/* ==========
    L.geoJSON(data, {
      onEachFeature(feature, layer) {
        layer.bindTooltip('Philadelphia, PA');
        //layer.setStyle({ fillColor: "#000000" });
        //layer.setStyle({ color: "#4287f5" });
      },
    })
		========== */
    //.addTo(map);
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
	console.log(collection);
  const geoJsonLayer = L.geoJSON(collection, { pointToLayer: (p, latlng) => L.marker(latlng) })
		.eachLayer(l => {
			console.log(l);
			if (l.feature.properties.section.includes('ProjectOverview')){
				l.setStyle({
							color: l.feature.properties.stroke,
							fillColor: l.feature.properties.fill,
	            fillOpacity: l.feature.properties['fill-opacity'],
	            //weight: l.feature.properties['storke-width']
	        })
			}
		})
    .bindTooltip(l => l.feature.properties.label)
    .addTo(layerGroup);

  return geoJsonLayer;
}

let campusStyle = (feature) => ({
  color: feature.properties.stroke,
  fillColor: feature.properties.fill,
  weight: 5,
});

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
        l.bindTooltip(l.feature.properties.label, { permanent: false });
        //l.openTooltip();
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
    //.then(resp => resp.json())
    .then(data => {
      lifeCollection = data;
			//console.log(lifeCollection)
      showCurrentSlide();
    });
}



slidePrevButton.addEventListener('click', goPrevSlide);
slideNextButton.addEventListener('click', goNextSlide);
slideJumpSelect.addEventListener('click', jumpToSlide);

initSlideSelect();
showCurrentSlide();
loadLifeData();

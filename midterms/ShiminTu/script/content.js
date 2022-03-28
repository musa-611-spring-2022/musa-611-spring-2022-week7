const map = L.map('map').setView([39.96, -75.16], 16);

L.tileLayer('https://api.mapbox.com/styles/v1/amyqqlove/cl130k75m003815nk3vae7z14/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYW15cXFsb3ZlIiwiYSI6ImNsMTJ1OGtiZTFvdzMzanJ0cnFmczBjNHoifQ.1r1KE6CdZnEY5wnjt6Pe4g', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const markerLayer = L.layerGroup().addTo(map);
const zipLayer = L.geoJSON().addTo(map);
const choLayer = L.geoJSON().addTo(map);
var legend = L.control({position: 'bottomright'});

let currentSlideIndex = 0;

const slideTitleDiv = document.querySelector('.title');
const slideContentDiv = document.querySelector('.text');
const slidePrevButton = document.querySelector('#prev-slide');
const slideNextButton = document.querySelector('#next-slide');
const slideList =  document.querySelector('.list');


let updatePointMarkers = (facilityLocation) => {
  facilityLocation.forEach(facility => {
  let lng = facility.geometry.coordinates[0];
  let lat = facility.geometry.coordinates[1];
  let name = facility.properties.NAME;

  if (facility.properties.COMPANY === 'FedEx') {
    var MYICON = L.icon({
      iconUrl: 'img/fedex.png',
      iconSize: [42, 42],
    });
  } else if (facility.properties.COMPANY === 'UPS') {
    var MYICON = L.icon({
      iconUrl: 'img/ups.png',
      iconSize: [38, 38],
    });
  } else {
    var MYICON = L.icon({
      iconUrl: 'img/dhl.png',
      iconSize: [34, 34],
    });
  }
  L.marker([lat, lng], { icon: MYICON }).bindTooltip(name).addTo(markerLayer);
  })
};

const ndFeature = neighborData.features;
const ucData = ndFeature.filter(feature => {
    return feature.properties.listname == 'University City'
});

/*
First slides
*/
function pointSlide(slide) {
  slideTitleDiv.innerHTML = slide.title;
  slideContentDiv.innerHTML = slide.content;
  updatePointMarkers(ndFeature);
};

/*
Second slides
*/
function pointListSlide(slide) {
  slideTitleDiv.innerHTML = slide.title;
  slideContentDiv.innerHTML = '';
  ucData.map(uc => {
    slideContentDiv.appendChild(htmlToElement(`<li class="facility">${uc.properties.NAME}, ${uc.properties.COMPANY} </li>`));
  });
  map.flyToBounds(slide.bounds);
  updatePointMarkers(ucData);
}

/*
Third slides
*/
function listSlide(slide) {
  slideTitleDiv.innerHTML = slide.title;
  slideContentDiv.innerHTML = '';
  slideContentDiv.appendChild(htmlToElement(`<p">click me ⬇️</p>`));
  let neighList = slide.neighborList;
  neighList.map(neigh => {
    slideContentDiv.appendChild(htmlToElement(`<li class="neighList">${neigh}</li>`));
  });
  const neighListElement = document.querySelectorAll('.neighList')

  neighListElement[0].addEventListener('click', function(){
    map.fitBounds(slide.bounds[0])
    const neighFeature = neighborData.features.filter(fea => {
      return fea.properties.listname == slide.neighborList[0]
    });
    updatePointMarkers(neighFeature);
  })

  neighListElement[1].addEventListener('click', function(){
    zipLayer.clearLayers();
    markerLayer.clearLayers();
    map.fitBounds(slide.bounds[1])
    const neighFeature = neighborData.features.filter(fea => {
      return fea.properties.listname == slide.neighborList[1]
    });
    updatePointMarkers(neighFeature);
  })

  neighListElement[2].addEventListener('click', function(){
    zipLayer.clearLayers();
    markerLayer.clearLayers();
    map.fitBounds(slide.bounds[2])
    const neighFeature = neighborData.features.filter(fea => {
      return fea.properties.listname == slide.neighborList[2]
    });
    updatePointMarkers(neighFeature);
  })
  
}

/*
Forth slides
*/
function zipSlide(slide) {
  slideTitleDiv.innerHTML = slide.title;
  slideContentDiv.innerHTML = '';
  slideContentDiv.appendChild(htmlToElement(`<p">click me ⬇️</p>`));
  let zipList = slide.zipList;
  zipList.map(zip => {
    slideContentDiv.appendChild(htmlToElement(`<li class="zipList">${zip}</li>`));
  });
  const zipListElement = document.querySelectorAll('.zipList')


  const zip0 = zipData.features.filter(fea => {
    return fea.properties.CODE == slide.zipList[0]
  })

  const zip1 = zipData.features.filter(fea => {
    return fea.properties.CODE == slide.zipList[1]
  })

  const zip2 = zipData.features.filter(fea => {
    return fea.properties.CODE == slide.zipList[2]
  })
  

  zipListElement[0].addEventListener('click', function(){

    zipLayer.clearLayers();
    markerLayer.clearLayers();
    map.fitBounds(slide.bounds[0]);
    zipLayer.addData(zip0);
    const zipFeature = neighborData.features.filter(fea => {
      return fea.properties.ZIP == slide.zipList[0]
    });
    updatePointMarkers(zipFeature);
  })
  zipListElement[1].addEventListener('click', function(){
    zipLayer.clearLayers();
    markerLayer.clearLayers();

    map.fitBounds(slide.bounds[1]);
    zipLayer.addData(zip1);
    const zipFeature = neighborData.features.filter(fea => {
      return fea.properties.ZIP == slide.zipList[1]
    });
    updatePointMarkers(zipFeature);
  })
  zipListElement[2].addEventListener('click', function(){
    zipLayer.clearLayers();
    markerLayer.clearLayers();
    map.fitBounds(slide.bounds[2]);
    zipLayer.addData(zip2);
    const zipFeature = neighborData.features.filter(fea => {
      return fea.properties.ZIP == slide.zipList[2]
    });
    updatePointMarkers(zipFeature);
  })

}

/*
Fifth slides
*/

function cho(slide) {
  function getColor(d) {
    return d > 40 ? '#800026' :
          d > 20  ? '#E31A1C' :
          d > 10  ? '#FC4E2A' :
          d > 5  ? '#FD8D3C' :
          d > 2   ? '#FEB24C' :
                      '#FFEDA0';
  }
  
  /* add legend */
  function style(feature) {
    return {
        fillColor: getColor(feature.properties.number),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
  }

  

  legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 2, 5, 10, 20, 40],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
  };


  slideTitleDiv.innerHTML = slide.title;
  slideContentDiv.innerHTML = slide.content;
  choLayer.addData(zipData).setStyle(style);
  legend.addTo(map);
}
 
  
/*
show slides
*/

function showCurrentSlide() {
  map.removeControl(legend)
  choLayer.clearLayers();
  zipLayer.clearLayers();
  markerLayer.clearLayers();
  
  
  const slide = slides[currentSlideIndex];

  if (slide.slideType == 'point') {
    pointSlide(slide);
  } else if(slide.slideType == 'list') {
    map.flyToBounds(slides[0].bounds)
    listSlide(slide);
  } else if(slide.slideType == 'pointList') {
    pointListSlide(slide);
  } else if(slide.slideType == 'zipList') {
    map.flyToBounds(slides[0].bounds);
    zipSlide(slide);
  } else if(slide.slideType == 'choropleth') {
    map.flyToBounds(slides[0].bounds);
    cho(slide)
  }
  
  if (slide.slideType == 'point') {
    map.flyToBounds(slide.bounds);
  }
};



/*
change slides
*/

function goNextSlide() {
  currentSlideIndex++;
  
  if (currentSlideIndex === slides.length) {
    currentSlideIndex = 0;
  };
  showCurrentSlide();
};

function goPrevSlide() {
  currentSlideIndex--;
  
  if (currentSlideIndex < 0) {
    currentSlideIndex = slides.length - 1;
  };
  
  showCurrentSlide();
};



slidePrevButton.addEventListener('click', goPrevSlide);
slideNextButton.addEventListener('click', goNextSlide);


showCurrentSlide();

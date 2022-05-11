/* globals showdown */

let map = L.map('map').setView([41.6934242, -73.424951], 8);
let layerGroup = L.layerGroup().addTo(map);
let artCollection = { features: [] };

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
	maxZoom: 15,
}).addTo(map);

let currentSlideIndex = 0;

const slidesDiv = document.querySelector('.slides');

function updateMap(collection) {
  layerGroup.clearLayers();
  const geoJsonLayer = L.geoJSON(collection, { pointToLayer: (p, latlng) => L.marker(latlng) })
    .bindTooltip(l => l.feature.properties.name)
    .addTo(layerGroup);

  return geoJsonLayer;
}

function makeEraCollection(siteID) {
  return {
    type: 'FeatureCollection',
    features: artCollection.features.filter(f => f.properties.siteID === siteID),
  };
}

function syncMapToSlide(slide) {
  const collection = slide.siteID ? makeEraCollection(slide.siteID) : artCollection;
  const layer = updateMap(collection);

  function handleFlyEnd() {
    if (slide.showpopups) {
      layer.eachLayer(l => {
        l.bindTooltip(l.feature.properties.name, { permanent: true });
        l.openTooltip();
      });
    }
    map.removeEventListener('moveend', handleFlyEnd);
  }

  map.addEventListener('moveend', handleFlyEnd);
  if (slide.bounds) {
    map.flyToBounds(slide.bounds);
  } else if (slide.siteID) {
    map.flyToBounds(layer.getBounds());
  }
}

function syncMapToCurrentSlide() {
  const slide = slides[currentSlideIndex];
  syncMapToSlide(slide);
}

// initialze empty array to hold picture slideshow index & pictureFrame elements
let pictureIndex = [];
let pictureFrame_List = [];

function initSlides() {
  const converter = new showdown.Converter({ smartIndentationFix: true });

  slidesDiv.innerHTML = '';
  for (const [index, slide] of slides.entries()) {
    const slideDivHeader = htmlToElement(`
      <div class="slide" id="slide-${index}">
        <h2>${slide.title}</h2>
        <div class="slideshow-container" id="slide-${index}">
          <a class="prev" onclick="plusPictures(-1, ${index})">&#10094;</a>
          <a class="next" onclick="plusPictures(1, ${index})">&#10095;</a>
        </div>
      </div>
    `);
    slidesDiv.appendChild(slideDivHeader);
  
    
    let paintings = slide.paintings;
    if (paintings) {
      paintings = paintings.split(",");
      for (imgIdx in paintings) {
        const imgLoc = paintings[imgIdx];
        const imgDiv = htmlToElement(`
          <div class="myPaintings myPictures${index} fade"> 
            <div class="numbertext">${imgIdx} / ${paintings.length}</div>
            <img src="data/paintings/${imgLoc}">
          </div>
          <br/><br/>
        `);
        let targetSlideSlideshow = document.getElementById('slide-' + index).getElementsByClassName("slideshow-container")[0];
        targetSlideSlideshow.appendChild(imgDiv);
      };      
    }
    pictureIndex.push(0);
    pictureFrame_List.push('myPictures'+index);

    const slideDivContent = htmlToElement(` ${converter.makeHtml(slide.content)} `);
    let targetSlide = document.getElementById('slide-' + index);
    targetSlide.appendChild(slideDivContent);
  }
}

function loadSitesData() {
  fetch('data/artTrailSites.json')
    .then(resp => resp.json())
    .then(data => {
      artCollection = data;
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


/////////////////////////////////////////////////////////////////////////////

/* JS from image slide show example:  https://www.w3schools.com/howto/howto_js_slideshow.asp*/

// Next/previous controls
function plusPictures(n, frame) {
  showPictures(pictureIndex[frame] += n, frame);
  // console.log("Change picture in frame by " + frame)
}

// // Thumbnail image controls
// function currentPicture(n, frame) {
//   showPictures(pictureIDs_list[frame] += n, frame);
// }

function showPictures(n, no) {
  let i;
  let x = document.getElementsByClassName(pictureFrame_List[no]);
  // console.log("n= " + n);
  // console.log("no= " + no);
  // console.log("x0= ");
  // console.log(x[0]);
  // console.log("x1= ");
  // console.log(x[1]);
  if (no === -1) {no = 0};
  if (n > x.length) {pictureIndex[no] = 1};    
  if (n < 1) {pictureIndex[no] = x.length};
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  x[pictureIndex[no]-1].style.display = "block";  
}

//////////////////////////////////////////////////////////////////////////




document.addEventListener('scroll', calcCurrentSlideIndex);

initSlides();
syncMapToCurrentSlide();
loadSitesData();

for (let i = 1; i < pictureIndex.length; i++){
  showPictures(0, i);
};


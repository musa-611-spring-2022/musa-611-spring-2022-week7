/* globals showdown */


/* set up map and layer */
let map = L.map('map').setView([41.86186677644708, -87.318760805363], 10);
const trapsLayer = L.layerGroup().addTo(map);

L.tileLayer('https://api.mapbox.com/styles/v1/dream3r/cl0r30nhs000u14q9j7y7ela8/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZHJlYW0zciIsImEiOiJjaXZpZW9xc3owMGduMnlueGo2bTh6aXM0In0.3NH7FMpEYuajlUakJdun7g', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


/// set up marker icon 
let netIcon = L.icon({
  iconUrl: '/Users/hanpu/Documents/Penn Class&HW/MUSA-611/musa-611-spring-midterm/data/fishing-net.png',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [-3, -76]
  /*shadowUrl: 'my-icon-shadow.png',
  shadowSize: [68, 95],
  shadowAnchor: [22, 94]*/
});

const title =  document.querySelector('#side-title');
const content =  document.querySelector('#side-content');

const prev = document.querySelector('#prev');
const next = document.querySelector('#next');

// define a function that change markers on the map
let updateTrapMarkers = (trapsToShow) => {
  trapsLayer.clearLayers();
  trapsToShow.forEach((trapPoint) => {
    L.marker([
      Number(trapPoint['latitude']),
      Number(trapPoint['longitude'])
    ],
    {
      icon: netIcon
    })
    .bindTooltip(trapPoint.trap)
    .addTo(trapsLayer);
  });
}


let currentPage = 0;

updateTrapMarkers(trap_location);

// define function that changes content and title in sidebar
let updateTitle = (input) => {
  title.innerHTML = '';
  title.innerHTML = contentList[input].title;
};

let updateContent = (input) => {
  content.innerHTML = '';
  content.innerHTML = contentList[input].content;
};



// define function of next page and prev page
let nextPage = () => {
  if (currentPage <4){
    currentPage += 1;
    change()
  }
}

let prevPage = () => {
  if (currentPage >0){
    currentPage -= 1;
    change()
  }
}

// define a function of how things change on the page

const change = () => {
  updateTitle(currentPage);
  updateContent(currentPage);
  markers = markerList[currentPage].map((a) => trap_location[a]);
  updateTrapMarkers(markers);
  map.flyTo(flySpot[2*currentPage], flySpot[2*currentPage+1]);
}

next.addEventListener('click', nextPage);
prev.addEventListener('click', prevPage);

/* globals showdown */

/* ------------------- event handler for holding onbeforeunload even for window ---------------------- */ 
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}


let map = L.map('map').setView([40.00, -75.14], 11);

/* ----------------------- map tiles ------------------- */

L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
  maxZoom: 20,
  attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

/* ---------------------- STYLES ---------------------- */
/*
ICON
An icon used to style marker added to the current selected street
1. The marker will styled to red
*/
var redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});



/* ---------------------- GLOBAL VARS ------------------------ */
// layer groups
let layerGrouop_tooltipStreet = L.layerGroup().addTo(map);
let layerGrouop_markerSite = L.layerGroup().addTo(map);
let layerGroup_markerDistrict = L.layerGroup().addTo(map);
let layerHighlight = L.layerGroup().addTo(map);
let layerGroup = L.layerGroup().addTo(map);
let currObjDisplay = L.layerGroup().addTo(map);

let layerGroup_street = L.layerGroup().addTo(map);
let layerGroup_properties = L.layerGroup().addTo(map);

let currSurroundingStreetDisplay = L.layerGroup().addTo(map);

// geojson data
let historicStreetCollection = { features: [] };
let historicSitesCollection = { features: []};
let historicDistrictCollection = { features: [] };
let currSlide;
// for filtering data of historic street
let filterStreetCollection = []; // a collection of features 
// for filtering data of historic sites
let currSelectedObj;
let geojson_historicSites = {features :[]};
// for filtering surrounding street of the curr selected street 
let surroundingStreets = [];
let currSelectedSurroundingStreet;
let indexOfSurroundingStreet = 0;
let ifIndexToZero = false;

// geojson layer
let geojsonLayer_sites;
let geojsonLayer_districts;
let geojsonLayer_street;
let geojsonLayer_currObj;


// for zooming around
let southWest_district;
let northEast_district;
let southWest_site;
let northEast_site;

// html element
let findStreetName_select_h = document.getElementById('find-street');
let selectBarContainer_div_h = document.getElementById('selectbar-constainer');
let findStreetName_1_select_h = document.getElementById('find-street-1');
let selectStreetCode_select_h = document.getElementById('find-street-code');
let showHistoricSite_button_h = document.getElementById('show-historic-site');
let showHistoricDistric_button_h = document.getElementById('show-historic-distric');
let streetCodeSelectBar_div_h = document.getElementById('streetcode-selectbar');
let searchStreetCoorGoogle_button_h = document.getElementById('search-street-coor-google');
let zoomToAllDistricts_button_h = document.getElementById('zoom-to-all-districts');
let zoomBackToStreet_button_h = document.getElementById('zoom-back-street');
let zoomToAllProperties_button_h = document.getElementById('zoom-to-sites-bound');
let traverseStreet_button_h = document.getElementById('traverse-street');
// slides
let slide1_div_h = document.getElementById('slide-1');
let slide0_div_h = document.getElementById('slide-0');
let slide2_div_h = document.getElementById('slide-2');
let slide3_div_h = document.getElementById('slide-3');



// sections
let section1_div_h = document.getElementById('section1');
// scroll up and down buttons
let scrollUp_button_h = document.getElementById('scroll-up');
let scrollDown_button_h = document.getElementById('scroll-down');
let scrollUp_button_1_h = document.getElementById('scroll-up-1');
let scrollDown_button_1_h = document.getElementById('scroll-down-1');
let scrollUp_button_2_h = document.getElementById('scroll-up-2');
let scrollDown_button_2_h = document.getElementById('scroll-down-2');
let scrollUp_button_3_h = document.getElementById('scroll-up-3');
let scrollDown_button_3_h = document.getElementById('scroll-down-3');

// markers
let marker_currStreetObj = L.marker([0, 0],  {icon: redIcon});
currObjDisplay.addLayer(marker_currStreetObj);

// circles
let circleCurrObj = L.circle([0, 0], { radius: 0});
currObjDisplay.addLayer(circleCurrObj);




/* ----------------------- simple button event listener ------------------- */
scrollDown_button_h.addEventListener('click', () => {
  slide1_div_h.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  // also zoom in map 
  map.flyTo([39.95044589239213, -75.14952817429528], 12);

});

scrollUp_button_h.addEventListener('click', () => {
  section1_div_h.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
});

scrollUp_button_1_h.addEventListener('click', () => {
  slide0_div_h.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  // set map to the original zoom level
  map.flyTo([40.00, -75.14], 11);
  // clear all layers except for the historic street layer
  if (geojsonLayer_sites) {
    geojsonLayer_sites.clearLayers();
  }
  if (layerGroup_markerDistrict) {
    layerGroup_markerDistrict.clearLayers();
  }
  if (geojsonLayer_districts) {
    geojsonLayer_districts.clearLayers();
  }
  if (geojsonLayer_currObj) {
    geojsonLayer_currObj.clearLayers();
  }
  if (currObjDisplay) {
    currObjDisplay.clearLayers();
  }
  if (currSurroundingStreetDisplay) {
    currSurroundingStreetDisplay.clearLayers();
  }
  // also set currSelectedObj to NULL
  // Object.keys(currSelectedObj).forEach(key => {
  //   currSelectedObj[key] = null;
  // });

});

scrollDown_button_1_h.addEventListener('click', () => {
  slide2_div_h.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
});

scrollUp_button_2_h.addEventListener('click', () => {
  slide1_div_h.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
});

scrollDown_button_2_h.addEventListener('click', () => {
  slide3_div_h.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
});

scrollUp_button_3_h.addEventListener('click', () => {
  slide2_div_h.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
});





// if currentslide is the 1 then zoom in the map
function zoomInForSlide1 (slideIndex) {
  if (slideIndex === 1) {
    map.setView([40.00, -75.14], 15);
    console.log(`It is time to chnage zoom level`);
  }
}

/*
Function: do certain things to current slide
*/
document.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + window.innerHeight;
  const slideDivs = document.getElementsByClassName('slide');
  let slideIndex;
  for (slideIndex = 0; slideIndex < slideDivs.length; slideIndex++) {
    const slideDiv = slideDivs[slideIndex];
    const slidePos = slideDiv.offsetTop;
    if (slidePos > scrollPos) {
      slideIndex--;
      break;
    }
  }
  //?????????? not working
  if (slideIndex === 1) {
    zoomInForSlide1();
  }
})


/*
load the first json file
data: historic street Philly
*/

// style geojson
function style(feature) {
  return {
    fillColor: '#bdb2ff',
    weight: 2,
    opacity: 1,
    color: '#bdb2ff',
    fillOpacity: 0.7
  };
}

function style_currObj(feature) {
  return {
    fillColor: '#d62828',
    weight: 2,
    opacity: 1,
    color: '#d62828',
    fillOpacity: 0.7
  };
}

const toolTipStyle = {
  direction: 'left',
  permanent: false,
  sticky: true,
  offset: [0, 10],
  opacity: 0.75,
  backgroundColor: 'black',
  className: 'leaflet-tooltip-own' 
};

function onEachFeature(feature, layer) {
  let code = feature.properties.ST_CODE;
  let on_street = feature.properties.ON_STREET;
  let from_street = feature.properties.FROM_STREE;
  let to_street = feature.properties.TO_STREET;
  let toolTipText = `<b>Street Code</b>: ${code}${'<br>'}
  <b>Address</b>: on ${on_street}${'<br>'} 
  &emsp;&emsp;&emsp;&emsp;&ensp;&ensp;
  from ${from_street}${'<br>'} 
  &emsp;&emsp;&emsp;&emsp;&ensp;&ensp;
  to ${to_street}`;
  layer.bindTooltip(toolTipText, {permanent: false });

}

function loadStreetData(callback) {
  const url = 'https://opendata.arcgis.com/datasets/9409bce14c4e4768a11a8432e80bfa68_0.geojson';
  fetch(url)
  .then(resp => resp.json())
  .then(data => {
    historicStreetCollection = data;
    geojsonLayer_street = L.geoJSON(data, { style, onEachFeature });
    layerGroup_street.addLayer(geojsonLayer_street);
    if (callback) {
      callback();
    }
  });

}

let initializeStreetNameChoices = () => {
  // Get the zipcodeselece element
  let featureArr = historicStreetCollection.features;
  // declare an arr of street names
  let streetNameArr = [];
  // interate over all features
  featureArr.map((feature) => {
    let street_1 = feature.properties.ON_STREET;
    let street_2 = feature.properties.FROM_STREET;
    let street_3 = feature.properties.TO_STREET;
    // push back all names to the array
    if (street_1) {
      streetNameArr.push(street_1);
    }
    if (street_2) {
      streetNameArr.push(street_2);
    }

    if (street_3) {
      streetNameArr.push(street_3);
    }
  })
  // get unique numeber of street name
  const uniqueStreetNameArr = [...new Set(streetNameArr)];
  // add all street name to select dropdown
  for (let name of uniqueStreetNameArr) {
    findStreetName_select_h.innerHTML += `<option>${name}</option>`;
  }

  // get the array of zipcode
  // const arrOfStreetCode = historicStreetCollection.features.map((feature) => feature.properties.ST_CODE);
  const arrOfStreetCode = historicStreetCollection.features.map((feature) => {
    return feature.properties.ST_CODE;
  });

  // get unique members of arrOfZipCode
  const uniqueStreetCodeArr = [...new Set(arrOfStreetCode)];
  // loop through each zip code and add it to the zip-code-select element
  for (let code of uniqueStreetCodeArr) {
    selectStreetCode_select_h.innerHTML += `<option>${code}</option>`;
  }
};

loadStreetData(initializeStreetNameChoices);




/*
FUNCTION
a function of displaying current selected street information
display includes:
1. a marker of the current selected street 
2. a tooltip bound to the marker
2a. the tooltip shows the street name and the street code of current street
3. draw a geojson layer of street polygon using a different color
4. a circle emphasize the location of the street 
the function takes in an argument of [lat, lng] of curr street
*/

let displayCurrSelectedStreet = (coorLatLng) => {
  marker_currStreetObj.unbindTooltip();
  currObjDisplay.clearLayers();
  marker_currStreetObj.setLatLng(coorLatLng);
  currObjDisplay.addLayer(marker_currStreetObj);
  marker_currStreetObj.bindTooltip(`Street Name: ${currSelectedObj.properties.ON_STREET}<br>Street Code: ${currSelectedObj.properties.ST_CODE}`, {
    direction: 'right',
    permanent: true,
    sticky: true,
    offset: [20, -50],
    opacity: 0.65,
    className: 'leaflet-tooltip-own' 
  });
  circleCurrObj = L.circle(coorLatLng, {color: "#BDB2ff", radius: 100, wieght: 0.5});
  currObjDisplay.addLayer(circleCurrObj);

  geojsonLayer_currObj = L.geoJSON(currSelectedObj, { style: style_currObj });
  currObjDisplay.addLayer(geojsonLayer_currObj);
  geojsonLayer_currObj.bringToFront();
}

/*
FUNCTION - SLIDE 1 - BROADLY FILTER STREET NAME 
1. find all street who has a street name 
   as a part of its ON_STREET, FROM_STREET or TO_STREET property
2. display 
*/
// add event listner to find-street
let findStreetName = (callback) => {
  findStreetName_select_h.addEventListener('change', () => {
  // get the value of selected street name
  let currStreet = findStreetName_select_h.value;
  // iterate over all features in historicStreetCollection
  let featureArr = historicStreetCollection.features;
  // declare an array of filtered result based on current selected street name
  // iterate over all feature
  filterStreetCollection = [];
  for (let feature of featureArr) {
    if (feature.properties.ON_STREET === currStreet ||
      feature.properties.FROM_STREE === currStreet ||
      feature.properties.TO_STREET === currStreet) {
      filterStreetCollection.push(feature);
  }
}
  // iterate over all features filtered and get a list of on_street properties
  let filteredStreetName = [];
  for (let feature of filterStreetCollection) {
    filteredStreetName.push(feature.properties.ON_STREET);

  }
  console.log(filteredStreetName);
  const uniqueOn_filteredStreetName = [...new Set(filteredStreetName)];
  console.log(uniqueOn_filteredStreetName);
  // get unique value of on_streetArr
  if (uniqueOn_filteredStreetName.length != 0) {
    if (!findStreetName_1_select_h) {
    // create an element of label
    let label = document.createElement('label');
    label.htmlFor = 'find-street-1';
    label.innerHTML = 'Filter Street: ';
    // create a select box
    let select = document.createElement('select');
    select.setAttribute('class', 'slide-select');
    select.setAttribute('id', 'find-street-1');
    findStreetName_1_select_h = select;

    selectBarContainer_div_h.appendChild(label);
    selectBarContainer_div_h.appendChild(select);

  } else {
    findStreetName_1_select_h.options.length = 0;
  };
  // create an option
  let option = document.createElement('option');
  option.setAttribute('value', 'Select on street');
  option.setAttribute('selected', true);
  option.innerHTML = 'Select on street';
  findStreetName_1_select_h.appendChild(option);

  // get the filter newly created select in html
  if (findStreetName_1_select_h) {
      // populate the list with the uniqueOn_streetArr
      for (let name of uniqueOn_filteredStreetName) {
        findStreetName_1_select_h.innerHTML += `<option>${name}</option>`;
      }
      if (callback) {
        callback();
      }
    }
  } 

});
}


// add event listner to find-street-1
let filterStreetName = () => {
  if (findStreetName_1_select_h) {
    findStreetName_1_select_h.addEventListener('change', () => {
     // get value of selected street name
     let currStreet = findStreetName_1_select_h.value;
     // get the object which ON_STREET == currStreet;
     let currFeature = filterStreetCollection.filter(obj => {
      return obj.properties.ON_STREET === currStreet;
    })
     // get the coordinates of selected street
     let coorArr = currFeature[0].geometry.coordinates;
     // calculate the average coordinates
     let lngAvr;
     let latAvr;
     let sumLng = 0;
     let sumLat = 0;
     let numCoor = 0;
     for (let coor of coorArr) {
      sumLng += coor[0];
      sumLat += coor[1];
      numCoor ++;
    }
    lngAvr = sumLng / numCoor;
    latAvr = sumLat / numCoor;
     // fly the map to street coor
     map.flyTo([latAvr, lngAvr], 17);
     let currObj = currFeature[0];
     currSelectedObj = currObj;
     // flag for traversing surrounding street
     ifIndexToZero = true;
     console.log([latAvr, lngAvr]);
     // display current selected street
     displayCurrSelectedStreet([latAvr, lngAvr]);

     let from = currObj.properties.FROM_STREE;
     let to = currObj.properties.TO_STREET;
     let on = currObj.properties.ON_STREET;
     let code = currObj.properties.ST_CODE;

     // add a paragraph to html to display some information
     let p = document.getElementById('street-info');
     if (!p) {
      p = document.createElement('p');
      p.setAttribute('class', 'street-info');
      p.setAttribute('id', 'street-info');
    }
    p.innerHTML = `From Street: ${from}<br>
    To Street: ${to}<br>
    On Street: ${on}<br>
    Street Code: ${code}`;
    selectBarContainer_div_h.appendChild(p);
  })
  }
}

findStreetName(filterStreetName);


// add event listner to the google button
let googleSearch = (on_street) => {
  let generateMapUrl = () => {
    on_street = on_street.toString();
    let strArr = on_street.split(' ');
    let url = 'https://www.google.com/maps/search/?api=1&query=';
    for (let i = 0; i < strArr.length; i ++) {

      if (i === 0) {
        url += strArr[i].trim();
      } else {
        url += '+';
        url += strArr[i].trim();
      }
    }
    console.log(url);
    window.location.href = url;
  }
  if (searchStreetCoorGoogle_button_h) {
    searchStreetCoorGoogle_button_h.addEventListener('click', generateMapUrl, false);
  }
}


// add event listener to street code selector
selectStreetCode_select_h.addEventListener('change', () => {
  geojson_historicSites.features = [];
  // first clear the layer where sites and districts are display 
  if (geojsonLayer_sites) {
    geojsonLayer_sites.clearLayers();

  }
  if (geojsonLayer_districts) {
    geojsonLayer_districts.clearLayers();

  }
  if (layerGrouop_markerSite) {
    layerGrouop_markerSite.clearLayers();

  }
  if (layerGroup_markerDistrict) {
    layerGroup_markerDistrict.clearLayers();

  }

  if (currSurroundingStreetDisplay) {
    currSurroundingStreetDisplay.clearLayers();
  }


  let streetCode = selectStreetCode_select_h.value;
  const streetFiltered = historicStreetCollection.features.filter((feature) => {
    return feature.properties.ST_CODE.toString() === streetCode;
  })
  let streetObj = streetFiltered[0];
  currSelectedObj = streetObj;
  let coorArr = streetObj.geometry.coordinates;
  let latAvr;
  let lngAvr;
  let latSum = 0;
  let lngSum = 0;
  let numCoor = 0;
  for (let coor of coorArr) {
    lngSum += coor[0];
    latSum += coor[1];
    numCoor ++;
  }
  lngAvr = lngSum / numCoor;
  latAvr = latSum / numCoor;
  map.flyTo([latAvr, lngAvr], 16);
  currObj = currSelectedObj;
  displayCurrSelectedStreet([latAvr, lngAvr]);
  // display streets information 
  // add a paragraph to html to display some information
  let from = currObj.properties.FROM_STREE;
  let to = currObj.properties.TO_STREET;
  let on = currObj.properties.ON_STREET;
  let code = currObj.properties.ST_CODE;
  let p = document.getElementById('street-code');
  if (!p) {
    p = document.createElement('p');
    p.setAttribute('class', 'street-code');
    p.setAttribute('id', 'street-code');
  }
  p.innerHTML = `You are currently at:<br>
  From Street: ${from}<br>
  To Street: ${to}<br>
  On Street: ${on}<br>
  Street Code: ${code}`;
  streetCodeSelectBar_div_h.appendChild(p);
  // add a label asking if want to seach street address in google
  let label = document.getElementById('search-google');
  if (!label) {
    label = document.createElement('label');
    label.setAttribute('for', 'search-street-coor-google');
    label.setAttribute('id','search-google');
  } 
  label.innerHTML = 'Want to search street address in google map?';

  // add a button asking if want to search the street coor in google map
  let b = document.getElementById('search-street-coor-google');
  if (!b) {
    b = document.createElement('button');
    b.setAttribute('type', 'button');
    b.setAttribute('class', 'search-street-coor-google');
    b.setAttribute('id', 'search-street-coor-google');
  } 
  b.innerHTML = 'Google';
  streetCodeSelectBar_div_h.appendChild(label);
  streetCodeSelectBar_div_h.appendChild(b);
  searchStreetCoorGoogle_button_h = document.getElementById('search-street-coor-google');
  googleSearch(on);

});



function onEachFeature_1(feature, layer) {
  let coordinates = feature.geometry.coordinates[0][0];
  let location = feature.properties.loc;
  if (coordinates.length != 0) {
    let lat = coordinates[0];
    let lng = coordinates[1];
    if (Array.isArray(lat)) {
      lat = lat[0];
      lng = lat[1];
    }

    if (lat && lng) {
      let marker = L.marker([lng, lat]).bindTooltip(`${location}`);
      layerGrouop_markerSite.addLayer(marker);
    }

  }

}

// helper function calculating average lat and lng
let computerAvrCoor = (array_Coor) => {
  let latAvr;
  let lngAvr;
  let latSum = 0;
  let lngSum = 0;
  let numCoor = 0;
  for (let coor of array_Coor) {
    latSum += coor[0];
    lngSum += coor[1];
    numCoor++;
  }
  latAvr = latSum / numCoor;
  lngAvr = lngSum / numCoor;
  return [latAvr, lngAvr];

}

function onEachFeature_2(feature, layer) {
  let name = feature.properties.name;
  // get coordinates 
  let coordinates_single = feature.geometry.coordinates[0][0][0];
  let coorArr;
  // if coordinates_single is an array
  if (! Array.isArray(coordinates_single)) {
    coorArr = feature.geometry.coordinates[0];
  } else {
    coorArr = feature.geometry.coordinates[0][0];
  }

  // calculate average coordinates of a polygon
  let coorAvr = computerAvrCoor(coorArr);
  let marker = L.marker([coorAvr[1], coorAvr[0]]).bindTooltip(`${name}`);
  layerGroup_markerDistrict.addLayer(marker);

}

function style_1(feature) {
  return {
    fillColor: '#fdffb6',
    weight: 1,
    opacity: 1,
    color: '#fdffb6',
    fillOpacity: 0.7,
  };

}
function style_2(feature) {
  return {
    fillColor: '#2ec4b6',
    weight: 1,
    opacity: 1,
    color: '#2ec4b6',
    fillOpacity: 0.7,
  };

}

// function filtering historic sites data
let filterHistoricSites = (currObj) => {
  let currCoor;
  let coordinates_single_curr = currObj.geometry.coordinates[0][0];
  if (! Array.isArray(coordinates_single_curr)) {
    currCoor = currObj.geometry.coordinates[0];
  } else {
    currCoor = currObj.geometry.coordinates[0][0];
  }
  // iterate over all features in  historicSitesCollection
  for (let feature of historicSitesCollection.features) {
    // get coordinates 
    let coordinates_single = feature.geometry.coordinates[0][0][0];
    let coorArr;
    // if coordinates_single is an array
    if (! Array.isArray(coordinates_single)) {
      coorArr = feature.geometry.coordinates[0];
    } else {
     coorArr = feature.geometry.coordinates[0][0];
   }
    // calculate average coordinates of a polygon
    let coorAvr = computerAvrCoor(coorArr);

    let dis = Math.sqrt(Math.pow((coorAvr[0] - currCoor[0]), 2) + Math.pow((coorAvr[1] - currCoor[1]), 2));
    let delta = 0.005;
    if (dis < delta) {
      geojson_historicSites.features.push(feature);
    }
  }

}


// add event listener to button to show historic surrounding properties
showHistoricSite_button_h.addEventListener('click', () => {
// load json data from of historic sites
// load philly historic properties file to map 
const url_1 = 'https://phl.carto.com/api/v2/sql?q=SELECT+*+FROM+historic_sites_philreg&filename=historic_sites_philreg&format=geojson&skipfields=cartodb_id';
fetch(url_1)
.then(resp => resp.json())
.then(data => {
  historicSitesCollection = data;
  if(currSelectedObj) {
    console.log(`Before filtering data: ${historicSitesCollection.features.length}`);
    filterHistoricSites(currSelectedObj);
    console.log(`After filtering data: ${geojson_historicSites.features.length}`);
  }
  console.log(historicSitesCollection.features.length);
  if (!currSelectedObj) {
    geojsonLayer_sites = L.geoJSON(data, { style: style_1, onEachFeature: onEachFeature_1}).addTo(map);
  } else {
  geojsonLayer_sites = L.geoJSON(geojson_historicSites, { style: style_1/*, onEachFeature: onEachFeature_1*/}).addTo(map);
}

geojsonLayer_sites.bringToBack();
});



})

showHistoricDistric_button_h.addEventListener('click', () => {
  const url_2 = 'https://phl.carto.com/api/v2/sql?q=SELECT+*+FROM+historicdistricts_local&filename=historicdistricts_local&format=geojson&skipfields=cartodb_id';
  fetch(url_2)
  .then(resp => resp.json())
  .then(data => {
    historicDistrictCollection = data;
    geojsonLayer_districts = L.geoJSON(data, { style: style_2, onEachFeature: onEachFeature_2})
    .addTo(map);
    geojsonLayer_districts.bringToBack();
  });
})


// add a function to calculate the district boundary 
let computeDistrictBound = () => {
  if (historicDistrictCollection.features.length != 0) {
    let lat_max = -200;
    let lat_min = 200;
    let lng_max = -200;
    let lng_min = 200;
    // iterate all features
    for (let feature of historicDistrictCollection.features) {
       // get coordinates 
       let coordinates_single = feature.geometry.coordinates[0][0][0];
       let coorArr;
       // if coordinates_single is an array
       if (! Array.isArray(coordinates_single)) {
         coorArr = feature.geometry.coordinates[0];
       } else {
         coorArr = feature.geometry.coordinates[0][0];
       }
       // iterate all coordinates of polygon
       for (let coor of coorArr) {
        let lng = coor[0];
        let lat = coor[1];
        if (lat > lat_max) {
          lat_max = lat;
        }
        if (lat < lat_min) {
          lat_min = lat;
        }

        if (lng > lng_max) {
          lng_max = lng;
        }

        if (lng < lng_min) {
          lng_min = lng;
        }

      }
    }


    return [lat_max, lat_min, lng_max, lng_min];


  }
}

// add event listner to button to see all districts

zoomToAllDistricts_button_h.addEventListener('click', () => {
  if (historicDistrictCollection.features.length != 0) {
    //compute max and min coords
    let coords = computeDistrictBound();
    southWest_district = L.latLng(coords[1], coords[3]);
    northEast_district = L.latLng(coords[0], coords[2]);
    let bounds = L.latLngBounds(southWest_district, northEast_district);
    map.flyToBounds(bounds);
  }

});

// compute proerpties bounds

let computePropertiesBound = () => {
  if (geojson_historicSites.features.length != 0) {
    let lat_max = -200;
    let lat_min = 200;
    let lng_max = -200;
    let lng_min = 200;
    for (let feature of geojson_historicSites.features) {
    // get coordinates 
    let coordinates_single = feature.geometry.coordinates[0][0][0];
    let coorArr;
    // if coordinates_single is an array
    if (! Array.isArray(coordinates_single)) {
      coorArr = feature.geometry.coordinates[0];
    } else {
     coorArr = feature.geometry.coordinates[0][0];
   }
       // iterate all coordinates of polygon
       for (let coor of coorArr) {
        let lng = coor[0];
        let lat = coor[1];
        if (lat > lat_max) {
          lat_max = lat;
        }
        if (lat < lat_min) {
          lat_min = lat;
        }

        if (lng > lng_max) {
          lng_max = lng;
        }

        if (lng < lng_min) {
          lng_min = lng;
        }

      }
    }


    return [lat_max, lat_min, lng_max, lng_min];


  }
}

// add event to zoom to see all properties surroundings
zoomToAllProperties_button_h.addEventListener('click', () => {
  if (geojson_historicSites.features.length != 0) {
        //compute max and min coords
        let coords = computePropertiesBound();
        southWest_site = L.latLng(coords[1], coords[3]);
        northEast_site = L.latLng(coords[0], coords[2]);
        let bounds = L.latLngBounds(southWest_site, northEast_site);
        map.flyToBounds(bounds);

      } else {
    // if all properties shown, zoom to see all
    map.flyTo([40.00, -75.14], 11);

  }
});


// fly to street bounds
let zoomBackToStreet = () => {
  let coorArr = currSelectedObj.geometry.coordinates;
  let latAvr;
  let lngAvr;
  let latSum = 0;
  let lngSum = 0;
  let numCoor = 0;
  for (let coor of coorArr) {
    lngSum += coor[0];
    latSum += coor[1];
    numCoor ++;
  }
  lngAvr = lngSum / numCoor;
  latAvr = latSum / numCoor;
  map.flyTo([latAvr, lngAvr], 16);
}

// add event to fly back to street
zoomBackToStreet_button_h.addEventListener('click', () => {
  if (currSelectedObj) {
    zoomBackToStreet();

  }
});

/*
FUNCTION
Compute the average coordinates of a certain street (feature)
*/
let computeAvr

/*
FUNCTION
To create an array of surrounding street of the current selected street
1. array surroundingStreets will be populated with filtered object
*/
let getSurroundingStreets = () => {
  surroundingStreets = [];
  if (currSelectedObj) {
    // set up threshold of distance
    let delta_dis = 0.005;
    let currCoor = computerAvrCoor(currSelectedObj.geometry.coordinates);
    // iterate over all feature in the street dataset
    for (let street of historicStreetCollection.features) {
      // if the street is the curr selected obj then continue loop
      if (street.properties.ON_STREET === currSelectedObj.properties.ON_STREET) {
        continue;
      }
      // get the avr coordinates of every street 
      // computerAvrCoor function takes in an array of coordinates
      // it will return [latAvr, lngAvr]
      let coorAvr = computerAvrCoor(street.geometry.coordinates);
      // calculate the distance between street and curr selected street
      let dis = Math.sqrt(Math.pow((coorAvr[0] - currCoor[0]), 2) + Math.pow((coorAvr[1] - currCoor[1]), 2));
      if (dis <= delta_dis) {
        // add the street to the array 
        surroundingStreets.push(street);
      }
    }
  }
}


// style geojson
function style_surrondingStreet(feature) {
  return {
    fillColor: '#80ffdb',
    weight: 2,
    opacity: 1,
    color: '#80ffdb',
    fillOpacity: 0.7
  };
}

function onEachFeature_surroundingStreet(feature, layer) {
  /*
  FUNCTION
  generate random interger between rwo values, inclusive
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  */
  function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }
  let imgIndex = getRandomIntInclusive(1, 4);
  let code = feature.properties.ST_CODE;
  let on_street = feature.properties.ON_STREET;
  

  let toolTipText = `<b>Street Code</b><br>${code}${'<br>'}
  <b>Street Name</b><br>${on_street}<br><img src = "img/mario-${imgIndex}.png" width="100" />`;


  layer.bindTooltip(toolTipText, {
  direction: 'left',
  permanent: true,
  sticky: true,
  offset: [0, 10],
  opacity: 0.75,
  backgroundColor: 'black',
  className: 'tooltip-surrounding-street' 

});

}
/*
FUNCTION
calculate bound of all surrounding street
*/
let computeSurroundingStreetBound = () => {
  if (surroundingStreets.length != 0) {
    let lat_max = -200;
    let lat_min = 200;
    let lng_max = -200;
    let lng_min = 200;
    // iterate all features
    for (let street of surroundingStreets) {
       // get coordinates 
       let coorArr = street.geometry.coordinates;
       // iterate all coordinates of polygon
       for (let coor of coorArr) {
        let lng = coor[0];
        let lat = coor[1];
        if (lat > lat_max) {
          lat_max = lat;
        }
        if (lat < lat_min) {
          lat_min = lat;
        }

        if (lng > lng_max) {
          lng_max = lng;
        }

        if (lng < lng_min) {
          lng_min = lng;
        }

      }
    }
    return [lat_max, lat_min, lng_max, lng_min];
  }
}


/*
EVENT LISTENER
add event when pressing traverseStreet_button_h button
1. select a random street of the surroundingStreets array 
2. when keep pressing the button, iterating all street in the surroundingStreets array
3. implemented by using these two global vars
   let currSelectedSurroundingStreet;
   let indexOfSurroundingStreet;
4. the display info will be added to this layergroup
   currSurroundingStreetDisplay
*/
traverseStreet_button_h.addEventListener('click', () => {
  // clear the previous layer
  if (currSurroundingStreetDisplay) {
    currSurroundingStreetDisplay.clearLayers();
  }
  if (ifIndexToZero) {
    indexOfSurroundingStreet = 0;
    ifIndexToZero = false;
  }
  
  getSurroundingStreets();
  // zoom to see all surrounding street
  let coords = computeSurroundingStreetBound();
  let southWest_district = L.latLng(coords[1], coords[3]);
  let northEast_district = L.latLng(coords[0], coords[2]);
  let bounds = L.latLngBounds(southWest_district, northEast_district);
  map.flyToBounds(bounds);

  
  let length = surroundingStreets.length;

  console.log(surroundingStreets);
  console.log(indexOfSurroundingStreet);

  currSelectedSurroundingStreet = surroundingStreets[indexOfSurroundingStreet];

  // display info of currSelectedSurroundingStreet
  // create a geojson layer 
  let geojsonStreet = L.geoJSON(currSelectedSurroundingStreet, { style: style_surrondingStreet, onEachFeature: onEachFeature_surroundingStreet });
  // add geojsonStreet to currSurroundingStreetDisplay
  currSurroundingStreetDisplay.addLayer(geojsonStreet);
  indexOfSurroundingStreet = (indexOfSurroundingStreet + 1) % length;

})













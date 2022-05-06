/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [
    39.981111,
    -75.12588500976562
  ],
  zoom: 11
});


var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
// var Stamen_TonerLite = L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

var featureGroup=[]
var pharmacyGroup=[]

var myIcon1 = L.divIcon({className: 'my-div-icon1'});
var myIcon2 = L.divIcon({className: 'my-div-icon2'});
var myIcon3 = L.divIcon({className: 'my-div-icon3'});
var myIcon4 = L.divIcon({className: 'my-div-icon4'});
var myIcon5 = L.divIcon({className: 'my-div-icon5'});
var myIcon6 = L.divIcon({className: 'my-div-icon6'});

var tearDown = function(){
  //remove all plotted data in prep for building the page with new filters, etc.
  featureGroup.map(function(marker){
    map = map.removeLayer(marker)
    featureGroup=[]
    pharmacyGroup=[]
  });
 

}


/* =====================
Build pages
===================== */
var data 
var markers

var page1 = {
  title: "Pharmacy visit scores",
  subIntro: "Most pharmacies with a low visit score less than 10, which means their visits are less than 10% of the most popular one.",
  bbox:[[40.06604611654875, -75.21446228027344], [39.91184298474967, -75.05756378173828]],
  startVisit: 0,
  endVisit: 100,
  popup: true,
  entryLengend: [ {visit_score: "0-2.12", color: "#F7DBB3"}, {visit_score: "2.12-5.42", color: "#F2CA52"},
  {visit_score: "5.42-11.58", color: "#F29727"}, {visit_score: "11.58-20.55", color: "#f2761a"}, {visit_score: "20.55-50", color: "#a62300"}, {visit_score: "50-100", color: "#760000"}]
}

var page2 = {
  title: "Low-visited Pharmacies",
  subIntro: "Most of low-visited pharmacies are city independent ones. They are all around the city.",
  bbox:[[40.06604611654875, -75.21446228027344], [39.91184298474967, -75.05756378173828]],
  startVisit: 0,
  endVisit: 11.58,
  popup: true,
  entryLengend: [ {visit_score: "0-2.12", color: "#F7DBB3"}, {visit_score: "2.12-5.42", color: "#F2CA52"}, {visit_score: "5.42-11.58", color: "#F29727"}]
}

var page3 = {
  title: "Morderate-visited Pharmacies",
  subIntro: "Moderate Pharmacies distribute more sparsely.",
  bbox:[[40.06604611654875, -75.21446228027344], [39.91184298474967, -75.05756378173828]],
  startVisit: 11.58,
  endVisit: 50,
  popup: true,
  entryLengend: [ {visit_score: "11.58-20.55", color: "#f2761a"}, {visit_score: "20.55-50", color: "#a62300"}]
}

var page4 = {
  title: "High-vsited Pharmacies",
  subIntro: "Most biggest pharmacies in Phiily is CVS, not surprisely.",
  bbox:[[40.06604611654875, -75.21446228027344], [39.91184298474967, -75.05756378173828]],
  startVisit: 50,
  endVisit: 100,
  popup: true,
  entryLengend: [{visit_score: "50-100", color: "#760000"}]
}


var slides = [
  page1,
  page2,
  page3,
  page4
]

var currentPage = -1

var nextPage = function(){
  //event handling for proceeding forward in slideshow
  var nextPage = currentPage +1
  currentPage = nextPage
  buildPage(slides[nextPage])
}

var prevPage = function(){
  //event handling for going backward in slideshow
  var prevPage = currentPage -1
  currentPage = prevPage
  buildPage(slides[prevPage])
}

var buildPage = function(pageDefinition){
  //build up a "slide" given a page definition
  //console.log(featureGroup)
  tearDown()
  //console.log(featureGroup)
  //featureGroup.map(function(m){
  //  map.removeLayer(m)
  //});


  map.fitBounds(pageDefinition.bbox)
  //console.log(pageDefinition.bbox)
  //console.log(currentPage)

  var filtered = _.filter(data,function(feature){
    return (feature.properties.visits >= pageDefinition.startVisit && feature.properties.visits <= pageDefinition.endVisit)
  })

  console.log(filtered)

  //console.log(featureGroup)

  //filter data
  //for (var i = 0; i < filtered.length - 1; i++){
  //  pageFeature = L.geoJson(filtered[i]["the_geom_geojson"], {
  //    style: myStyle
  //  }).addTo(map).bindPopup(filtered[i]["artist"]).openPopup()
  // }

  for (var i = 0; i < filtered.length - 1; i++){
    //To see if there are multiple polygons in a row.
    ////console.log(filtered[i]["the_geom_geojson"]["coordinates"][0][0][0].length==undefined)
    var lng = filtered[i]["geometry"]["coordinates"][0]
    var lat = filtered[i]["geometry"]["coordinates"][1]

    //feature = L.marker([lat, lng],{icon: myIcon1})
    if(filtered[i]["properties"]["visits"] >= 0 && filtered[i]["properties"]["visits"] < 2.12){
      feature = L.marker([lat, lng],{icon: myIcon1})
      featureGroup.push(feature)
    }
    else if(filtered[i]["properties"]["visits"] >= 2.12 && filtered[i]["properties"]["visits"] < 5.42){
      feature = L.marker([lat, lng],{icon: myIcon2})
      featureGroup.push(feature)
    }
    else if(filtered[i]["properties"]["visits"] >= 5.42 && filtered[i]["properties"]["visits"] < 11.58){
      feature = L.marker([lat, lng],{icon: myIcon3})
      featureGroup.push(feature)
    }
    else if(filtered[i]["properties"]["visits"] >= 11.58 && filtered[i]["properties"]["visits"] < 20.55){
      feature = L.marker([lat, lng],{icon: myIcon4})
      featureGroup.push(feature)
    }
    else if(filtered[i]["properties"]["visits"] >= 20.55 && filtered[i]["properties"]["visits"] < 50){
      feature = L.marker([lat, lng],{icon: myIcon5})
      featureGroup.push(feature)
    }
    else{
      feature = L.marker([lat, lng],{icon: myIcon6})
      featureGroup.push(feature)
  }

    featureGroup.push(feature)

    location_name = filtered[i]["properties"]["location_name"]
    pharmacyGroup.push(location_name)
   }

  //Avoid openPopup() affecting the bounds!
  len = filtered.length

  if (pageDefinition.popup == true){
    for (var i = 0; i < len - 1; i++){
     featureGroup[i].addTo(map).bindPopup(pharmacyGroup[i]).openPopup()
    }
  }else{
    for (var i = 0; i < len - 1; i++){
      featureGroup[i].addTo(map).bindPopup(pharmacyGroup[i])
     }
  }
  

  $('.my-div-icon1').css({backgroundColor:"#F7DBB3", borderRadius: "80%", opacity:"60%"})
  $('.my-div-icon2').css({backgroundColor:"#F2CA52", borderRadius: "80%", opacity:"60%"})
  $('.my-div-icon3').css({backgroundColor:"#F29727", borderRadius: "80%", opacity:"60%"})
  $('.my-div-icon4').css({backgroundColor:"#f2761a", borderRadius: "80%", opacity:"60%"})
  $('.my-div-icon5').css({backgroundColor:"#a62300", borderRadius: "80%", opacity:"60%"})
  $('.my-div-icon6').css({backgroundColor:"#760000", borderRadius: "80%", opacity:"90%"})


  //modify text
  $('#title').text(pageDefinition.title)
  
  $('#content').text("There are ".concat(len.toString()," pharmacies and drug stores within this score range. Click on the marker to see the name of the store"))
  $('#subIntro').text(pageDefinition.subIntro)

  
  if(currentPage === 0){
    $('#prev').hide()
  }else{
    $('#prev').show()
    $('#prev').prop("disabled", false)
  }

  if(currentPage === slides.length-1){
    $('#next').hide()
  }else{
    $('#next').show()
    $('#next').prop("disabled", false)
  }

  //modify legend
  var newLegend = function (entry){
    return (`<li ><span style='background:${entry.color};'></span>${entry.visit_score}</li>`)
    }
  entry = pageDefinition.entryLengend
  $(".legend-labels").html(entry.map(newLegend).join(" "))
  
}



/* =====================
Load data
===================== */

//json
//var dataset = "https://phl.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20percent_for_art_public"

//geojson
//var dataset = "https://phl.carto.com/api/v2/sql?q=SELECT%20*%20,%20ST_AsGeoJSON(the_geom)::json%20AS%20the_geom_geojson%20FROM%20percent_for_art_public"


var showResults = function() {
  /* =====================
  This function uses some jQuery methods that may be new. $(element).hide()
  will add the CSS "display: none" to the element, effectively removing it
  from the page. $(element).show() removes "display: none" from an element,
  returning it to the page. You don't need to change this part.
  ===================== */
  // => <div id="intro" css="display: none">
  $('#intro').hide();
  // => <div id="results">
  $('#results').show();
};




/* =====================
Custom style
===================== */

var myStyle = function(feature) {
return {color: "#f2761a", weight: 4, fillOpacity: 11.58 };
};




/* =====================
Execute here:
===================== */
$('#prev').hide()
var xxx = function(parsedData) {
  data = parsedData.features
  for (var i = 0; i < parsedData.features.length - 1; i++){
    //To see if there are multiple polygons in a row.
    ////console.log(parsedData.rows[i]["the_geom_geojson"]["coordinates"][0][0][0].length==undefined)
    var lng = parsedData.features[i]["geometry"]["coordinates"][0]
    var lat = parsedData.features[i]["geometry"]["coordinates"][1]

    if(parsedData.features[i]["properties"]["visits"] >= 0 && parsedData.features[i]["properties"]["visits"] < 2.12){
      feature = L.marker([lat, lng],{icon: myIcon1})
      featureGroup.push(feature)
    }
    else if(parsedData.features[i]["properties"]["visits"] >= 2.12 && parsedData.features[i]["properties"]["visits"] < 5.42){
      feature = L.marker([lat, lng],{icon: myIcon2})
      featureGroup.push(feature)
    }
    else if(parsedData.features[i]["properties"]["visits"] >= 5.42 && parsedData.features[i]["properties"]["visits"] < 11.58){
      feature = L.marker([lat, lng],{icon: myIcon3})
      featureGroup.push(feature)
    }
    else if(parsedData.features[i]["properties"]["visits"] >= 11.58 && parsedData.features[i]["properties"]["visits"] < 20.55){
      feature = L.marker([lat, lng],{icon: myIcon4})
      featureGroup.push(feature)
    }
    else if(parsedData.features[i]["properties"]["visits"] >= 20.55 && parsedData.features[i]["properties"]["visits"] < 50){
      feature = L.marker([lat, lng],{icon: myIcon5})
      featureGroup.push(feature)
    }
    else{
      feature = L.marker([lat, lng],{icon: myIcon6})
      featureGroup.push(feature)
  }
}

featureGroup.forEach(function(marker){
  marker.addTo(map)
})

$('.my-div-icon1').css({backgroundColor:"#F7DBB3", borderRadius: "80%", opacity:"60%"})
$('.my-div-icon2').css({backgroundColor:"#F2CA52", borderRadius: "80%", opacity:"60%"})
$('.my-div-icon3').css({backgroundColor:"#F29727", borderRadius: "80%", opacity:"60%"})
$('.my-div-icon4').css({backgroundColor:"#f2761a", borderRadius: "80%", opacity:"60%"})
$('.my-div-icon5').css({backgroundColor:"#a62300", borderRadius: "80%", opacity:"60%"})
$('.my-div-icon6').css({backgroundColor:"#760000", borderRadius: "80%", opacity:"90%"})


//console.log(featureGroup)



$('#next').click(nextPage)
$('#prev').click(prevPage)
};

//let phamData = { features:[] };

// function loadLifeData() {
//   fetch('data/journey.json')
//     .then(resp => resp.json())
//     .then(data => {
//       lifeCollection = data;
//       showCurrentSlide();
//     });
// }

function loadPhamData() {
  fetch('data/Pharmacies.GEOJSON')
    .then(resp => resp.json())
    .then(d => {
      xxx(d);
    });
}

loadPhamData();

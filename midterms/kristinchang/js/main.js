// SETUP
// Leaflet setup

var map = L.map('map', {
  center: [33.7170881,-117.8905657],
  zoom: 10
});

var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

// data setup
var dataset = 'data/cityCBOs.geojson';
var datum;
var featureGroup;

//define my style
let mapStyle = (feature) => {
    if (feature.properties.cbo_name<=2) {
        return ({fillColor: 'yellow',
          color: 'yellow',});
    } else if (feature.properties.cbo_name>2 && feature.properties.cbo_name<=8) {
        return ({fillColor: 'orange',
                color: 'orange',});
    } else {
        return ({fillColor: 'orangered',
                color: 'orangered',});
    };
};

//PAGE CONTENT
var page1 = {
    title: "Overview",
    content: "The map to the right displays the number of community-based organizations (CBOs) that conducted outreach activities for the 2020 Census by city. The following slides highlight the cities where the most CBOs held events, passed out flyers, canvassed, etc.. This story map intends to inform these organizations of other work that's being done in their shared service area(s) and should be utilized to form strong networks for futureorganizing movements. The data used to generate this app was provided by Charitable Ventures through the Good Work Collaborative. For a more detailed analysis, please visit the GWC's Census Atlas here: https://occensusatlas.com/docs/home.html",
    filter: function(feature) {return feature.properties.CITY !== null},
    style: mapStyle,
    bbox:[[33.407355,-118.295563],[34.044510,-117.299927]],
}

var page2 = {
    title: "Santa Ana",
    content: ("Santa Ana's outreach network consists of 22 CBOs: AASCSC, AltaMed, CAP OC, Catholic Charities of Orange County, Charitable Ventures, Clergy and Laity United for Economic Justice, Coalition of Orange County Community Health Centers , Community Health Initiative of Orange County , Latino Health Access, MOMS Orange County, NALEO, OC Herald Center, OC Human Relations, OCAPICA, OCCCO, Orange County Labor Federation, Orange County United Way, Project Access, Southland Integrated Services, Inc, The Cambodian Family, The LGBTQ Center OC."),
    filter: function(feature) {return feature.properties.CITY === "Santa ana"},
    style: mapStyle,
    bbox:[[33.659847,-117.961990],[33.796011,-117.793762]],
}

var page3 = {
    title: "Orange",
    content: "The city of Orange's outreach network consists of 22 CBOs: AASCSC, AltaMed, CAIR-LA, California Healthy Nail Salon Collaborative, CAP OC, Catholic Charities of Orange County, CHIRLA, Clergy and Laity United for Economic Justice, Community Health Initiative of Orange County, Help Me Grow, Hope Community Services , KCS, Latino Health Access, OC Human Relations, Orange County Labor Federation , Orange County United Way, South Asian Network, Southland Integrated Services, Inc., The Cambodian Family, VietRISE, WAVE.",
    filter: function(feature) {return feature.properties.CITY === "Orange"},
    style: mapStyle,
    bbox:[[33.747899,-117.918732],[33.877085,-117.699005]],
}

var page4 = {
    title: "Anaheim",
    content: "Anaheim's outreach network consists of 16 CBOs: Access California Services, CAIR-LA, CAP OC, Clergy and Laity United for Economic Justice, Institute for Healthcare Advancement , Jamboree Housing Corporation, KCS, NALEO Educational Fund, OC Human Relations, OC Labor , OCAPICA, OCCCO, Orange County United Way, Project Access, South Asian Network, The LGBTQ Center OC.",
    filter: function(feature) {return feature.properties.CITY === "Anaheim"},
    style: mapStyle,
    bbox:[[33.773198,-118.015892],[33.885821,-117.676689]],

}

var page5={
    title: "Garden Grove",
    content: "The city of Garden Grove's outreach network consists of 12 CBOs: Access California Services, AltaMed, Boys & Girls Clubs of Garden Grove, CAIR-LA, CAP OC, Jamboree Housing Corporation, KCS, OC Human Relations, OCAPICA, OCCCO, Southland Integrated Services, Inc..",
    filter: function(feature) {return feature.properties.CITY === "Garden grove"},
    style: mapStyle,
    bbox:[[33.728735,-118.060181],[33.816326,-117.867577]]

}

var page6={
    title: "Westminster",
    content: "The city of Westminster's outreach network consists of 10 CBOs: AASCSC, Access California Services, California Healthy Nail Salon Collaborative, CAP OC, MOMS Orange County, OCAPICA, Orange County United Way, Southland Integrated Services, Inc. , VietRISE.",
    filter: function(feature) {return feature.properties.CITY === "Westminster"},
    style: mapStyle,
    bbox:[[33.702760,-118.077072],[33.786099,-117.931503]]

}

var page7={
    title: "Irvine",
    content: "Irvine's outreach network consists of 9 CBOs: AASCSC, CAIR-LA, CAP OC, Council on Americans Islamic Relations, Jamboree Housing Corporation, KCS, OC Herald Center, Orange County Labor Federation, Orange County United Way.",
    filter: function(feature) {return feature.properties.CITY === "Irvine"},
    style: mapStyle,
    bbox:[[33.596876,-117.899094],[33.745984,-117.659454]]

}

// PAGE MOVEMENT
var slides = [page1, page2, page3, page4, page5, page6, page7];
var currentPage = 0;

// next page button
var nextPage = function(){
    $('#prev').prop("disabled",false) //make sure the other button is enabled

    tearDown()
    var nextPage = currentPage + 1
    currentPage = nextPage
    console.log(currentPage)
    buildPage(datum, currentPage)

    if(currentPage === slides.length -1){
        $('#next').prop("disabled",true)
    }
}

// previous page button
var previousPage = function(){
    $('#next').prop("disabled",false) //make sure the other button is enabled

    tearDown()
    var prevPage = currentPage - 1
    currentPage = prevPage
    console.log(currentPage)
    buildPage(datum, currentPage)

    if(currentPage === 0){
        $('#prev').prop("disabled",true)
    }
}

//change title, change content, move to the bounding box.
var buildPage = function(data, pageId){
    //add features to map
    featureGroup = L.geoJson(data, {
      style: slides[pageId].style,
      filter: slides[pageId].filter
    }).addTo(map);

    featureGroup.eachLayer(eachFeatureFunction);

    //change title and content
    $('#subtitle').text(slides[pageId].title)
    $('#content').text(slides[pageId].content)
    if(slides[pageId].bbox !== undefined){
        map.flyToBounds(slides[pageId].bbox)
    }


}

var tearDown = function(){
    //remove all previously plotted data to build next page
    featureGroup.remove();
}

var myStyle = function(feature) {
  return {};
};

var eachFeatureFunction = function(layer) {
    layer.bindPopup(
        'geometry ' + layer.feature.properties.geometry +
        '<br> Number of CBOs ' + layer.feature.properties.cbo_name)
  layer.on('click', function (event) {
    /* =====================
    The following code will run every time a layer on the map is clicked.
    Check out layer.feature to see some useful data about the layer that
    you can use in your application.
    ===================== */
    console.log(layer.feature);

    // +

  });
};

// loading in my dataset 
dataset = fetch('data/cityCBOs.geojson')
  .then(resp => resp.json())
  .then(data => {
      dataset=L.geoJSON(data, {style: mapStyle})
      buildPage(data,0);
      $('#prev').prop("disabled",true)
      datum = data
  });

  // display buttons
$('#next').click(nextPage)
$('#prev').click(previousPage)
$('#close').click(function(){
    console.log('clicked')
    document.querySelector('.bg-modal').style.display="none";
})

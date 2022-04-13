/* =====================
Content Building
===================== */

/* Map Setup */
var map = L.map('map', {
    center: [37.75768707689704, -122.11578369140626],
    zoom: 10
  });
  
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
  }).addTo(map);
  

var data;
var markers;

var slide1 = {
    title: "SF Registered Businesses",
    content: "",
    // bounding box for neighborhood with most businesses
    bbox: [[37.75592273798062,-122.43129730224608],[37.75592273798062,-122.40760803222655]],
}

var slide2 = {
    title: "Professional, Scientific, and Technical Services",
    content: "",
    bbox: [[37.75592273798062,-122.43129730224608],[37.75592273798062,-122.40760803222655]],
}

var slide3 = {
    title: "Real Estate and Rental and Leasing Services",
    content: "",
    bbox: [[37.78930232286027,-122.41722106933594],[37.78930232286027,-122.39748001098633]],
}

var slide4 = {
    title: "Construction",
    content: "",
    bbox: [[37.72089869333035,-122.40194320678711],[37.72089869333035,-122.36074447631836]],
}

var slide5 = {
    title: "Retail Trade",
    content: "",
    bbox: [[37.72985990988079,-122.43284225463867],[37.72985990988079, -122.39267349243164]],
}

var slide6 = {
    title: "Food Services",
    content: "",
    bbox: [[37.77559951996455,-122.44537353515625],[37.77559951996455, -122.41649150848389]],
}

var slide7 = {
    title: "Private Education and Health Services",
    content: "",
    bbox: [[37.77400521704548,-122.41498947143556],[37.77400521704548, -122.38632202148438]],
}

var slide8 = {
    title: "Arts, Entertainment, and Recreation",
    content: "",
    bbox: [[37.73230368985314,-122.51592636108398],[37.73230368985314, -122.46940612792967]],
}

var slide9 = {
    title: "Accommodations",
    content: "",
    bbox: [[37.78930232286027,-122.41722106933594],[37.78930232286027,-122.39748001098633]],
}

var slide10 = {
    title: "Transportation and Warehousing",
    content: "",
    bbox: [[37.74139927315054,-122.48554229736328],[37.74139927315054, -122.4429702758789]],
}

var slide11 = {
    title: "Multiple",
    content: "",
    bbox: [[37.77230911236875,-122.43606090545656],[37.77230911236875, -122.41198539733887]],
}

var slide12 = {
    title: "Financial Services",
    content: "",
    bbox: [[37.794151963635098,-122.4255895614624],[37.79415196363509, -122.39619255065918]],
}


var slides = [
    slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8, slide9, slide10, slide11, slide12
]

var naic_des = [
    "Professional, Scientific, and Technical Services",
    "Real Estate and Rental and Leasing Services",
    "Construction",
    "Retail Trade",
    "Food Services",
    "Private Education and Health Services",
    "Arts, Entertainment, and Recreation",
    "Accommodations",
    "Transportation and Warehousing",
    "Multiple", 
    "Financial Services"
]


var currentSlide = 0

var removeLastMarkers = function(){
    markers.forEach(function(marker) {
        map.removeLayer(marker)
    })
}

var nextSlide = function() {
    removeLastMarkers()
    var nextSlide = currentSlide + 1;
    currentSlide = nextSlide;
    buildSlide(slides[nextSlide])
}

var lastSlide = function() {
    removeLastMarkers()
    var lastSlide = currentSlide - 1;
    currentSlide = lastSlide;
    buildSlide(slides[lastSlide])
}

var legend = L.control({ position: "bottomright" });
legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>NAICS Industries</h4>";
    div.innerHTML += '<i style="background: #577590"></i><span>Professional, Scientific, and Technical</span><br>';
    div.innerHTML += '<i style="background: #f3722c"></i><span>Real Estate and Rental and Leasing</span><br>';
    div.innerHTML += '<i style="background: #4d908e"></i><span>Construction</span><br>';
    div.innerHTML += '<i style="background: #f8961e"></i><span>Retail Trade</span><br>';
    div.innerHTML += '<i style="background: #43aa8b"></i><span>Food</span><br>';
    div.innerHTML += '<i style="background: #f46036"></i><span>Private Education and Health</span><br>';
    div.innerHTML += '<i style="background: #335c67"></i><span>Arts, Entertainment, and Recreation</span><br>';
    div.innerHTML += '<i style="background: #90be6d"></i><span>Accommodations</span><br>';
    div.innerHTML += '<i style="background: #735d78"></i><span>Transportation and Warehousing</span><br>';
    div.innerHTML += '<i style="background: #e6b89c"></i><span>Multiple</span><br>';
    div.innerHTML += '<i style="background: #9f7e69"></i><span>Financial</span><br>';
    div.innerHTML += '<i style="background: #277da1"></i><span>Unknown</span><br>';

    return div;
};

var buildSlide = function(slide) {
    /* filter data according to naics */
    if (currentSlide == 0) {
        filteredData = data
        $('#title').text("Businesses in SF");
    } else {
        filteredData = data.filter(
            a => 
            a.properties.naic_code_description == naic_des[currentSlide-1]
        );
        $('#title').text(naic_des[currentSlide-1])
    }
    /* plot markers */
    /* marker styles */
    markers = filteredData.map(function(a) {
        if (a.properties.naic_code_description == null) {
            var customIcon = L.divIcon({className: "nValue"});
        } else {
            var customIcon = L.divIcon({className: a.properties.naic_code_description.substr(0,4)});
        }
        var markerOptions = { icon: customIcon };
        return L.marker([a.geometry.coordinates[1],a.geometry.coordinates[0]],
            markerOptions
            ).addTo(map).bindPopup(
                "Business: " + a.properties.dba_name +
                "<br>Ownership: " + a.properties.ownership_name +
                "<br>Industry: " + a.properties.naic_code_description
            )
    });
    legend.addTo(map);
    /* find focused neighborhoods */
    noNullData = filteredData.filter(
        a => 
        a.properties.neighborhoods_analysis_boundaries != null
    );
    top_neighborhoods_obj = _.chain(noNullData).groupBy(a => a.properties.neighborhoods_analysis_boundaries)._wrapped
    $('.neighborhood1').text(Object.keys(top_neighborhoods_obj)[0])
    $('.neighborhood2').text(Object.keys(top_neighborhoods_obj)[1])
    $('.neighborhood3').text(Object.keys(top_neighborhoods_obj)[2])
    if (currentSlide != 0) {
        /* zoom to */
        map.flyToBounds(slide.bbox);
        /* change page content */
        $('#content').text(slide.content)
    }
    /* change buttons */
    if (currentSlide === 0) {
        $('#previousButton').prop("disabled", true)
    } else {
        $('#previousButton').prop("disabled", false)
    }
    if (currentSlide === slides.length - 1) {
        $('#nextButton').prop("disabled", true)
    } else {
        $('#nextButton').prop("disabled", false)
    }
}

/* Call */
$.ajax('https://data.sfgov.org/resource/g8m3-pdis.geojson').done(function(json) {
    data = json.features
    buildSlide(slides[currentSlide])
})

/* Interaction */
$('#nextButton').click(function(e) {
    nextSlide()
});

$('#previousButton').click(function(e) {
    lastSlide()
});

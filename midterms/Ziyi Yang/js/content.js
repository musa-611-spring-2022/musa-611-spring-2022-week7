/* =====================
Content Building
===================== */

/* Map Setup */
var map = L.map('map', {
    center: [39.30060485447489, -76.59852311940547],
    zoom: 12
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
    title: "Baltimore Restaurant",
    content: "",
    // bounding box for neighborhood with most businesses
    bbox: [[39.35898884740698, -76.694666529803972],[39.26176552850728, -76.54566445016313]],
}

var slide2 = {
    title: "SOUTHEASTERN",
    content: "",
    filter: function(feature) {return feature.properties.plcdst === "SOUTHEASTERN"},
    bbox: [[39.307267154641856, -76.61417034151616],[39.247383214492444, -76.53397971673056]],
}

var slide3 = {
    title: "CENTRAL",
    content: "",
    filter: function(feature) {return feature.properties.plcdst === "CENTRAL"},
    bbox: [[39.317021042814666, -76.63781623591873],[39.28308384403558, -76.60242009140651]],
}

var slide4 = {
    title: "SOUTHERN",
    content: "",
    filter: function(feature) {return feature.properties.plcdst === "SOUTHERN"},
    bbox: [[39.294070869366614, -76.64832604505739],[39.25073930549826, -76.56880093871098]],
}

var slide5 = {
    title: "NORTHERN",
    content: "",
    filter: function(feature) {return feature.properties.plcdst === "NORTHERN"},
    bbox: [[39.32304984758056, -76.61931563053108],[39.37248312431181, -76.64483156041719]],
}

var slide6 = {
    title: "NORTHEASTERN",
    content: "",
    filter: function(feature) {return feature.properties.plcdst === "NORTHEASTERN"},
    bbox: [[39.3230498477342, -76.5943368786779],[39.36791512823255, -76.53820183285794]],
}

var slide7 = {
    title: "EASTERN",
    content: "",
    filter: function(feature) {return feature.properties.plcdst === "EASTERN"},
    bbox: [[39.312670637708514, -76.61609355275053],[39.29219755778816, -76.57434287191866]],
}

var slide8 = {
    title: "SOUTHWESTERN",
    content: "",
    filter: function(feature) {return feature.properties.plcdst === "SOUTHWESTERN"},
    bbox: [[39.30982072324053, -76.67186750510493],[39.265884207906915, -76.63981061950895]],
}

var slide9 = {
    title: "NORTHWESTERN",
    content: "",
    filter: function(feature) {return feature.properties.plcdst === "NORTHWESTERN"},
    bbox: [[39.357461302582436, -76.70267944473537],[39.3333308297321, -76.65214083900092]],
}

var slide10 = {
    title: "WESTERN",
    content: "",
    filter: function(feature) {return feature.properties.plcdst === "WESTERN"},
    bbox: [[39.31711532979061, -76.66404003919853],[39.29134456665574, -76.62758374933188]],
}
/*
var slide11 = {
    title: "TOBACCO PRODUCTS WHOLESALER",
    content: "",
    bbox: [[39.55586164001905, -75.784454456582],[38.489886629020674, -75.10656992234296]],
}

var slide12 = {
    title: "LESSOR-MOTOR VEHICLES",
    content: "",
    bbox: [[39.55586164001905, -75.784454456582],[38.489886629020674, -75.10656992234296]],
}*/


var slides = [
    slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8, slide9, slide10
]

var direction = [
    "SOUTHEASTERN",
    "CENTRAL",
    "SOUTHERN",
    "NORTHERN",
    "NORTHEASTERN",
    "EASTERN",
    "SOUTHWESTERN",
    "NORTHWESTERN",
    "WESTERN"
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
    div.innerHTML += "<h4>All Restaurant</h4>";
    div.innerHTML += '<i style="background: #577590"></i><span>SOUTHEASTERN</span><br>';
    div.innerHTML += '<i style="background: #f3722c"></i><span>CENTRAL</span><br>';
    div.innerHTML += '<i style="background: #4d908e"></i><span>SOUTHERN</span><br>';
    div.innerHTML += '<i style="background: #f8961e"></i><span>NORTHERN</span><br>';
    div.innerHTML += '<i style="background: #43aa8b"></i><span>NORTHEASTERN</span><br>';
    div.innerHTML += '<i style="background: #f46036"></i><span>EASTERN</span><br>';
    div.innerHTML += '<i style="background: #335c67"></i><span>SOUTHWESTERN</span><br>';
    div.innerHTML += '<i style="background: #90be6d"></i><span>NORTHWESTERN</span><br>';
    div.innerHTML += '<i style="background: #735d78"></i><span>WESTERN</span><br>';

    return div;
};

var buildSlide = function(slide) {
    /* filter data according to naics */
    if (currentSlide == 0) {
        filteredData = data
        $('#title').text("Restaurants in Baltimore");
    } else {
        filteredData = data.filter(
            a =>
            a.properties.plcdst == direction[currentSlide-1]
        );
        $('#title').text(direction[currentSlide-1])
    }
    /* plot markers */
    /* marker styles */
    markers = filteredData.map(function(a) {
        if (a.properties.plcdst == null) {
            var customIcon = L.divIcon({className: "nValue"});
        } else {
            var customIcon = L.divIcon({className: a.properties.plcdst});
        }
        var markerOptions = { icon: customIcon };
        return L.marker([a.geometry.coordinates[1],a.geometry.coordinates[0]],
            markerOptions
            ).addTo(map).bindPopup(
                "<br>Name: " + a.properties.name +
                "<br>Industry: " + a.properties.plcdst
            )
    });
    legend.addTo(map);

    /* find focused neighborhoods */
        noNullData = filteredData.filter(
            a =>
            a.properties.nghbrhd != null
        );
        top_neighborhoods_obj = _.chain(noNullData).groupBy(a => a.properties.nghbrhd)._wrapped
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
$.ajax("https://opendata.arcgis.com/datasets/42f8856d647a41b89561e10fb60bc98a_0.geojson").done(function(json) {
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

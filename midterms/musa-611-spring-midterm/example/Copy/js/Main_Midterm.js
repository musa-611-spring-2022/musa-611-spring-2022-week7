/* =====================
Leaflet Configuration
===================== */


var map = L.map('map', {
    center: [40.000, -75.1090],
    zoom: 11
  });
  var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
  }).addTo(map);
  
  //load the data
  $.ajax('https://opendata.arcgis.com/datasets/3803641418e847a0bf7e28cd124f768e_0.geojson').done(function(json){
  // parse the data
    var parsed= JSON.parse(JSON.stringify(json))
    console.log(parsed)
    const transition = Object.values(parsed);
    var data = transition[3];
    console.log(data)
    var GSI= JSON.parse(JSON.stringify(data))
    console.log(GSI)

    //create new columns
    data= GSI.map(function(datum){
      datum.Lat=Number(datum.geometry.coordinates[0])
      datum.Long=Number(datum.geometry.coordinates[1])
      return datum}
    )
    data= data.map(function(datum){
      datum.status=datum.properties.SMPDATA_PHASE
      return datum}
    )
    data= data.map(function(datum){
      datum.type=datum.properties.PRIMARYPROGRAMNAME
      return datum}
    )
    data= data.map(function(datum){
      datum.name=datum.properties.PROJECTNAME
      return datum}
    )
    
    console.log(data)  

var markers;

// create slides
var page0={
  title: "Green & sdfsfdsClean: Green Stormwater Infrastructure in Philadlephia",
  content: "This sdfsmap shows the status of Philadelphia's sewage system in 1895. As the map shows, the sewage system was divided up between intercepting sewers in red and combined sewers in blue. At the time of this map, creating sewers in natural stream valleys was common practice as the natural gravity of the stream helped with flow. However, now combined with heavy rains, this combined system can cause overflow of sewage into natural waterways which is why the Environmental Protection Agency considers cities that have combined sewer systems, like Philadelphia, to be in violation of the federal Clean Water Act.",
  status: "Built",
  type1: "Open Space",
  type2: "Vacant Land",
  type3:"Parking",
  type4:"Facilities",
  type5:"Schools",
  type6:"Streets",
  type7:"Open Space,Streets",
  type8:"Parking,Streets,Vacant Land",
  type9:"Streets,Vacant Land",
  type10: "Facilities,Streets",
  picture: "gsi"
}
  
var page1={
    title: "Green Stormwater Infrastructure (GSI)",
    content: "In order to become compliant with the Clean Water Act, Philadelphia needed to resolve its combined sewer and stormwater systems. Instead of taking the more traditional approach of separating the combined systems, the City decided to pursue a cheaper and far more innovative plan. The $4.5 billion, 25-year, Green City, Clean Waters program, implemented in 2011 aims to transform expanses of impervious land to absorb rainfall or divert it into rain gardens or other local green infrastructure systems. These green stormwater infrastructures (GSI) aim to keep stormwater out of the sewage system to prevent overflow. This map depicts all GSI projects that have been constructed in Philadelphia thus far.",
    status: "Built",
    type1: "Open Space",
    type2: "Vacant Land",
    type3:"Parking",
    type4:"Facilities",
    type5:"Schools",
    type6:"Streets",
    type7:"Open Space,Streets",
    type8:"Parking,Streets,Vacant Land",
    type9:"Streets,Vacant Land",
    type10: "Facilities,Streets",
    picture: "gsi"
  }

  var page2={
    title: "Planned GSI",
    content: "Philadelphia gets about 42 inches of rain a year, according to the National Weather Service. But the past decade was the wettest on record, and in 2020 the city received 49 inches of rainfall. Typically, excess rainfall would spur the release of more than 13 billion gallons of sewage discharge into open waterways each year. Through the  Green City, Clean Waters program the City hopes to add 10,000 greened acres of GSI to help absorb excess rainwater. This map shows all planned GSI in the City that have yet to be completed.", 
    status: "Designed" ,
    status2: "Estimated",
    type1: "Open Space",
    type2: "Vacant Land",
    type3:"Parking",
    type4:"Facilities",
    type5:"Schools",
    type6:"Streets",
    type7:"Open Space,Streets",
    type8:"Parking,Streets,Vacant Land",
    type9:"Streets,Vacant Land",
    type10: "Facilities,Streets",
    filter: "future",
    picture: "gsi"
  }

var page3={
    title: "Open Space",
    content: "The next few slides detail the different kinds of GSI that Philadelphia has constructed and planned. Open space GSI, as this map depicts, are the most common type of project in Philadelphia. Open spaces, such as playgrounds and parks, can be used to collect and divert stormwater runoff through methods such as tree coverage and permeable pavement.", 
    status: "Built",
    status2: "Designed" ,
    status3: "Estimated",
    type1: "Open Space",
    picture: "gsi"

  }

var page4={
    title: "Vacant Land",
    content: "Already vacant land in the city can be a perfect location to place more GSI. This map shows all constructed and planned GSI occurring on vacant lots in the city. Several vacant lots in Philadelphia have already been transformed into rain gardens. Rain gardens are a form of GSI that are designed to trap and absorb rooftop, sidewalk, and street runoff. A typical rain garden is 30 percent more absorbent than a conventional lawn.", 
    status: "Built",
    status2: "Designed" ,
    status3: "Estimated",
    type1: "Vacant Land",
    picture:"gsi"
  }

var page5={
    title: "Green Streets",
    content: "This map shows all the built and planned green streets projects in Philadelphia. Green streets combine various GSI practices to more effectively manage stormwater. Instead of having water runoff directly into storm drains, green streets use permeable pavement, planter boxes, and other GSI to capture, absorb, and redirect rainfall where it lands.", 
    status: "Built",
    status2: "Designed" ,
    status3: "Estimated",
    type1: "Streets",
    picture: "gsi"
  }

  var page6={
    title: "Thanks for viewing!",
    content: "Thank you for taking the time to learn more about GSI in Philadlephia! The picture to the right shows the Schuylkill River polluted after a heavy rainfall. While the City still has a long ways to clean up its waterways, GSI is slowly helping Phildeaphia become a Green City with Clean Waters.", 
    status: "Built",
    status2: "Designed" ,
    status3: "Estimated",
    type1: "Streets",
    picture: "gsi"
  }



var slides = [
    page0,
    page1,
    page2,
    page3,
    page4,
    page5,
    page6
  ]

 var currentPage=0;
  
 //function to tear down page
  var tearDown= function(){
    markers.forEach(function(marker){map.removeLayer(marker)})
  }
  
//function to go to next page
  var nextPage = function() {
    tearDown()
    var nextPage =currentPage +1
    currentPage = nextPage
    buildPage(slides[nextPage])
  }

  //function to go to previous page
  var prevPage = function(){
    tearDown()
    var prevPage =currentPage -1
    currentPage = prevPage
    buildPage(slides[prevPage])
  }

  //function to build a new page
  var buildPage= function(slide){

    
   //filter data by type and status
      var Filtered = data.filter(function(datum){
    return datum.status === slide.status|| datum.status === slide.status2||datum.status === slide.status3})
      
    var Filtered2 = Filtered.filter(function(datum){
      return datum.type === slide.type1 || datum.type ===slide.type2||datum.type===slide.type3||datum.type==slide.type4||datum.type===slide.type5||datum.type===slide.type6||datum.type===slide.type7||datum.type===slide.type8||datum.type===slide.type9||datum.type===slide.type10})

    console.log(Filtered2)

    //create markers
    markers=Filtered2.map(function(gsi){
      return L.marker([gsi.Long,gsi.Lat]).bindPopup("Name: "+ gsi.name+ " "+ "<br>"+
      "Type: "+ gsi.type+ " " + "<br>"+
      "Status: " +gsi.status)
    })

  

    // if(pageDefinition.filter===undefined){
    //   theFilter = function() {return true}
    // } else {
    //   theFilter =pageDefinition.filter
    // }
    // featureGroup=L.geoJSON(mygeojsondata,{
    //   style: pageDefinition.style,
    //   filter:theFilter
    // })

    //map markers
    markers.forEach(function(marker){marker.addTo(map)})

    //hide title page
    if (currentPage !== 0){
      $( ".legend" ).hide()
    } 

    if (currentPage === 0){
      $( ".legend" ).show()
    } 

    if (currentPage !== slides.length -1){
      $( ".legend2" ).hide()
    } 

    if (currentPage ===slides.length -1){
      $( ".legend2" ).show()
    } 

    //hide map for title page
    if (currentPage !== 0 || currentPage !==slides.length -1){
      $( "#map" ).show()
    } 

    if (currentPage === 0|| currentPage ===slides.length -1){
      $( "#map" ).hide()
    } 
    console.log(currentPage, slides.length -1)

    //disable buttons 
    if (currentPage === 0){
      $('#prev').prop("disabled",true)
    } else {
      $("#prev").prop("disabled",false)
    }
    console.log(currentPage, slides.length -1)

    if (currentPage === slides.length-1){
      $("#next").prop("disabled",true)
    } else{
      $("#next").prop("disabled",false)
    }
    $("#title").text(slide.title)
    $("#content").text(slide.content)
  }

  

  // $.ajax('https://opendata.arcgis.com/datasets/3803641418e847a0bf7e28cd124f768e_0.geojson').done(function(json){
  // // Step 1, group feature values by property.
  //   var parsed= JSON.parse(JSON.stringify(json))
  //   console.log(parsed)
  //   const transition = Object.values(parsed);
  //   var data = transition[3];
  //   console.log(data)
  //   var GSI= JSON.parse(JSON.stringify(data))
  //   console.log(GSI)
  //   data= GSI.map(function(datum){
  //     datum.Lat=Number(datum.geometry.coordinates[0])
  //     datum.Long=Number(datum.geometry.coordinates[1])
  //     return datum
  //   })
  //   console.log(data)
    // markers=data.map(function(gsi){
    //   return L.marker([gsi.Long,gsi.Lat])
    // })
    // markers.forEach(function(marker){marker.addTo(map)})
    buildPage(slides[currentPage])
    $("#next").click(nextPage)
    $("#prev").click(prevPage)

  })


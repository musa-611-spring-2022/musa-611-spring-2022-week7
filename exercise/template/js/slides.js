var pointStyle = {
  "fillColor": "#007800",
  "color": "#006400",
  "weight": 3,
  "fillOpacity": 0.2
};

let districtColors = ['#FFF', '#42E2B8', '#D66BA0', '#A89B8C',
'#F0DFAD', '#8F5C38', '#177E89', '#084C61', '#DB3A34',
'#FFC857' , '#AC0C38']

let classificationStyle = {
  'WATERSHED_PARK': {'color': '#5D2A42', 'weight': 2},
  'REGIONAL_PARK': {'color': '#FB6376', 'weight': 3},
  'NEIGHBORHOOD_PARK': {'color': '#FCB1A6', 'weight': 4},
  'POCKET_PARK': {'color': '#0E6BA8', 'weight': 5}
}

function stylePropertiesByDistrict(feature, layer) {
  layer.setStyle({'color': districtColors[getDistrict(feature.properties.ppr_district)]});
  layer.bindPopup(feature.properties.public_name);
} 

function stylePropertiesByType(feature, layer) {
  layer.setStyle(classificationStyle[feature.properties.property_classification]);
  layer.bindPopup(feature.properties.public_name + " - " + feature.properties.property_classification);
} 

function stylePropertiesByEvents(feature, layer) {
  if (feature.properties.program_sites === 'Y') {
    layer.setStyle({'color': districtColors[getDistrict(feature.properties.ppr_district)]});
  } else {
    layer.setStyle({'color': '#CCC'});
  }
    layer.bindPopup(feature.properties.public_name + " - " + feature.properties.property_classification);
} 

function getDistrict(district) {
  if(Array.isArray(district)) {
    district = district[0];
  }
  return district;
}
/// 1. PHILADELPHIA PARKS AND REC DIVIDED INTO 10 DISTRICTS
/// 2. EACH DISTRICT CONTAINS FACILITIES
/// 3. FACILITIES HOLD EVENTS, LIKE THIS ONE FACILITY
/// 4. WHAT IF WE KNEW WHERE PEOPLE WERE COMING FROM?
/// 5. MIGHT THIS CHANGE HOW WE PROGRAM EVENTS?


const slides = [

  {
    title: "PPR Districts",
    content: `
      The Philadelphia Parks and Rec (PPR) department divides the city into ten different districts.
    `,
    "features":  L.geoJson(districts, {onEachFeature:
    function(feature, layer) {
      layer.setStyle({'color': districtColors[feature.properties.DISTRICTID]})
      layer.bindPopup("District #" + feature.properties.DISTRICTID);
    }
    })}
  ,
  {
    title: "All PPR Facilities",
    content: `
      There are hundreds of different facilities throughout the city, spread throughout the different districts.
    `,
    features: L.geoJson(properties, {onEachFeature: stylePropertiesByDistrict})
  },
  {
    title: "Facilities in District 8",
    content: `
      <p>Here are the facilities in District 8.</p>
      <p>Click on them to see their names. Can you find <b>Clark Park</b>?</p>
    `,
    features: L.geoJson(properties, {filter: function(feature) {
      if (getDistrict(feature.properties.ppr_district) == 8) return true;
    }, onEachFeature: stylePropertiesByDistrict})
  },
  {
    title: "Facility Classifications",
    content: `
      <p>There are different classifications of facilities, all four of them are present in District 8.</p>
      <p>Select each facility to see how it's classified.</p>
    `,
    features: L.geoJson(properties, {filter: function(feature) {
      if (getDistrict(feature.properties.ppr_district) == 8) return true;
    }, onEachFeature: stylePropertiesByType})
  },
  {
    title: "Pocket Parks",
    content: `
      <p>Did you notice the cute little pocket park down here at 60th and Baltimore?</p>
      <p><img src="data/pocketpark.png" style="width:100%;" /></p>
      <p>PPR maintains and keeps track of small parks like this in addition to larger regional parks and community centers.</p>
    `,
    features: L.geoJson(properties, {filter: function(feature) {
      if (getDistrict(feature.properties.public_name) == '60th and Baltimore Park') return true;
    }, onEachFeature: stylePropertiesByType})
  },
  {
    title: "Facility Events",
    content: `
      Some facilities can host events. The Parks & Recreation team has staff that is available to program and host different events at these facilities.
      <br /><br />
      There's a wide-variety of events – including athletic sports and educational activities. You can view
      a <a href="https://www.phila.gov/the-latest/all-events/?category=Philadelphia%20Parks%20%26%20Recreation" target="_blank">full calendar of events</a> hosted
      by the Philadelphia Parks and Rec.
      `,
    features: L.geoJson(properties, {filter: function(feature) {
      if (getDistrict(feature.properties.ppr_district) == 8) return true;
    }, onEachFeature: stylePropertiesByEvents})
  },
  {
    title: "Events @ Kingsessing Rec Center",
    content: `
      <p>Kingsessing Rec Center is a very popular facility for events in District 8.</p>
      <p><img src="data/kingsessingrec.png" style="width:100%;" /></p>
      <p>Parks and rec staff have come to us to better understand how they can improve events across all facilities.</p>

    `,
    features: L.geoJson(properties, {filter: function(feature) {
      if (getDistrict(feature.properties.public_name) == 'Kingsessing Recreation Center') return true;
    }, onEachFeature: stylePropertiesByEvents})
  },
  {
    title: "Programming events",
    content: `
      How should we make decisions about which events to program?
      <br /><br />
      This is the premise for our ongoing work with the Philadelphia Parks and Recreation.
      We believe that
      we can use cell phone data (from SafeGraph) to give us more insight into
      where visitors travel and how facilities should be
      programmed for events.
    `,
    features: L.geoJson(properties, { onEachFeature: stylePropertiesByEvents})
  },];
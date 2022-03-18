var pointStyle = {
  "fillColor": "#007800",
  "color": "#006400",
  "weight": 3,
  "fillOpacity": 0.2
};

let districtColors = ['#FFF', '#42E2B8', '#D66BA0', '#A89B8C',
'#F0DFAD', '#8F5C38', '#177E89', '#084C61', '#DB3A34',
'#FFC857' , '#AC0C38']

function stylePropertiesByDistrict(feature, layer) {
  layer.setStyle({'color': districtColors[getDistrict(feature.properties.ppr_district)]})
  layer.bindPopup(feature.properties.public_name);
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
    title: "PPR - Districts",
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
    title: "Each district contains facilities",
    content: `
      There are hundreds of different facilities throughout the city, all serving different purposes.
    `,
    features: L.geoJson(properties, {onEachFeature: stylePropertiesByDistrict})
  },
  {
    title: "Facilities in district 8",
    content: `
      Many facilities can host events, such as the events at this facility.
    `,
    features: L.geoJson(properties, {filter: function(feature) {
      if (getDistrict(feature.properties.ppr_district) == 8) return true;
    }, onEachFeature: stylePropertiesByDistrict})
  },
  {
    title: "Some facilities can hold events",
    content: `
      Many facilities can host events, such as the events at this facility.
    `,
    features: L.geoJson(properties)
  },
  {
    title: "How should we make decisions about which events to program?",
    content: `
      This is the premise for our work with the Philadelphia Parks and Recreation. We believe that
      using location data from SafeGraph can give us more insight into
      where visitors travel and how facilities should be
      programmed for events.
    `,
    features: L.geoJson(properties)
  },];
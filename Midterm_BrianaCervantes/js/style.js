
    


/* Map color Functions*/
function getColor(d) {
  return d > 99 ? '#f0f921' :
    d > 89  ? '#fcce25' :
    d > 79  ? '#fca636' :
    d > 69  ? '#f2844b' :
    d > 59   ? '#e16462' :
    d > 49   ? '#cc4778' :
    d > 39   ? '#b12a90' :
    d > 29   ? '#8f0da4' :
    d > 19   ? '#6a00a8' :
    d > 9   ? '#41049d' :
                '#0d0887';
  }

/* Legend Function */


function getLegendTitle () {
  let titlehere = LegendTitle;
  return titlehere
}  
var legend = L.control({position: 'bottomleft'});
    legend.onAdd = function (map) {

    
    var div = L.DomUtil.create('div', 'info-legend');
    labels = ['<h4 style=" color:#FFFFFF; margin-bottom:10px; margin-top:0; padding: 1rem; border: 0.2rem solid #1F1F1F; background: #1F1F1F;">Percent of Renters<br>Spending 50% or More of<br>Their Income on Rent </h4>'],
    catlables = ['100%','90 - 99%','80 - 89%','70 - 79%','60 - 69%', '50 - 59%', '40 - 49%', '30 - 39%', '20 - 29%', '10 - 19%', '1 - 9%', '0'];
    categories = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 1, 0]
    for (var i = 0; i < categories.length; i++) {

            div.innerHTML += 
            labels.push(
              '<div style=" padding-bottom:0.5rem;padding-left: 25%; display: flex; flex-direction:row;">'+
              '<i class="circle" style=" color: white;background-color:' + getColor(categories[i]) + '"></i> ' +
              '<i style="padding-left:0.5rem; color: #1F1F1F; font-weight: 700;">'+
            (catlables[i] ? catlables[i] : '') +
            '</i>'+
            '</div>'
            );

        }
        div.innerHTML = labels.join('<br>');
    return div;
    };


var legend2 = L.control({position: 'bottomleft'});
legend2.onAdd = function (map) {

    
    var div = L.DomUtil.create('div', 'info-legend');
    labels = ['<h4 style=" color:#FFFFFF; margin-bottom:10px; margin-top:0; padding: 1rem; border: 0.2rem solid #1F1F1F; background: #1F1F1F;">Percent of Homeowners<br>Spending 50% or More of<br>Their Income on Rent </h4>'],
    catlables = ['100%','90 - 99%','80 - 89%','70 - 79%','60 - 69%', '50 - 59%', '40 - 49%', '30 - 39%', '20 - 29%', '10 - 19%', '1 - 9%', '0'];
    categories = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 1, 0]
    for (var i = 0; i < categories.length; i++) {

            div.innerHTML += 
            labels.push(
              '<div style=" padding-bottom:0.5rem;padding-left: 25%; display: flex; flex-direction:row;">'+
              '<i class="circle" style=" color: white;background-color:' + getColor(categories[i]) + '"></i> ' +
              '<i style="padding-left:0.5rem; color: #1F1F1F; font-weight: 700;">'+
            (catlables[i] ? catlables[i] : '') +
            '</i>'+
            '</div>'
            );

        }
        div.innerHTML = labels.join('<br>');
    return div;
    };



/* DEMO */  
function styleDemo(feature) {
  return {
      fillColor: getColor(feature.properties.NonWhite_P),
      weight: 0.5,
      opacity: 0.7,
      color: 'white',
      fillOpacity: 0.5
  };
}

function onEachFeatureDemo(feature, layer){
  //use feature.properties to construct popup html
  var popupContentDemo = `<p> Percent Non-White Population: ${Math.round(feature.properties.NonWhite_P)}% <br> Number of Nearby Cameras: ${feature.properties.Camera_Count} </p>`;

  layer.bindPopup(popupContentDemo);
  };

/* RENT */  
function styleRent(feature) {
  return {
      fillColor: getColor(feature.properties.P50_moreP),
      weight: 0.5,
      opacity: 0.7,
      color: 'white',
      fillOpacity: 0.5
  };
}

function onEachFeatureRent(feature, layer){
  //use feature.properties to construct popup html
  var popupContentRent = `<p> Percent Renters Spending Half or More of Their Income on Rent: ${Math.round(feature.properties.P50_moreP)}% <br> Number of Nearby Cameras: ${feature.properties.Camera_Count} </p>`;

  layer.bindPopup(popupContentRent);

  map.removeControl(legend2);
  legend.addTo(map);
  };

/* MORT  */  
function styleMort(feature) {
  return {
      fillColor: getColor(feature.properties.P_mort_50_P),
      weight: 0.5,
      opacity: 0.7,
      color: 'white',
      fillOpacity: 0.5
  };
}

function onEachFeatureMort(feature, layer){
  //use feature.properties to construct popup html
  var popupContentMort = `<p> Percent Homeowners Spending Half or More of Their Income on Housing Costs: ${Math.round(feature.properties.P_mort_50_P)}% <br> Number of Nearby Cameras: ${feature.properties.Camera_Count} </p>`;

  layer.bindPopup(popupContentMort);

  map.removeControl(legend);
  legend2.addTo(map);
  };  


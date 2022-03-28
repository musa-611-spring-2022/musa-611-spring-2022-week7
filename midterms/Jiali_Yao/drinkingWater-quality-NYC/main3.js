var map = L.map('map').setView([40.64984817902754, -73.9580525475725], 11);
const timeLayer = L.layerGroup().addTo(map);

var geojsonMarkerOptions = {
    radius: 4,
    fillColor: "#89CFEF",
    color: "#000",
    weight: 0.5,
    opacity: 1,
    fillOpacity: 1
};
let districtStyle = {
  weight: 1,
  color: "#FA8072",
  fillOpacity: 0
}

L.tileLayer('https://api.mapbox.com/styles/v1/yaoyun/cl0r2ny3l000m14jsfu46ldim/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoieWFveXVuIiwiYSI6ImNqb25zMXRldDExb2Uzdm10dWxrNjg4c3EifQ.6ap1T463dqPFnH0MGiVXDQ', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var brooklynSites = quality.filter(function (el) {
  return el.properties.District == "Brooklyn"
});

var brooklynBoundary = BoroughBoundaries.filter(function (el) {
  return el.properties.boro_name == "Brooklyn"
});

const chartSelect = document.getElementById('myChart');
const chartSelect2 = document.getElementById('myChart2');
const chartSelect3 = document.getElementById('myChart3');
const dateSelect = document.querySelector('#year-select');
const siteSelect = document.querySelector('#site-select');

let updatesiteMarkers = (sitesToShow) => {
  timeLayer.clearLayers();
  sitesToShow.forEach((SampleSite) => {
    const marker = L.geoJson(SampleSite, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
      }
    })
    .bindPopup(`<br><b>Sample ID</b>: ${SampleSite.properties['Sample.Site']}</br>
                <br><b>Sample class</b>: ${SampleSite.properties['Sample.class']}</br>
                <br><b>Sample Location</b>: ${SampleSite.properties['Sample.Station..SS....Location.Description']}</br>
                <br><b>The number of E coli(Quanti.Tray)</b>: ${SampleSite.properties['E.coli.Quanti.Tray...MPN.100mL.']} in 100mL sample</br>`
  );
    timeLayer.addLayer(marker);
  });
};


let updatechart = (sitesToShow) => {
  let xValue = [];
  let yValue = [];
  let y2Value = [];
  let y3Value = [];
  sitesToShow.forEach(site => {
    let time = site.properties['Sample.Date'];
    let data1 = site.properties['Residual.Free.Chlorine..mg.L.'];
    let data2 = site.properties['Turbidity..NTU.'];
    let data3 = site.properties['Coliform..Quanti.Tray...MPN..100mL.'];
    xValue.push(time);
    yValue.push(data1);
    y2Value.push(data2);
    y3Value.push(data3); // push to the zipArr
  });

  var myChart = new Chart(chartSelect, {
    type: "line",
    data: {
      labels: xValue,
      datasets: [{
        label: 'mg/L',
        backgroundColor: "rgba(0,0,0,1.0)",
        borderColor: "#F9612A",
        data: yValue,
      }]
    }
  });
  myChart.update();

  var myChart2 = new Chart(chartSelect2, {
    type: "line",
    data: {
      labels: xValue,
      datasets: [{
        label: 'NTU',
        backgroundColor: "rgba(0,0,0,1.0)",
        borderColor: "#F9612A",
        data: y2Value,
      }]
    }
  });
  myChart2.update();

  var myChart3 = new Chart(chartSelect3, {
    type: "line",
    data: {
      labels: xValue,
      datasets: [{
        label: 'MPN..100mL',
        backgroundColor: "rgba(0,0,0,1.0)",
        borderColor: "#F9612A",
        data: y3Value,
      }]
    }
  });
  myChart3.update();
};


let initializeSiteChoices = () => {
  let siteArr = [];
  brooklynSites.forEach(site => {
    let name = site.properties['Sample.Site'];// extract the first 5 digits of the zip codes
    siteArr.push(name); // push to the zipArr
  });
  let uniqueSite = [...new Set(siteArr)];

  uniqueSite.sort();
  //let zipall = document.getElementById('zip-code-select');
  uniqueSite.forEach(name => {
    siteSelect.appendChild(htmlToElement(`<option>${name}</option>`));
  });
};


let filteredSites = () => {
  let dateVal = dateSelect.value;
  let siteVal = siteSelect.value;
  if (dateVal === '' && siteVal === '') {
    return brooklynSites;
  }
  if (dateVal !== '' && siteVal === '') {
    return brooklynSites.filter(site => site.properties['Sample.Date'].slice(0, 4) === dateVal);
  }
  if (dateVal === '' && siteVal !== '') {
    return brooklynSites.filter(site => site.properties['Sample.Site'] === siteVal);
  }
  return brooklynSites.filter(site => site.properties['Sample.Date'].slice(0, 4) === dateVal && site.properties['Sample.Site'] === siteVal);
};


let handleSelectChange = () => {
  const sitesToShow = filteredSites() || [];
  updatesiteMarkers(sitesToShow);
  updatechart(sitesToShow);
};

siteSelect.addEventListener('change', handleSelectChange);
dateSelect.addEventListener('change', handleSelectChange);

L.geoJson(brooklynBoundary, { style: districtStyle }).addTo(map);
initializeSiteChoices();
updatesiteMarkers(brooklynSites);
updatechart(brooklynSites)

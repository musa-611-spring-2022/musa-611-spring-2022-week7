/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable quote-props */
const countryColors = {
  'Poland': '#d53e4f',
  'Byelarus': '#bae4bc',
  'Belarus': '#bae4bc',
  'Russian Empire': '#fee08b',
  'Russia': '#fee08b',
  'USSR': '#fee08b',
  'White Russia': '#bae4bc',
  'Polish–Lithuanian Commonwealth': '#d53e4f',


};


const slides = [
  {
    title: '<strong>Exploring Changing Boundaries: Are We Polish?</strong><hr>',
    content: `<p>Project by Jenna Epstein, dedicated to my maternal lineage</p>
    <p>I always thought that my great-grandmother Jeanette was from Poland - but this is both correct and incorrect. This story map visualizes her home village of <strong>Horodetz</strong> amidst the changing boundaries of Poland from 1715 through 1994.</p>
    <p><img src="js/images/jeanette.jpg" height="200"></p>
    <p>Click the buttons below to scroll through the story. Click on the colored countries to see their names at each period of time. The background map provides context on the shifting geography relative to today's borders.</p>
    <p><em><small>Historic country boundaries courtesy of <a href="https://github.com/aourednik" target="_blank">https://github.com/aourednik</a></small></em></p>`,
    bounds: [[10.546875, 48.253941, 36.298828, 57.774518]],
  },
  {
    title: '1715',
    content: '<p>The Polish-Lithuanian Commonwealth was a country and bi-federation of Poland and Lithuania ruled by a common monarch. It was one of the largest and most populous countries in Europe in the 16th and 17th centuries.</p>',
    bounds: [[10.546875, 48.253941, 36.298828, 57.774518]],
    features: L.geoJSON(countries, {
      filter: (feature) => feature.properties.YEAR === '1715',
      onEachFeature(feature, layer) {
        layer.setStyle({ fillColor: countryColors[feature.properties.NAME], color: '#787878', fillOpacity: 0.4 });
        layer.bindPopup(`<h4><strong>${feature.properties.NAME}</strong></h4>`);
      },
    }),
  },
  {
    title: '1783',
    content: `<p>The beginning of the end for the Commonwealth came in 1772, with the first of three partitions that carved up Polish lands among the Russian, Prussian, and Austrian Empires.</p>
    <p>During the first two partitions between 1783 and 1793, Poland remained in part as its own country - as shown here on the map.</p>`,
    bounds: [[10.546875, 48.253941, 36.298828, 57.774518]],
    features: L.geoJSON(countries, {
      filter: (feature) => feature.properties.YEAR === '1783',
      onEachFeature(feature, layer) {
        layer.setStyle({ fillColor: countryColors[feature.properties.NAME], color: '#787878', fillOpacity: 0.4 });
        layer.bindPopup(`<h4><strong>${feature.properties.NAME}</strong></h4>`);
      },
    }),
  },
  {
    title: '1793-1914',
    content: `<p>From the third partition all the way until the early 1900s, the town of Horodetz was now within the boundaries of the expansive Russian Empire.</p>
    <p>The named country of Poland disappeared from the international map, but it was not without resistence. Many Horodetz Jews sided with Poland during the Polish "povstanya" (rebellions).</p>
    <p>Economically and culturally Jews in the Horodetz shtetl during this time were living mostly as store-keepers, craftsmen, and clergy. The area became an important center for commercial activity due its proximity to a canal.</p>
    <p>However, the Russian regime also took note of its strategic location. The regime made Horodetz a military stronghold, stationing soldiers in the area starting in 1876.`,
    bounds: [[10.546875, 48.253941, 36.298828, 57.774518]],
    features: L.geoJSON(countries, {
      filter: (feature) => feature.properties.YEAR === '1880',
      onEachFeature(feature, layer) {
        layer.setStyle({ fillColor: countryColors[feature.properties.NAME], color: '#787878', fillOpacity: 0.4 });
        layer.bindPopup(`<h4><strong>${feature.properties.NAME}</strong></h4>`);
      },
    }),
  },
  {
    title: '1914',
    content: `<p>1914 marked the beginning of World War I. It was also the period of time when my great-grandmother was a little girl in Horodetz.</p>
    <p>The Russian Empire's boundaries were expanding north and south - the Polish areas remained unchanged.</p>
    <p>At this time, the war brought about a violent upheaval, destroying the old way of living. Since the shtetl was located strategically next to two tall riverbanks, it became battlefield between the Russians and the Germans. The shtetl was almost totally demolished: Jewish houses were burnt down, especially those in the center of town.`,
    bounds: [[10.546875, 48.253941, 36.298828, 57.774518]],
    features: L.geoJSON(countries, {
      filter: (feature) => feature.properties.YEAR === '1914',
      onEachFeature(feature, layer) {
        layer.setStyle({ fillColor: countryColors[feature.properties.NAME], color: '#787878', fillOpacity: 0.4 });
        layer.bindPopup(`<h4><strong>${feature.properties.NAME}</strong></h4>`);
      },
    }),
  },
  {
    title: '1920',
    content: `<p>By the end of World War I, Poland regained its independence as its own country. The borders included parts of what are now Ukraine, and Belarus."</p>
     <p> At this time, the country known at the time of "White Russia" - know Belarus - was carved out between Poland and Russia.</p> 
     <p>Just as Poland became known on the international stage as its own nation again, however, living conditions deteriorated for Jews in the Horodetz shtetl.
    My grandmother immigrated from Horodetz (via Antwerp, Belgium) to the United States in 1921.</p>
     <p><img src="js/images/manifest.jpg" height="300"></p>`,
    bounds: [[10.546875, 48.253941, 36.298828, 57.774518]],
    features: L.geoJSON(countries, {
      filter: (feature) => feature.properties.YEAR === '1920',
      onEachFeature(feature, layer) {
        layer.setStyle({ fillColor: countryColors[feature.properties.NAME], color: '#787878', fillOpacity: 0.4 });
        layer.bindPopup(`<h4><strong>${feature.properties.NAME}</strong></h4>`);
      },
    }),
  },
  {
    title: '1938',
    content: `<p>Before World War II, Poland's borders shifted again - this time a bit to the north to include part of what is present-day Lithuania.</p>
    <p>While they did not meet until they were both in America, Jeanette's future husband (my great-grandfather) is from Vilna (now Vilnius, Lithuania) that sat within these Polish borders for a few years.</p>`,
    bounds: [[10.546875, 48.253941, 36.298828, 57.774518]],
    features: L.geoJSON(countries, {
      filter: (feature) => feature.properties.YEAR === '1938',
      onEachFeature(feature, layer) {
        layer.setStyle({ fillColor: countryColors[feature.properties.NAME], color: '#787878', fillOpacity: 0.4 });
        layer.bindPopup(`<h4><strong>${feature.properties.NAME}</strong></h4>`);
      },
    }),
  },
  {
    title: '1945',
    content: `<p>The end of World War II saw parts of eastern Poland fall under the newly-formed USSR - including Horodetz and other eastern areas</p>
    <p>So while Horodetz was briefly again part of a "Poland", it changed its geopolitical status once again as it was absorbed by the USSR.</p>`,
    bounds: [[10.546875, 48.253941, 36.298828, 57.774518]],
    features: L.geoJSON(countries, {
      filter: (feature) => feature.properties.YEAR === '1945',
      onEachFeature(feature, layer) {
        layer.setStyle({ fillColor: countryColors[feature.properties.NAME], color: '#787878', fillOpacity: 0.4 });
        layer.bindPopup(`<h4><strong>${feature.properties.NAME}</strong></h4>`);
      },
    }),
  },
  {
    title: '1994',
    content: `<p>After the Cold War and the dissolution of the USSR, Belarus gained independence and saw more expansive borders than it did when it was White Russia. Horodetz (spelled "Gorodets" now on European maps), found itself in Belarus.</p>
    <p>To this day, there are not many remnants of the vibrant Jewish community that once thrived in Horodetz.</p>
    <p>My mom and I had been planning to visit what does remain, but unfotuantely as American Jewish women, visitng present-day Belarus - not to mention also during the Ukraine-Russia crisis - is unwise.</p>`,
    bounds: [[10.546875, 48.253941, 36.298828, 57.774518]],
    features: L.geoJSON(countries, {
      filter: (feature) => feature.properties.YEAR === '1994',
      onEachFeature(feature, layer) {
        layer.setStyle({ fillColor: countryColors[feature.properties.NAME], color: '#787878', fillOpacity: 0.4 });
        layer.bindPopup(`<h4><strong>${feature.properties.NAME}</strong></h4>`);
      },
    }),
  },
];


let eachFeatureFunction = function (layer) {
  layer.bindPopup(
    `NAME: ${layer.feature.properties.NAME}`,
  );
  layer.on('click', (event) => {
    console.log(layer.feature);
  });
};

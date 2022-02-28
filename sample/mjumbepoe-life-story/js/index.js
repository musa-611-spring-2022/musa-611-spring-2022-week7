let map = L.map('map').setView([0, 0], 0);
let layerGroup = L.layerGroup().addTo(map);
let lifeCollection = {features: []};

L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
}).addTo(map);

/* ==========

## Step 1: Slide Content

Think about how to represent your slides. What information do you want to show
for each slide?
- Probably a title and some descriptive text.
- Should the text be related to the map data?
- Do you want to show any images?

What do you want the map or the data on the map to do when you go to a different
slide?
- Should it pan and zoom to specific features?
- Should it highlight or show a popup on any features?
- Should the features shown be filtered?

## Step 2: App Behavior

Think about what you want/need your application to do. It's often helpful to
frame these app behaviors in a "When... then..." format. For example:
- When I click the "⧏" button, then the app should show the slide before the
  current one.
- When I click the "⧐" button, then the app should show the slide after the
  current one.
- When the page loads, then the app should show the first slide.

These behavior descriptions can help you determine what functions you need to
write. For example, the behaviors above imply that you should have functions to
handle the next/previous button clicks, and a function to show a given slide.

## Step 3: Function Signatures



========== */

let currentSlideIndex = 0;
const slides = [
  {
    title: "Mjumbe's Personal Journey",
    content: `
      Here we present a snapshot of Mjumbe Poe's life told geospatially.
    `,
    era: null,
    bounds: [[-75, -180], [75, 180]]
  },
  {
    title: "Early Days",
    content: `
      Mjumbe was born in San Jose, California. He lived with his family first in
      **San Jose**, then **Santa Cruz**, briefly in **Oceanside**, and finally
      in **Riverside**.
    `,
    era: 'early life',
    showpopups: true,
  },
  {
    title: "Move to Philadelphia",
    content: `
      When Mjumbe was 11, his family moved across the country to Philadelphia.
      They lived in what would later be knows as the **Cedar Park**
      neighborhood, and Mjumbe attended **J.R. Masterman** for middle and high
      school.
    `,
    era: 'formative',
    showpopups: true,
  },
  {
    title: "College",
    content: `
      Mjumbe went back to California for college. He graduated with a computer
      science degree from **Harvey Mudd College** in **Claremont, California**.
      After college, Mjumbe moved back to the Cedar Park neighborhood and worked
      for a few years at the University of Pennsylvania, making tools for
      modeling and simulation in the social sciences.
    `,
    era: 'college',
    showpopups: true,
  },
  {
    title: "Code for America",
    content: `
      Mjumbe was a Code for America fellow in 2011, living and working primarily
      from **Oakland, CA**. He worked on projects with the cities of Philadelphia
      and Seattle.
    `,
    era: 'cfa',
    showpopups: true,
  },
  {
    title: "OpenPlans",
    content: `
      After Code for America, Mjumbe went to work for OpenPlans, a NYC-based
      non-profit making tools to help citizens get involved in the urban
      planning process. He would usually work remotely from **Independents Hall**,
      making occasional trips to the NYC office from his home in **Yorktown** via
      the **Temple University train station**.
    `,
    era: 'openplans',
    showpopups: true,
  },
  {
    title: "City of Philadelphia",
    content: `
      Mjumbe then went to work for the **City of Philadelphia** in the Office of
      Open Data and Digital Transformation. During this period he lived near
      Temple University in the **Hartranft** neighborhood.
    `,
    era: 'city of phila',
    showpopups: true,
  },
  {
    title: "Stepwise",
    content: `
      Mjumbe left the city of Philadelphia to work on a startup called Stepwise
      with a former coworker and friend. They made tools to help investors get
      a fuller picture of potential investment properties. They would often work
      out of the **First Round Capital** offices. For a time Mjumbe lived in the
      **Woodland Terrace** neighborhood, and later in an apartment overlooking
      **Malcolm X Park**.
    `,
    era: 'stepwise',
    showpopups: true,
  },
  {
    title: "International Conference on Appropriate Technology",
    content: `
      Mjumbe has been involved with the planning of the International Conference
      on Appropriate Technology since 2012. This conference has taken him to
      locations around Africa.
    `,
    era: 'inat',
    showpopups: true,
  },
  {
    title: "Travels",
    content: `
      Additionally, Mjumbe has been lucky to spend time in several places around
      the world.
    `,
    era: 'travels',
    showpopups: true,
  },
  {
    title: "Present Day",
    content: `
      Mjumbe currently lives in **East Passyunk**. Thanks for taking this journey!
    `,
    era: 'present day',
  },
];

const slideTitleDiv = document.querySelector('.slide-title');
const slideContentDiv = document.querySelector('.slide-content');
const slidePrevButton = document.querySelector('#prev-slide');
const slideNextButton = document.querySelector('#next-slide');
const slideJumpSelect = document.querySelector('#jump-to-slide');

function updateMap(collection, showpopups=false) {
  layerGroup.clearLayers();
  const geoJsonLayer = L.geoJSON(collection, {pointToLayer: (p, latlng) => L.marker(latlng) })
    .bindTooltip(l => l.feature.properties.label)
    .addTo(layerGroup);

  return geoJsonLayer;
}

function makeEraCollection(era) {
  return {
    'type': 'FeatureCollection',
    'features': lifeCollection.features.filter(f => f.properties.era === era)
  };
}

function showSlide(slide) {
  const converter = new showdown.Converter({smartIndentationFix: true});

  slideTitleDiv.innerHTML = `<h2>${slide.title}</h2>`;
  slideContentDiv.innerHTML = converter.makeHtml(slide.content);

  const collection = slide.era ? makeEraCollection(slide.era) : lifeCollection;
  const layer = updateMap(collection, slide.showpopups || false);

  function handleFlyEnd() {
    if (slide.showpopups) {
      layer.eachLayer(l => {
        l.bindTooltip(l.feature.properties.label, {permanent: true});
        l.openTooltip();
      });
    }
    map.removeEventListener('moveend', handleFlyEnd);
  }

  map.addEventListener('moveend', handleFlyEnd);
  if (slide.bounds) {
    map.flyToBounds(slide.bounds);
  } else if (slide.era) {
    map.flyToBounds(layer.getBounds());
  }
}

function showCurrentSlide() {
  const slide = slides[currentSlideIndex];
  showSlide(slide);
}

function goNextSlide() {
  currentSlideIndex++;

  if (currentSlideIndex == slides.length) {
    currentSlideIndex = 0;
  }

  showCurrentSlide();
}

function goPrevSlide() {
  currentSlideIndex--;

  if (currentSlideIndex < 0) {
    currentSlideIndex = slides.length - 1;
  }

  showCurrentSlide();
}

function jumpToSlide() {
  currentSlideIndex = slideJumpSelect.value;
  showCurrentSlide();
}

function initSlideSelect() {
  slideJumpSelect.innerHTML = '';
  for (const [index, slide] of slides.entries()) {
    const option = document.createElement('option');
    option.value = index;
    option.innerHTML = slide.title;
    slideJumpSelect.appendChild(option);
  }
}

function loadLifeData() {
  fetch('data/journey.json')
    .then(resp => resp.json())
    .then(data => {
      lifeCollection = data;
      showCurrentSlide();
    });
}

slidePrevButton.addEventListener('click', goPrevSlide);
slideNextButton.addEventListener('click', goNextSlide);
slideJumpSelect.addEventListener('click', jumpToSlide);

initSlideSelect();
showCurrentSlide();
loadLifeData();

/* globals showdown */

let map = L.map('map').setView([39.9392, -75.1996], 12.15);
let layerGroup = L.layerGroup().addTo(map);
let fairmountData = { features: [] };

const slides = [
  {
    title: 'OVERVIEW',
    content: `To better understand how the Fairmount neighborhood has changed, researchers interviewed residents about their experiences. From these interviews, researchers identified three main trends:<br>
		<ol>
		<li>Rising Prices</li>
		<li>Social Media and Changing Social Relations</li>
		<li>Changing Neighborhood Ties</li>
		</ol>
		The following storymap reflects the lived experiences of Fairmount residents and their perception of neighborhood change over their tenure.
		<br>
		 <p style= "font-size: 10px; text-align: center;"> Names have been changed and addresses are approximate for privacy reasons.</p>
		`,
    name: 0,
    bounds: [[39.976853872261145, -75.19057171980975], [39.96300888584773, -75.16243194414206]],
  },

  {
    title: "LOUISE AND JILL",
    content: 'We visited Louise\' home on Parrish St. for a conversation about how she remembers the neighborhood growing up. She was joined by her friend Jill. Louise and Jill are in their late 60s and Louise still lives in the two story row home her father was able to purchase with the G.I. Bill in the 40s. The two friends have lived in the neighborhood their whole lives and have never lived elsewhere. <br><br><br> Louise and Jill reflect on how the social dynamic of the neighborhood has changed since they were children. Louise said \'everyone sat out on their steps because they didn\'t have air conditioning. [There were] more eyes on the street and familiarity with each other.\' <br> <br> <br> The friends also speak about the disinvestment of the Girard Avenue commercial corridor. They recall that when they were children, they rarely had to go into \'town\' or Center City. Everything they needed could be found in a local busines on Girard Avenue, or a corner store on Parrish. Today, many of these businesses are closed and everyday goods are not as accessible or affordable.',
    name: 1,
    showpopups: true,
    bounds: [[39.974153045018326, -75.1864914514035], [39.969888197966625, -75.17858576029263]],
  },

  {
    title: "EMMA",
    content: 'We met with Emma over the phone to hear about her experience moving to and living in Fairmount. Emma moved to Croskey St by the Eastern State Penitentiary in the 1990\'s. She has raised two children who both went to the Bache-Martin School and have become successful musicians, and she works from home as a creative writer. <br> <br> <br> Emma mentions how aware she and her husband are about news and neighborhood updates by way of social media, but lack personal connection with their neighbors. She describes herself "as a bit of a hippie" and she doesn\'t feel like her neighbors are on the same page. <br><br><br> Emma tells us "you wouldn\'t believe how much we bought our house for back then" and that she wouldn\'t be able to afford moving to the neighborhood today. She says she moved to the neighborhood because of its charm and accessibility and feels lucky she bought a house when she did.',
    name: 2,
    showpopups: true,
    bounds: [[39.97022714408344, -75.17819366771351], [39.96730132587469, -75.17173304854184]],
  },

  {
    title: "DREW",
    content: ' Drew grew up in North Philadelphia in West Mount Airy, and moved to Fairmount in the 90s after graduating from Temple University. We met with Drew in a coffee shop and he told us how much he loves the accessibility in Fairmount. Drew is unable to drive and he really appreciates the bus routes that pass through Fairmount allowing him to get virtually anywhere in the city. <br> <br> <br> Drew told us about how connected he is with his neighbors on social media using websites like Facebook and the NextDoor App to check events and things like crime. He says he has a hard time guaging if crime is increasing or not because he believes being connected on social media apps makes him more aware of crime happening in the neighborhood than he would be otherwise. Because of this, he does not know if crime has truly increased or just his awareness.',
    name: 3,
    showpopups: true,
    bounds: [[39.966591869433614, -75.17529532665868], [39.96406712354596, -75.17029026201097]],
  },

  {
    title: 'MARISSA',
    content: 'Marissa owns and operates a small business on Fairmount Avenue with her partner. She lived in Fairmount for more than 40 years before recently moving to the Center City neighborhood. <br><br><br> Marissa, whose small business opened in the 1990s, has seen an increase in people going into her store to make purchases because they were walking along the commercial corridor visiting other establishments. She also mentioned Fairmount has become less "neighborly" with the presence of more "professionals." Along with the rise of young professionals is a decline in families with children. <br><br><br> Fairmount business owners continue to have ties to one another and the neighborhood long-term, according to Marissa who stated that she knew all of the other business owners on the commercial corridor. Business owners communicate regularly, though she noted that some business owners communicate more than others. Her business has operated in Fairmount for more than 30 years and will continue to do so.',
    name: 4,
    showpopups: true,
    bounds: [[39.96828630813448, -75.17913981348255], [39.966407482905375, -75.17258981812861]],
  },

  {
    title: "BRIANNA",
    content: `Brianna is the only interviewee not from Philadelphia originally. She identifies as one of the yung, transient resident's of Fairmount. Brianna moved to Fairmount in 2018 from Rhode Island, fresh out of undergrad in search of a job. Like many of the newcoming Fairmount residents, her knowledge of Fairmount's history was limited. Since 2018, she has held multiple jobs in local neighborhood businesses and has since gone back to school for a Masters Degree.<br><br><br>Brianna's main motive for moving to Fairmount was the beautiful apartment she found for an affordable price, however she was attracted to the neighborhood because of its location and the overall charm. "Fairmount is so close to Center City, but I still have all of the amenities I would need, here in the neighborhood." She doesn't anticipate staying forever and is unclear of her future plans, but is so happy to be living where she does now.`,
    name: 5,
    showpopups: true,
    bounds: [[39.97033142899603, -75.17871846876652], [39.96755239818959, -75.17423689298894]],
  },

  {
    title: 'CONCLUSION',
    content: `
		Overall, interviewees tended to have a positive view of the increase in higher-income, more formally educated people in Fairmount, as well as the increasing prices of housing and amenities. However, long-term residents and interviewees who struggled financially were more likely to express concerns about the changes and the ability of themselves and their families to remain in Fairmount as it continues to change.<br><br><br> The findings of neighborhood change align with housing and demographic trends in the Fairmount quantitative analysis. Notably, major trends of rising housing costs and increasing levels of education were seen in the quantitative analysis and frequently discussed by interviewees.
    `,
    name: 6,
    showpopups: false,
    bounds: [[39.976853872261145, -75.19057171980975], [39.96300888584773, -75.16243194414206]],
  },
];


let myIcon = L.icon({
  iconUrl: 'graphics/circle_icon.png',
  iconSize: [150, 150],
	className: 'myIcon',
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 20,
}).addTo(map);

let currentSlideIndex = 0;

const slidesDiv = document.querySelector('.slides');

function updateMap(collection) {
  layerGroup.clearLayers();
  const geoJsonLayer = L.geoJSON(collection, {
    style: {
      fillColor: 'transparent',
      color: '#836a5e',
    },
    pointToLayer: (p, latlng) => L.marker(latlng, { icon: myIcon }),
  }).addTo(layerGroup);
  return geoJsonLayer;
}

function makeNameCollection(name) {
  return {
    type: 'FeatureCollection',
    features: fairmountData.features.filter(f => f.properties.name === name),
  };
}

function syncMapToSlide(slide) {
  const collection = slide.name ? makeNameCollection(slide.name) : fairmountData;
  const layer = updateMap(collection);

  function handleFlyEnd() {
    map.removeEventListener('moveend', handleFlyEnd);
  }

  map.addEventListener('moveend', handleFlyEnd);
  if (slide.bounds) {
    map.flyToBounds(slide.bounds);
  } else if (slide.name) {
    map.flyToBounds(layer.getBounds());
  }
}

// attach map to slide content
function syncMapToCurrentSlide() {
  const slide = slides[currentSlideIndex];
  syncMapToSlide(slide);
}

function initSlides() {
  const converter = new showdown.Converter({ smartIndentationFix: true });

  slidesDiv.innerHTML = '';
  for (const [index, slide] of slides.entries()) {
    const slideDiv = htmlToElement(`<div class="slide" id="slide-${index}"><h3>${slide.title}</h3><p class= "slide-content">${converter.makeHtml(slide.content)}</p></div>`);
    slidesDiv.appendChild(slideDiv);
  }
}

function loadData() {
  fetch('data/fairmount.json')
    .then(resp => resp.json())
    .then(data => {
      fairmountData = data;
      syncMapToCurrentSlide();
    });
}

function calcCurrentSlideIndex() {
  const scrollPos = window.scrollY - 722;
  const windowHeight = window.innerHeight - 722;
  const slideDivs = document.getElementsByClassName('slide');

  let i;
  for (i = 0; i < slideDivs.length; i++) {
    const slidePos = slideDivs[i].offsetTop;
    if (slidePos - scrollPos - windowHeight > 0) {
      break;
    }
  }

  if (i === 0) {
    currentSlideIndex = 0;
  } else if (currentSlideIndex !== i - 1) {
    currentSlideIndex = i - 1;
    syncMapToCurrentSlide();
  }
}
document.addEventListener('scroll', calcCurrentSlideIndex);

initSlides();
syncMapToCurrentSlide();
loadData();

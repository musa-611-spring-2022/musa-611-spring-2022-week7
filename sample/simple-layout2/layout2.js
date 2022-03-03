let map = L.map('map').setView([30, -90], 12);

L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
}).addTo(map);

document.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + window.innerHeight;
  const slides = document.getElementsByClassName('slide');

  console.log(`The current scroll position is ${scrollPos}`);

  let i;
  for (i = 0; i < slides.length; i++) {
    const slide = slides[i];
    if (slide.offsetTop > scrollPos) {
      break;
    }
  }

  console.log(`The current slide is ${i - 1}`);
});

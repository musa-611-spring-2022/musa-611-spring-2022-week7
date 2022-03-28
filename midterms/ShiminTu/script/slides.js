const slides = [
  {
    title: "Fedex, UPS and DHL facilities distribution in Philadelphia",
    content: `
      Online shopping becomes increasing popular, but you may get distraught when you need to find a shipping facility to return items you don't like. <br>Don't worry, there is a map presenting distribution of all facilities of Fedex, UPS and DHL. You can get a understanding of the location of each shipping facility, and find the one that is nearest.  <br>Those facilities include three types, namely dropboxes, staffed facilities and authorized ship centers！
    `,
    era: null,
    bounds: [[39.91561866255567, -75.22587949254063], [40.11683651612982, -75.00769201875363]],
    dataset: 'ndFeature',
    slideType: 'point',
  },


  {
    title: 'Shipping facilities distribution in University City',
    content: `
      second two
    `,
    Neighborhood: 'Univeristy City',
    bounds: [[39.944355927948074, -75.20598008917966], [39.9636790351931, -75.18643423574248]],
    dataset: 'ucData',
    slideType: 'pointList',
  },

  {
    title: 'Three Neighborhoods with most shipping facilities',
    neighborList: ['Logan Square','Rittenhouse','Old City'],
    slideType: 'list',
    bounds: [[[39.95318265752048, -75.18233661145126], [39.96298404942363, -75.1615624416728]],
              [[39.946339456024695, -75.18714292306511],[39.952523574076245, -75.16353837015535]],
              [[39.94833877923165, -75.15623609336934], [39.95749777707519, -75.14048232211576]]],
  },

  {
    title: 'Three Zipcodes with most shipping facilities',
    zipList: ['19103','19104','19106'],
    slideType: 'zipList',
    bounds: [[[39.94711540060912, -75.18843928912834], [39.96037196311949, -75.16624083118832]],
              [[39.943907268971465, -75.21381821528165],[39.97674438909098, -75.1846954199091]],
              [[39.94163366394665, -75.15658260055996], [39.95683030041192, -75.13726934161767]]],
  },

  {
    title: 'Numbers of shipping facilities in each zipcode area',
    content: `
      This is a choropleth map showing the number of shipping facilities of each zipcode area. It looks realy familiar, since it is highly similar to the median household income distribution map. <br>My question is, does injustice of shipping facilities exist? It is reasonable to suspect that rich people are more accessible to shipping facilities than the poor. So, how can we improve the situation?
    `,
    slideType: 'choropleth',
  },
];
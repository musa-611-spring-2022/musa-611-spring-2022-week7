const slides = [
  {
    title: "Project Overview",
    content: `
      In CPLN 504 - Site Planning class this semeter, we are redesigning the
      block in Grays Ferry, Philadelphia, PA. The site is about 142,000 sq ft,
      and it current has an abandoned grocery building. We are asked to add 40-50
      affordable housing units and 2000-4000 sq ft of commercials retail space.
      This story map walks through some analysis of the site and design ideass.
    `,
    section: 'ProjectOverview',
    bounds: [[39.938098, -75.195012], [39.939015, -75.193338]],
  },

  {
    title: 'Introduction',
    content: `
      The pin shows the location of the site to City of Philadelphia. Zoom in to
      view the boundary of the site.
    `,
    section: 'Introduction',
    showpopups: true,
  },

  {
    title: 'Existing: Site Overview',
    content: `
      The site is located within Census Tract 33 and surrounded by Census Tract 13,
      20, 32, 36. According to 2015-2019 ACS 5-Year Estimate, Census Tract 33 has a
      population of 6203 with 44.3% White, 41.8% African American, 6.9% Asian, 7%
      others. The median age is 35.5 years old. The median household income in 2019
      dollars is $35,521. The vacant rate in this census tract is 16.9%.
    `,
    section: 'CensusData',
    showpopups: true,
  },

  {
    title: 'Existing: Amenities',
    content: `
      There are various amenities around the site, including stores, playgrounds,
      healthcare facilities, schools, and a fire station. There is a also an Indego
      bikeshare station at 30th st and Grays Ferry Ave. Hover over the pins to
      see what the amenities are.
    `,
    section: 'Amenities',
    showpopups: false,
  },

  {
    title: 'Existing: Transit',
    content: `
      Three bus routes pass through the site. They all go to different part of
      the city without transferring. So, the area can be considered transit sufficient.
    `,
    section: 'Transit',
    showpopups: true,
  },

  {
    title: 'Plan: Road Extension',
    content: `
      Here comes our designing ideas. First, we want to extend the Oakford St
      which currently stops east to our site. By extending that street, the site
      will be divided into two parts. The upper triangle can be used as a buffer
      zone to prevent noise on the Grays Ferry Ave. Click on the feature to see
      the planning vision or a typology.
      Image Source: Google Maps.
    `,
    section: 'RoadExtension',
    showpopups: false,
  },

  {
    title: 'Plan: Affordable Housing',
    content: `
      We are planning to build 40 row houses for affordable housing options. On the
      top the site, there will be 16 units, and on the bottom of the site, there
      will be 24 unit. Each unit will have 2 floors, and each floor will be 15ft
      by 45 ft. The typology comes from existing row houses in Grays Ferry region.
    `,
    section: 'AffordableHousing',
    showpopups: false,
  },

  {
    title: 'Plan: Community Center',
    content: `
      We are planning a community center in this site because there current isn't
      one in the area. We are envisioning a two to three story structure with a
      green roof because the people will be able to see Philadelphia's skyline from
      this area. A planned community center at Upper Darby can be used a typology.
      Image Source: https://whyy.org/articles/upper-darby-receives-1-million-grant-for-phase-one-of-new-community-center/
    `,
    section: 'CommunityCenter',
    showpopups: false,
  },

  {
    title: 'Plan: Small Retail',
    content: `
      The small retails are also used as buffers between the busy road and the
      planned residential area. They can also be blend to the first floor of the
      community center. A typology can be the retails at 23rd and South St where
      people enjoy the open space with restaurants and shops.
    `,
    section: 'SmallRetail',
    showpopups: false,
  },

  {
    title: 'Plan: Green Space',
    content: `
      There will be two green spaces. The upper one with larger trees will stand
      between the road and residential area. It can also be used for out door
      dinning. The lower one is more like a community garden shared by the residents
      of the row houses. A typology for that can be the share pedestrian area between
      row houses in Grad Hospital region.
      Image Sources: Buffer: Morgan's Pier / Erin Whitcomb, https://www.inquirer.com/food/craig-laban/restaurants-outdoor-dining-restrictions-yellow-phase-20200526.html, Garden: GoogleMaps.
    `,
    section: 'GreenSpace',
    showpopups: false,
  },

  {
    title: 'Plan: Parking',
    content: `
      Lastly, parking will be provided to each unit of the affordable housing,
      the community center, and retail. Along the Grays Ferry Ave, the parking
      will look like the existing parking across the street. However, the residential
      parking will look more similar to other public housing projects in Grays
      Ferry where residents park the cars at their back yards.
    `,
    section: 'Parking',
    showpopups: false,
  }
];

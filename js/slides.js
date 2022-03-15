const slides = [

  {
    title: "2022 Beijing",
    time: `February 4-20, 2022`,
    location:`Beijing, China`,
    Total_nations:`91`,
    Total_events:`109`,
    img:'data/beijing.jpg',
    era: 'Beijing',
    bounds: [[-75, -180], [75, 180]],
    showpopups: true,
  },

  {
    title: "2018 Pyeongchang",
    time: `February 9-25, 2018`,
    location:`Pyeongchang, South Korea`,
    Total_nations:`93`,
    Total_events:`102`,
    img:'data/2018.jpg',
    era: 'Pyeongchang',
    showpopups: true,
  },

  {
    title: "2014 Sochi",
    time: `February 7–23, 2014`,
    location:`Sochi, Russia`,
    Total_nations:`88`,
    Total_events:`98`,
    img:'data/2014.jpg',
    era: 'Sochi',
    showpopups: true,
  },

  {
    title: "2010 Vancouver",
    time: `February 12–28, 2010`,
    location:`Vancouver, Canada`,
    Total_nations:`82`,
    Total_events:`86`,
    img:'data/2010.jpg',
    era: 'Vancouver',
    showpopups: true,
  },

  {
    title: "2006 Turin",
    time: `February 10-26, 2006`,
    location:`Turino, Italy`,
    Total_nations:`85`,
    Total_events:`84`,
    img:'data/2006.jpg',
    era: 'Turino',
    showpopups: true,
  },

  {
    title: "2002 Salt Lake City",
    time: `February 8-24, 2002`,
    location:`Salt Lake City, United States`,
    Total_nations:`77`,
    Total_events:`78`,
    img:'data/2002.jpg',
    era: 'Salt Lake City',
    showpopups: true,
  },

  {
    title: "1998 Nagano",
    time: `February 7-22, 1998`,
    location:`Nagano, Japan`,
    Total_nations:`72`,
    Total_events:`68`,
    img:'data/1998.jpg',
    era: 'Nagano',
    showpopups: true,
  },

  {
    title: "1994 Lillehammer",
    time: `February 12-27, 1994`,
    location:`Lillehammer, Norway`,
    Total_nations:`67`,
    Total_events:`61`,
    img:'data/1994.jpg',
    era: 'Lillehammer',
    showpopups: true,
  },

  {
    title: "1992 Albertville",
    time: `February 8-23, 1992`,
    location:`Alberville, France`,
    Total_nations:`64`,
    Total_events:`57`,
    img:'data/1992.jpg',
    era: 'inat',
    showpopups: true,
  },

  {
    title: "1988 Calgary",
    time: `February 13-28, 1988`,
    location:`Calgary, Canada`,
    Total_nations:`57`,
    Total_events:`46`,
    img:'data/1988.jpg',
    era: 'Calgary',
    showpopups: true,
  },

  {
    title: '1984 Sarajevo',
    time: `February 8-29, 1984`,
    location:`Sarajevo, Yugoslavia`,
    Total_nations:`49`,
    Total_events:`39`,
    img:'data/1984.jpg',
    era: 'Sarajevo',
  },

  {
    title: '1980 Lake Placid',
    time: `February 13-24, 1980`,
    location:`Lake Placid, USA`,
    Total_nations:`37`,
    Total_events:`38`,
    img:'data/1980.jpg',
    era: 'Lake Placid',
  },

  {
    title: '1976 Innsbruck',
    time: `February 4-15, 1976`,
    location:`Innsbruck, Austria`,
    Total_nations:`37`,
    Total_events:`37`,
    img:'data/1976.jpg',
    era: 'Innsbruck',
  },

  {
    title: '1972 Sapporo',
    time: `February 3-13, 1972`,
    location:`Sapporo, Japan`,
    Total_nations:`35`,
    Total_events:`35`,
    img:'data/1972.jpg',
    era: 'Sapporo',
  },

  {
    title: '1968 Grenoble',
    time: `February 6-18, 1972`,
    location:`Grenoble, France`,
    Total_nations:`37`,
    Total_events:`35`,
    img:'data/1968.jpg',
    era: 'Grenoble',
  },

  {
    title: '1964 Innsbruck',
    time: `Jan 29-Feb 9, 1964`,
    location:`Innsbruck, Austria`,
    Total_nations:`36`,
    Total_events:`34`,
    img:'data/1964.jpg',
    era: 'Innsbruck',
  },

  {
    title: '1960 Squaw Valley',
    time: `February 18-28, 1960`,
    location:`Squaw Valley, USA`,
    Total_nations:`30`,
    Total_events:`27`,
    img:'data/1960.jpg',
    era: 'Squaw Valley',
  },

  {
    title: '1956 Cortina dAmpezzo',
    time: `Jan 26 - Feb 5, 1956`,
    location:`Corina d'Ampezzo, Italy`,
    Total_nations:`32`,
    Total_events:`24`,
    img:'data/1956.jpg',
    era: 'Cortina dAmpezzo',
  },

  {
    title: '1952 Oslo',
    time: `February 14-25, 1952`,
    location:`Oslo, Norway`,
    Total_nations:`30`,
    Total_events:`22`,
    img:'data/1952.jpg',
    era: 'Oslo',
  },

  {
    title: '1948 St Moritz',
    time: `Jan 30-Feb 8, 1948`,
    location:`St Moritz, Switzerland`,
    Total_nations:`30`,
    Total_events:`22`,
    img:'data/1948.jpg',
    era: 'St Moritz',
  },

  {
    title: '1936 Garmisch-Partenkirchen',
    time: `February 6 - 16, 1936`,
    location:`Garmisch-Partenkirchen, Germany`,
    Total_nations:`28`,
    Total_events:`17`,
    img:'data/1936.jpg',
    era: 'Garmisch-Partenkirchen',
  },

  {
    title: '1932 Lake Placid',
    time: `February 4 - 15, 1932`,
    location:`Lake Placid, USA`,
    Total_nations:`17`,
    Total_events:`14`,
    img:'data/1932.jpg',
    era: 'Lake Placid',
  },

  {
    title: '1928 St Moritz',
    time: `February 11 - 19, 1928`,
    location:`St Moritz, Switzerland`,
    Total_nations:`25`,
    Total_events:`14`,
    img:'data/1928.jpg',
    era: 'St Moritz',
  },

  {
    title: '1924 Chamonix',
    time: `Jan 25 - Feb 5, 1924`,
    location:`Chamonix, France`,
    Total_nations:`6`,
    Total_events:`16`,
    img:'data/1924.jpg',
    era: 'Chamonix',
  }

];

const slides = [
  {
    title: "The Hudson River School of Art",
    content: `
      The Hudson River School of Art was a mid-19th century American art movement 
      influenced by Romanticism and characterized by sweeping landscapes depicting 
      nature and humans coexisting peacefully. There are two recognized generations 
      of artists belonging to the Hudson River School of Art. The first generation 
      primarily focused on the Hudson River Valley, including the Adirondak, Catskill, 
      and White Mountains, whereas the second generation expanded to the American West,
      New England, The Maritimes of Canada, and South America. This exploration 
      will primarily cover first generation painters.      
    `,
    siteID: null,
    paintings: null,
  },

  {
    title: 'Thomas Cole National Historic Site',
    content: `
    Thomas Cole is credited as being the founder of the Hudson River School founder. 
    He first visited Catskill in 1825, falling in love with the village and the unforgettable mountains that form 
    its backdrop. Cole and his wife set up house in Cedar Grove in 1836. While he occasionally painted the landscapes
    immediately surrounding the house, he prefered the location of the nearby Catskill Creek.
    <br/><br/>
    The Main House and Studio are open for guided and self-guided tours, which are offered 
    Tuesday through Sunday from May through October. The historic grounds and visitor center 
    are open free of charge every day from dawn to dusk. For  information visit 
    [thomascole.org/visit](http://thomascole.org/visit/).
    `,
    siteID: 'Thomas_Cole_National_Historic_Site',
    paintings: "cole_mainHouse.jpg,cole_mainHouse_irl.jpg",
    showpopups: true,
  },

  {
    title: 'Olana State Historic Site',
    content: `
    Frederic Church is the second most famous painter in the Hudson River School of Art, and the leader of the Second Generation
    artists. Olana is Church's home, a site which he chose for its westward facing overlooks of the Hudson River and the Catskill
    Mountains behind the river. The location of Olana mirrors that of Cole's Cedar Grove house, seen on the previous slide.
    `,
    siteID: 'Olana_State_Historic_Site',
    paintings: "Catskill-Mountains_FromOlana1_Church.jpg,olana_pano.jpg,olana_sketch_Church.jpg,olana_mansion.jpg",
    showpopups: true,
  },

  {
    title: 'Catskill Creek',
    content: `
    Catskill Creek was one of Thomas Cole's favorite places to paint, as evidence by the 10+ paintings featuring it. When Cole began 
    mentoring Church in 1844, Catskill Creek was where they fostered a relationship and Church also came to love the place. 
    <br><br>
    One of Cole's most famous paintings, *View on the Catskil*, was commissioned in 1833 by Jonathan Sturges.
    `,
    siteID: 'Catskill_Creek',
    paintings: "viewOnTheCatskill_Cole.jpg,sceneOnTheCatskillCreek_Church.jpg,catskillCreek_Cole.jpg,onCatskillCreekAtSunset_Cole.jpg",
    showpopups: true,
  },

  {
    title: 'Kaaterskill Clove',
    content: `
    The Kaaterskill Clove, is a 'cleft'-like feature that was created by glacial movement and the erosion of Kaaterskill Creek. 
    This overlook faces East over a ravine of Kaaterskill Creek and became a popular location for Cole, Asher Durand, and other 
    Second Generation artists.
    `,
    siteID: 'Kaaterskill_Clove',
    paintings: "topOfKaaterskill_Cole.png,topOfKaaterskill2_Cole.jpg,topOfKaaterskill_Durand.jpg,Asher_Durand_Kindred_Spirits.jpg,Kaaterskill_Clove_by_Harriet_Cany_Peale_1858.jpg,kaaterskillClove_irl.jpg",
    showpopups: true,
  },

  {
    title: 'Kaaterskill Falls',
    content: `
    Kaaterskill Falls is still a popular location for a day hike, and was extremely popular with Second Generation artists.
    There are two tiers to the falls, totalling 260 feet high. The falls were another favorite of Cole's and were the subject of
    more than three of his paintings - from the top, behind, and in facing the falls.
    `,
    siteID: 'Kaaterskill_Falls',
    paintings: "kaaterskillFalls_Cole.jpg,kaaterskill-falls-1826_Cole.jpg,kaaterskill-falls3.jpg,kaaterskill-falls4.jpg,kaaterskill-falls_irl.jpg",
    showpopups: true,
  },

  {
    title: 'North-South Lake',
    content: `
    The pair of lakes known as North-South Lakes were first featured by the famous writer, James Fenimore Cooper. Thomas Cole made
    the lakes his subject in a painting called *Lake with Dead Trees*, painted in 1825. In the background of the painting, is the distant
    Round Top Mountain, another subject of Cole's painting. In the painting, Cole focuses on the dead trees because they were drowned by
    the elevated level of South lake due to its man-made dam.  Cole was not the only painter to feature the lakes, with Frederic Church and 
    Jasper Cropsey following.
    `,
    siteID: 'North_South_Lake',
    paintings: "lake-with-dead-trees-catskill-1825_Cole.jpg,north_south_lake.jpg,north_south_lake_irl.jpg",
    showpopups: true,
  },

  {
    title: 'Sunset Rock',
    content: `
    Sunset Rock is closely located to Kaaterskill Clove, Kaaterskill Falls, and North-South Lakes. However, it offers a south-faceing sweeping 
    view of the lakes and the Catskill Mountain house. Cole and Cropsey produced the most famous paintings of this location. It is a
    popular hiking location in the modern age.
    `,
    siteID: 'Sunset_Rock',
    paintings: "sunsetRock_Cole.jpg,sunsetRock2.jpg,sunsetRock_irl.jpg",
    showpopups: true,
  },

  {
    title: 'Catskill Mountain House',
    content: `
    The Catskill Mountain House was built to serve wealthy Manhattan vactioners an escape into the picturesque Hudson River Valley.
    It opened in 1824, and was frequented by members of the Hudson River School of Art. While the vista is still present, the House 
    no longer stands.
    `,
    siteID: 'Catskill_Mountain_House',
    paintings: "catskillMtnHouse1_Church.jpg,catskillMtnHouse2_Church.jpg,catskillMtnHouse3_Church.jpg,theHandsOfGlaciers_Cole.jpg",
    showpopups: true,
  },

  {
    title: 'Mount Merino and the Catskills',
    content: `
    The last location around the towns of Catskill and Hudson is Mount Merino. Artist Sanford Gifford produced the most famous
    painting of Mount Marino, viewing it from the banks of the Hudson River.
    `,
    siteID: 'Mount_Merino_and_the_Catskills',
    paintings: "south_bay_hudson_Gifford.jpg,south_bay_hudson_irl.jpg",
    showpopups: true,
  },

  {
    title: 'Albany From the East side of the Hudson River',
    content: `
    By 1850, Albany was a populous city of about 50,000 people. Church and William Hart both painted Albany from the eastern bank
    of the Hudson River. 
    `,
    siteID: 'Albany',
    paintings: "viewOfAlbany_Cole.jpg,viewOfAlbany_irl.jpg",
    showpopups: true,
  },

  {
    title: 'Hudson River From Hasbrouk Park in Kingston',
    content: `
    A new artist, Joseph Tubby, settled in Rondout, on the western bank of the Hudson, the subject of his painting *Hudson River
    From Hasbrouk.*
    `,
    siteID: 'Hudson_River_From_Hasbrouk',
    paintings: "hasbroukPark_Tubby.jpg",
    showpopups: true,
  },

  {
    title: 'Mohonk Lake',
    content: `
    Mohonk Lake is one of the more famous locations of the Hudson River Valley, home to the Mohonk Mountain House, an active hotel,
    spa, and network of hiking trails. Nestled in the Shawangunk Mountaings, otherwise known as the *Gunks*, Lake Mohonk is one of 
    only two Shawangunk subjects by Cole.
    `,
    siteID: 'Mohonk_Lake',
    paintings: "THOMAS-COLE-LAKE-MOHONK.jpg,lakeMohonk_Cole.jpg,lakeMohonk_irl.jpg,lakeMohonk2_Cole.jpg",
    showpopups: true,
  },

  {
    title: 'Eagle Cliff near Artist\'s Rock',
    content: `
    Second Generation artists Thomas Worthington Whittredge and Sanford Robinson Gifford were the most prolific painters of the Shawangunks
    than any of their counterparts. Eagle Cliff near Artist's Rock features a southern facing vista of the Shawangunk Ridge and is easily 
    accessible from the Mohonk Mountain House.
    `,
    siteID: 'Eagle_Cliff',
    paintings: "eaglesCliff_Whittredge.jpg,eaglesCliff_irl.jpg",
    showpopups: true,
  },

  {
    title: 'Shawangunk Mountains from Sky Top',
    content: `
    Second Generation artists Thomas Worthington Whittredge and Sanford Robinson Gifford were the most prolific painters of the Shawangunks
    than any of their counterparts. Another southern-facing view of the Shawangunks is seen from Sky-top, the present-day location of the Sky-top Tower and reservoir,
    which are often frequented by visitors to the Mohonk Mountain House. 
    `,
    siteID: 'Shawangunk_Mountains',
    paintings: "shawangunks_Gifford.jpg,gunks_irl.jpg",
    showpopups: true,
  },

  {
    title: 'Hudson River from Vanderbilt Mansion',
    content: `
    The Vanderbilt Mansion was constructed in 1898 by Frederic Vanderbilt, grandson of railroad tycoon, Cornelius Vanderbilt. 
    Prior to this, the location was featured in Johann Hermann Carmiencke's 1856 painting of the Hudson River and Catskill mountains.
    `,
    siteID: 'Hudson_River_from_Vanderbilt',
    paintings: "vanderbilt_Carmiencke.jpg,vanderbilt_irl.jpg",
    showpopups: true,
  },

  {
    title: 'Hudson River from Croton Point Park',
    content: `
    Sanford Robinson Gifford was the Hudson River School artist that focused on the Hudson River the most. He sketched views on both
    the east and west banks of the Hudson along Tappan Zee and Haverstraw Bay. 
    `,
    siteID: 'Hudson_River_from_Croton',
    paintings: "crotonPointPark1_Gifford.jpg,crotonPointPark2_Gifford.jpg",
    showpopups: true,
  },

  {
    title: 'Jasper Cropsey Home and Studio',
    content: `
    Much like Thomas Cole's Cedar Grove and Frederic Church's Olana, Jasper Crospey set up a studio along the banks of the Hudson.
    Crospey purchased the homestead named Ever Rest in 1885 and today hosts guided tours. 
    `,
    siteID: 'Jasper_Cropsey',
    paintings: "hudsonFromCropseyHome_Cropsey.jpg,hudsonFromCropseyHome2_Cropsey.jpg",
    showpopups: true,
  },

  {
    title: 'Platte Clove',
    content: `
    Thomas Cole and Asher Durand painted this less frequented location. Just to the south of the Kaaterskill Falls locations,
    Platte Clove is deeper in the wilderness and offers more seclusion.
    `,
    siteID: 'Platte_Clove',
    paintings: "platte_clove.jpg,a-sycamore-tree-plaaterkill-cove-asher-brown-durand.jpg",
    showpopups: true,
  },

  {
    title: 'Storm King from Long Dock Park',
    content: `
    Storm King mountain is known for the battle between the utility company, ConEd, and the environmental activist organization, Scenic Hudson, 
    in which the top of Storm King Mountain was proposed to be removed to create a reservoir for a hydroelectric power-plant. This 
    mountain was painted by Thomas Cole and Samuel Colman. 
    `,
    siteID: 'Storm_King',
    paintings: "cole_storm_king.jpg,cole_storm_king2.jpg,storm_king_irl.jpg",
    showpopups: true,
  },

  {
    title: 'Hudson River Skywalk',
    content: `
    While the Hudson River Skywalk is a modern creation, the landscape is laregly unchanged from what Thomas Cole drew in his *Long Dock*
    and *Catskill Landing on the Hudson River* and painting *Reflections*.
    `,
    siteID: 'Hudson_River_Skywalk',
    paintings: "hudsonRiverSkywalk1.jpg,cloudsFromOlana_Church.jpg",
    showpopups: true,
  },
  
];

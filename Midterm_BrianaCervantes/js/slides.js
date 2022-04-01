/* === These are my slides === */
/* my thought is to use index to loop through coordinates. in the features? like index 0 = slide 0 */


/*const myslides = [slide_0, slide_1, slide_2, slide_3, slide_4,
  slide_5, slide_6, slide_7, slide_8, slide_9, slide10]
  
    slide_temp = {
    title:'',
    content: '',
    coords: ' '
  }
  */  
  

var markerCustom = L.icon({
  iconUrl: 'img/marker8b.png',
  iconSize: [8, 8],
  iconAnchor: [0, 0],
  popupAnchor: [2, 8]
});

var plainIcon = L.icon({
  iconUrl: 'img/marker10.png',
  iconSize: [40, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -40]
});
  
  
var cameraIcon = L.icon({
  iconUrl: 'img/marker5.png',
  iconSize: [70, 70],
  iconAnchor: [0, 0],
  popupAnchor: [35, 5]
});  
var nopdIcon = L.icon({
  iconUrl: 'img/nopd.png',
  iconSize: [40, 40],
  iconAnchor: [0, 0],
  popupAnchor: [-3, -10]
});


const slide_00 = {
  title:'Eye on Surveillance',
  slide: 'slide_00',
  icon: plainIcon,
  dataUse: 'None',
  autobounds: 'no',
  img: 'yes',
  content: 'In December of 2020, residents and community leaders organizing under the name Eye on Surveillance successfully banned the use of four types of surveillance technology. Concerned by the lack of transparency around surveillance and its use by a historically biased police department still operating under a consent decree due to discrimination, Eye On Surveillance and other groups fought for this legislation. While the ban did not address all their concerns, it set the city on a path toward responsible surveillance regulation. On April 14th of this year, a new ordinance will be considered by City Council, and if passed will roll back the bans and gains achieved by Eye on Surveillance in 2020.  <br> <br> <a href= https://eyeonsurveillance.org/ > Visit their website to learn more </a> ',
};

const slide_0 = {
    title:'The Real Time Crime Center',
    slide: 'slide_0',
    dataUse: 'None', 
    icon:  cameraIcon,
    autobounds: 'yes',
    img: 'yes',
    content: 'At the heart of surveillance in the city is the Real Time Crime Center, a “state-of-the-art" surveillance hub operating 24/7. It is housed within the New Orleans office of Homeland Security and works seamlessly with the police department, fire department, New Orleans Emergency Medical Services, and other state and university police. The RTCC’s central role among law enforcement and public safety agencies is due to its consolidation of surveillance camera feeds from around the city.',
  };
  
const slide_1 = {
    title: 'The Cameras',
    slide: 'slide_1',
    dataUse: 'cameraData',
    icon: markerCustom,
    autobounds: 'no',
    content: 'Here are all the publicly owned surveillance cameras that stream their live feed straight to the RTCC. In total there are 555 city owned cameras, but this does not include the 420 cameras owned by residents that have agreed to share their data with the center. Due to privacy concerns, the city declined to make available the location of the resident owned cameras. But in general, the city has not been forthcoming about the location of cameras that they own and operate. This map was only made possible by the outcome of a lawsuit, in which the city was sued in a successful demand for access to the location of the city’s surveillance cameras.',
  };
const slide_2 = {
    title: 'The Mayor\'s Office ',
    slide: 'slide_2',
    dataUse: 'None', 
    icon: plainIcon,
    autobounds: 'yes',
    showpopups: 'yes',
    caption: '<h3> Former Mayor Landrieu (front) and current Mayor Cantrell (to the right of Landrieu) </h3>',
    img: '<img src = "img/mayors.jpg" height="198px" width="300px" />',
    content: 'The former Mayor Mitch Landrieu created the Real Time Crime Center in 2017 with an initial budget of $40 million. Its purpose was to fight not only crime but also acts of terrorism. In fact, the RTCC not only coordinates with local, university, and state law enforcement, but it also assists the New Orleans office of the FBI. Now under new leadership, Mayor Cantrell has also been supportive of the RTCC and investments in surveillance technology. But all of this has been met with consistent community pushback. ',
  };
const slide_3 = {
    title: 'The Louisiana Fusion Center & New Orleans PD',
    slide: 'slide_3',
    icon: plainIcon,
    autobounds: 'yes',
    dataUse: 'None',
    showpopups: 'yes',
    content: '<p>While Eye on Surveillance and others have consistently pushed back against surveillance because of its perpetuation of racial discrimination, there is further concern about the city’s ability to manage the technology responsibly, even if discrimination concerns were addressed. </p><p>For years, various city officials and the police department assured residents that while some forms of surveillance technology were being used, facial recognition was not. At a City Council meeting in the summer of 2020, where legislation to ban facial recognition software and regulate other technologies was introduced for the first time, City Council members requested clarification about the state of surveillance in New Orleans. Administrator of the Real Time Crime Center, Ross Bourgeois made it clear, stating “Of course the city doesn’t deploy any facial recognition technology in a law enforcement purpose...The city doesn’t have any of that technology available for our use.” Further, Chief Technology Officer Jonathan Wisbey confirmed “We do not currently employ any technology that does that in 2020.” <a href= “https://thelensnola.org/2020/11/12/new-orleans-police-department-using-facial-recognition-despite-years-of-denial/” >the lens</a></p> <p>But by November, the NOPD admitted they had in fact been using facial recognition software in some investigations. While they did not own the software, they were in partnership with state and federal agencies that did, including both the FBI and the <a href= “http://la-safe.org/” >Louisiana State Analytical & Fusion Exchange,  </a> one of many national surveillance centers in the nation. </p> ',
  };
const slide_4 = {
    title: 'Pushback Then & Now',
    slide: 'slide_4',
    dataUse: 'None',
    autobounds: 'no',
    showpopups: 'yes', 
    img: 'yes',
    showimg: 'yes',
    icon: plainIcon,
    content: '<p>The use of facial recognition tech in the New Orleans Police Department was a surprise for many. Outrage and concern led to Eye on Surveillance’s proposed ban being adopted at the end of the year. Though the ordinance was successfully passed, a new ordinance was recently introduced that would undo the bans and gains made by Eye on Surveillance and the previous City Council. The ordinance to reverse the bans is supported by both the Mayor and police superintendent, Shaun Ferguson. </p><p>Now, EOS and others are continuing the fight against harmful surveillance, for the reasons stated in their press release:</p><p style= font-style: italic;>“In December 2020, New Orleans City Council banned the use of facial recognition and three other surveillance technologies, in large part because they have been proven rife with racial bias and have resulted in the wrongful arrest and imprisonment of people of color across the country. They also continue to distract from addressing the root causes of crime; these tools don’t prevent crime, yet we continue to pour money into them instead of affordable housing, job training, nutritious food options, and better schools.” <a href= “https://eye-on-surveillance.webflow.io//blog/surveillance-ordinance-amendment-response”> Eye on Surveillance Press Release Feb. 3 2022 </a></p> '
  };
const slide_5 = {
    title: 'Affordable Housing: Renters',
    slide: 'slide_5',
    icon: markerCustom,
    autobounds: 'no',
    dataUse: 'rentData', 
    content: '<p>EOS\' concern over wasted resources has also been cited by others.The Atlas of Surveillance that documents where local real time crime centers and federal/state fusion centers are active around the nation reported that “In 2013, NOPD came under scrutiny for spending<a href= “https://www.wwltv.com/article/news/high-tech-crime-fighting-tool-now-defunct/320048074”> $13 million </a>on technology that was later alleged to be ineffective. This included the city’s ShotSpotter gunshot detection program, which was discontinued in 2013 after NOPD was unable to demonstrate that the technology had an impact on crime.”<a href= "https://atlasofsurveillance.org/real-time-crime-centers/new-orleans-real-time-crime-center"> (Atlas of Surveillance)</a></p><p style= font-style:oblique;>Looking just at affordable housing, what are the state of things?</p><p>The state of affordable rents in New Orleans is bleak. Shown here is a map highlighting an estimate of the percentage of renters spending half or more of their income on rent by block group.</p> <table class="cuteTable"><tr style="border: 0.1rem solid white;"><th>% Income Spent on Rent</th><th>Number of Block Groups Is Majority</th><th>% of Block Groups is Majority</th></tr><tr><td>50% or More</td><td>307</td><td>61.7%</td></tr><tr><td>40 to 49%</td><td>16</td><td>3.2%</td></tr><tr><td>35 to 39%</td><td>23</td><td>4.6%</td></tr><tr><td>30 to 34%</td><td>25</td><td>5.0%</td></tr><tr><td>25 to 29%</td><td>32</td><td>6.4%</td></tr><tr><td>20 to 24%</td><td>47</td><td>9.5%</td></tr><tr><td>Not Computed</td><td>47</td><td>9.5%</td></tr></table> source: US Census (5YR ACS)',
  };
  const slide_6 = {
    title: 'Affordable Housing: Homeowners',
    slide: 'slide_6',
    icon: markerCustom,
    dataUse: 'mortData',
    autobounds: 'no', 
    content: '<p>Looking just at affordable housing, what are the state of things?</p><p>The state of affordable housing for Homeowners is not as bad as it is for renters. Shown here is a map highlighting an estimate of the percentage of homeowners with debt that spend half or more of their income on housing by block group.</p><table class="cuteTable"><tr><th>% Income Spent on Homeownership</th><th>Number of Block Groups Is Majority</th><th>% of Block Groups is Majority</th></tr><tr><td>50% or More</td><td>131</td><td>26.4%</td></tr><tr><td>40 to 49%</td><td>27</td><td>5.4%</td></tr><tr><td>35 to 39%</td><td>19</td><td>3.8%</td></tr><tr><td>30 to 34%</td><td>24</td><td>4.8%</td></tr><tr><td>25 to 29%</td><td>38</td><td>7.6%</td></tr><tr><td>20 to 24%</td><td>49</td><td>9.9%</td></tr><tr><td>15 to 19%</td><td>74</td><td>14.9%</td></tr><tr><td>10 to 15%</td><td>63</td><td>12.7%</td></tr><tr><td>Less than 10%</td><td>44</td><td>8.9%</td></tr><tr><td>Not Computed</td><td>44</td><td>8.9%</td></tr></table>Source: US Census (5YR ACS)',
  };



const slides = [slide_00, slide_0, slide_1, slide_2, slide_3, slide_4, slide_5, slide_6]
/* ================================
Week 6 Assignment: Slide Model
================================ */
var currentSlide = 0
var filterer=''
var slideNumber=0
var Intro= {slideNumber:0,
	title: 'Migrant Deaths in the Sonoran Desert',
	x:31.82,
	y:-111.471,
	zoom:8,
	description: "Those who cross the border into the US often underestimate the danger that awaits them on the other side before they reach civilization. As this tool illustrates, many perish in the desert of southern Arizona with the American dream right at their fingertips.",
	description2: "This website provides insight into the individuals who lost their lives attempting to cross the border through the Sonoran Desert. Data includes recorded deaths from 1987 to 2022."}

var Heat={slideNumber:1,
	x:31.82,
	y:-111.471,
	zoom:8,
	title: "Heat Exposure",
	description2: 'According to the U.S. Border Patrol:' + ' "To avoid death or injury from severe dehydration, a person walking across the landscape in the heat of summer must consume no less than two gallons of water per day.  The average person cannot carry sufficient water to avoid life-threatening dehydration over the course of several days in the brush."',
	description:"Heat Exposure Text."}

var Skeletal={slideNumber:2,
	title: "Skeletal Remains Found, Undetermind Cause of Death",
	x:31.82,
	y:-111.471,
	zoom:8,
	description2: "",
	description:"Hundreds of sets of human remains are found every year in southern Arizona, many of them belonging to migrants who've crossed the Mexico border seeking a better life in America. According to Humane Borders, a nonprofit organization that tracks migrant remains recovered by local medical examiners, 227 separate sets of remains were found in Arizona in 2020 — 220 of them were located in Pima County alone." + "- Joshn Kelety, Phoenix New Times "}

var Trauma={slideNumber:3,
	title: "Blunt Force Trauma",
	x:31.82,
	y:-111.471,
	zoom:8,
	description2: "-University of Arizona," + " Binational Migration Institute",
	description: "The cause of death resulting from a motor vehicle accident involving an undocumented border crosser may be blunt force trauma, while the manner of death would also be accidental."}

var Gunshot={slideNumber:4,
	title: "Gunshot Wound",
	x:31.82,
	y:-111.471,
	zoom:8,
	description: "Gunshot Wound Text 2.",
	description2: "Gunshot Wound Text 1.",
}

var slides = [Intro, Heat, Skeletal, Trauma, Gunshot]

$('#nextButton').click(function(e) {
  next();
  slidePlots();
});
$('#previousButton').click(function(e) {
  previous();
  slidePlots();

});
$('#exposureButton').click(function(e) {
	$('#nextButton').show();
	$('#previousButton').show();
	currentSlide = 1;
	loadSlide(slides[currentSlide]);
	slidePlots();
});
$('#skeletalButton').click(function(e) {
	$('#nextButton').show();
	$('#previousButton').show();
	currentSlide = 2;
	loadSlide(slides[currentSlide]);
	slidePlots();

});
$('#bluntforceButton').click(function(e) {
	$('#nextButton').show();
	$('#previousButton').show();
	currentSlide = 3;
	loadSlide(slides[currentSlide]);
	slidePlots();
});
$('#gunshotButton').click(function(e) {
	$('#nextButton').show();
	$('#previousButton').show();
	currentSlide = 4;
	loadSlide(slides[currentSlide]);
	slidePlots();
});

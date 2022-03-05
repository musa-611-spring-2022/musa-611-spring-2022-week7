# MUSA 611, Week 7

## Mid-term Exercise

Create a story map using some GeoJSON data. It can be a personal story, or the
story of a place, a project, a process, a people, whatever you want, as long as
you ground that story in location.

Some examples from last year (which you can download and run locally):
- https://github.com/gxzhao1/SF-Business-Trend
- https://github.com/Haoheng-Tang/Haoheng-MUSA611-Midterm
- https://github.com/hkbonestroo/Bonestroo_CPLN-692_Midterm
- https://github.com/hqiao97/OSGIS-PhillyFoodAccess

### Preparation

#### Step 1: Prepare Geographic Data

Think about what data you want to tell a story about. You can choose a dataset from any of the following sources:

* Use data you've been working with for another class
* Find data from an open data repository (see [sample open data sources](sample-open-data-sources.md))
* Create your own dataset (check out [geojson.io](https://geojson.io))

**Data Requirements**
* At least five data points
* At least one property that can be used to filter the data and color the data
* Points, lines, and polygons are all fine
* Data should be real stuff (don't create a dataset with fictional locations)
* Whatever data you use, **be sure to include citations somewhere in your app interface**

#### Step 2: Think About Slide Content

Your story will have multiple slides, each with a title, some additional text, maybe images, and geographic data. It might also need to contain information about how you will filter or style the data for that particular slide. This kind of structure is another type of data.

How will you represent this data that is about the slides? In slides.js, write a brief example that shows what the data for one slide might look like. Think about how it will be stored and read in Javascript (arrays, objects, etc.).

#### Step 3: App Behavior

What do you want the map or the data on the map to do when you go to a different
slide?
- Should it pan and zoom to specific features?
- Should it highlight or show a popup on any features?
- Should the features shown be filtered?

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

#### Step 3: Function Signatures

It can be helpful to step back and think about the project before starting to write any code.

In your index.js file, write short descriptions of the functions that will make up your application. You don't need to write any of the code inside the functions (yet) — just think about what the functions will do, what parameters you will pass to them, and what they will return. Write comments inside of the functions detailing the steps that you want to happen when the function runs.

For example:

```js
function showSlide(...) {
  /*
    This function should:
    1: accept some slide data as the input
    2: show the content of the slide data
    3: filter the map for according the slide filters
    4: ...
  */
}
```

#### Step 4: Start writing!

## Submitting you assignment

**This exercise will be due on March 28.** We will have a few students present their story maps during the class period.

This exercise will not have automated tests in the same way as previous exercises, _however_ you code should still conform to the AirBnB JavaScript style guide. To ensure that it does, run:

```
npx eslint exercise
```

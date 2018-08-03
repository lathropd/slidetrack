"use strict"

import "../sass/slideyslides.scss";

const _ = require("lodash");


const PLAYER_CLASS = "slidey"; // goes on body to activate the page
const SLIDESET_CLASS = "slides";
const SLIDE_ID_PREFIX = "slide-";
const SLIDE_INDEX_DIGITS = 3;
const SLIDE_STARTUP_FADE_TIME = 2000;

// taking animatelo dependency out, so these are non-working for now
//const FADE_IN = animatelo.fadeIn;
//const SLIDE_IN_LEFT = animatelo.fadeInLeft;
//const SLIDE_IN_RIGHT = animatelo.fadeInRight;
//const SLIDE_OUT_LEFT = animatelo.fadeOutLeft;
//const SLIDE_OUT_RIGHT = animatelo.fadeOutRight;

//import test from "../html/test.yaml";
//console.log("yaml test", test);

// load html fragments
// this uses node's fs library, so it only runs at compile time
const fs = require("fs");
var fragments = {
    test: fs.readFileSync("src/html/test.html", "utf8"),
    controlbar: fs.readFileSync("src/html/controlbar.html", "utf8"),
    splashpage: fs.readFileSync("src/html/splash.html", "utf8"),
    spinner: fs.readFileSync("src/html/spinner.html", "utf8"),
    spinner: fs.readFileSync("src/html/spinner.html", "utf8"),
    slidesTest: fs.readFileSync("src/html/test.slides", "utf8"),
}

// TODO: Add a loading spinner like these https://loading.io/css/?


var slidey = function (params) {
    // mege the params into here

    // slide DOM params
    this.loadFrom = params.loadFrom||false;
    this.parentContainer = params.parentContainer||false;
    this.slidesetClass = SLIDESET_CLASS;
    this.playerClass = PLAYER_CLASS;

    // slideshow startup settings
    this.currentSlide = params.currentSlide||0;
    this.currentIndex = params.index||null;
    this.nextSlide = params.nextSlide||1;
    this.prevSlide = params.prevSlide||null;
    this.totalSlides = null; // this will get overwritten anyway
    this.slideTimings = params.slideTimings||[0.0,5.2,6.5];
    this.timed = params.timed || false;
    this.audio = params.audio || false;



    // Transitions related settingd
    this.startupFadeInTime = params.startupFadeInTime||SLIDE_STARTUP_FADE_TIME;
    this.fadeIn = this.parentContainer.replaceChild;
    this.slideInLeft = this.parentContainer.replaceChild;
    this.slideInRight = this.parentContainer.replaceChild;

    // using Node.replaceChild() means the slideout functions won't get separate calls
    // this.slideOutLeft = params.slideOutLeft||SLIDE_OUT_RIGHT;
    // this.slideOutRight = params.slideOutRight||SLIDE_OUT_RIGHT;


    console.log("setup slidey slides");

    /*  if a parent container isn't defined use  the default player class */
    if (!this.parentContainer) { // any falsy value
        this.parentContainer = "."+SLIDESET_CLASS;
    }

    if (typeof this.parentContainer=="string") {
        this.parentContainer = document.querySelector(this.parentContainer)
    }




    /* TODO: CREATE A DIV INSIDE THE SLIDEY THAT JUST CONTAINS THE SECTIONS */
    //add the slideshow class to the parent container
    this.parentContainer.classList.add(this.slidesetClass);
    this.parentContainer.parentElement.classList.add(this.playerClass);
    this.go();
}

slidey.prototype = {

    run: function () {
        console.log("run slidey slide")

        /* load the slides if needed */
        if (this.loadFrom != false) {
            this.load(this.loadFrom);
        } else {
            this.go();
        }
    },

    go: function () {
        /*  grab all the sections inside the parent
         */
        var sections = this.parentContainer.querySelectorAll("section");

        // give them ids
        // TODO: deal with nested sections
        this.totalSlides = sections.length;
        this.slides = Array.from(sections);
        this.slides.forEach((section, index) => {

            // generate id including 0-padded, 0-base index
            // then add it as the id
            var slideID = slideIndexToID(index);
            section.setAttribute("id", slideID);
            section.style.background = section.dataset.background;

            // hide all but current slide
            if (index == this.currentSlide) {
//                section.classList.add("current");
            } else {
                "";
            }
            this.parentContainer.removeChild(section); // pull it from the DOM

        });

        this.parentContainer.addEventListener;

        // if currentSlide is a valid slide, use that
        // if not first look for this.currentIndex
        // if called on string selector, number, invaliud element, etc.
        // try various methods to get a slide followed by defaulting to the first
        if (this.slides.includes(this.currentSlide)) {
            this.currentIndex = this.slides.find(this.currentSlide);
        } else {
            if (this.currentIndex) {
                this.currentSlide = this.slides[currentIndex];
            } else if (typeof(this.currentSlide)=="string") {
                this.currentSlide = document.querySelector(this.currentSlide);
            }  else if (typeof(this.currentSlide)=="number") {
                this.currentSlide = this.slides[Math.round(this.currentSlide)];
            }
        }

        if (this.slides.includes(this.currentSlide) ) {
            this.currentIndex = this.slides.find(this.currentSlide);
        } else {
            this.currentIndex = 0;
            this.currentSlide = this.slides[0];
        }
        this.parentContainer.append(this.currentSlide);
    },


    play: function () {
        console.log("start a new or paused slideshow")
    },

    pause: function () {
        console.log("pause slidey slide")
    },

    next: function () {
        console.log(`(next) current slide is ${this.currentIndex}`);
        console.log(`(next) try go to slide ${this.currentIndex + 1}`);
        this.goto(this.currentSlide + 1);
    },

    prev: function () {
        console.log(`(prev) current slide is ${this.currentIndex}`);
        console.log(`(prev) try go to slide ${this.currentIndex - 1}`);
        this.goto(this.currentIndex - 1);
    },

    goto: function (newIndex) {
        var oldSlide = this.currentSlide;
        var newSlide = this.slides[newIndex];
        if (this.slides.includes(newSlide)) {
            this.fadeIn(newSlide, this.currentSlide);
            this.currentSlide = newSlide;
            this.currentIndex = newIndex;

        } else {
            console.log(`(goto) invalid index, staying at slide ${this.currentSlide}`);
        }
    },


    load: function (source) {
        // if it's from an element get its inner HTML then delete the element
        // otherwise try to pull it from a url
        if (source[0] == "#") {
            var slidesText = document.querySelector(source).innerHTML;
            var slidesData = slidesDataParse(slidesText);
            var slideSections = slideDataToSections(slidesData);
            this.parentContainer.innerHTML = "";
            slideSections.forEach((slide) => this.parentContainer.append(slide));
        } else {
            console.log("load and parse from url");
        }
    },

    timeToSlide: function (currentTime) {
        // find the ID slide after the current timing
        // it will be -1 if the current timing is in the last slide
        var index =  this.slideTimings.map(function (i) { return (currentTime < i) }).indexOf(true);

        if (index > 0) {
            index = index - 1; // return the slide
        } else {
            index = this.slideTimings.length - 1; // return the last slide
        }

        if (index != this.currentSlide) {
            this.goto(index);
        }
    }
}


// this is in global scope for the module, but after compilation/etc. will be private to it
function slideIndexToID(index) {
    var slideID = SLIDE_ID_PREFIX + index.toString().padStart(SLIDE_INDEX_DIGITS, "0");
    return slideID;
}

module.exports = slidey;

window.slideIndexToID = slideIndexToID;


function slidesDataParse(slidesText) {
    var slideDataLines = slidesText.split("\n");
    var slides = [];
    var currentObject = {_content:[]};
    var text = "";
    var dataRegex = /^([a-z][a-z ]*):(.*)/ // regex for yaml-style key/value

    while (slideDataLines.length > 0) {
       var currentLine = slideDataLines.shift();
        if (currentLine == "---") {
            slides.push(currentObject);
            currentObject = {_content:[]};
            continue;
        }
        var data = dataRegex.exec(currentLine);
        if (data) {
            var key = data[1].trim().replace(/\s/g,"_");
            currentObject[key] = data[2].trim();
        } else {
            console.log(currentObject);
            currentObject._content.push(currentLine);
        }

    }
    slides.push(currentObject);
    return slides
}


function slideDataToSections(slideData) {
    var sections = slideData.map((slide) => {
        var section = document.createElement("section");
        section.innerHTML = slide._content.join("<br>");
        delete(slide._content);
        var keys = Object.keys(slide);
        console.log("keys",keys);
        keys.forEach(function (key) {
            section.dataset[key] = slide[key];
        })
        return section;
    })
    return sections;
}

"use strict"

import "web-animations-js";
import page from "../../lib/page.js/page";
import "../sass/slideyslides.scss";
import "../../lib/animatelo/dist/animatelo.min";
import templates from "./templates.js";

const _ = require("lodash");
const fs = require("fs");



const PLAYER_CLASS = "slidey"; // goes on body to activate the page
const SLIDESET_CLASS = "slides";
const SLIDE_ID_PREFIX = "slide-";
const SLIDE_INDEX_DIGITS = 3;
const SLIDE_STARTUP_FADE_TIME = 2000;
const FADE_IN = animatelo.fadeIn;
const SLIDE_IN_LEFT = animatelo.fadeInLeft;
const SLIDE_IN_RIGHT = animatelo.fadeInRight;
const SLIDE_OUT_LEFT = animatelo.fadeOutLeft;
const SLIDE_OUT_RIGHT = animatelo.fadeOutRight;

//import test from "../html/test.yaml";
//console.log("yaml test", test);

// load html fragments
// this uses node's fs library, so it only runs at compile time
var fragments = {
    test: fs.readFileSync("src/html/test.html", "utf8"),
    controlbar: fs.readFileSync("src/html/controlbar.html", "utf8"),
    splashpage: fs.readFileSync("src/html/splash.html", "utf8"),
    spinner: fs.readFileSync("src/html/spinner.html", "utf8"),
    spinner: fs.readFileSync("src/html/spinner.html", "utf8"),
    slidesTest: fs.readFileSync("src/html/test.slides", "utf8"),
}

console.log("fragments", fragments);


//fs.readdir("/")

//console.log(fragments);
//
//var newslides = slidesDataParse(fragments.slidesTest);
//console.log(newslides);
//var newsections = slideDataToSections(newslides);
//console.log(newsections);
//var ss = document.querySelector(".slides");
//newsections.forEach((section) => {ss.appendChild(section)});
//const slidey = {
//    run: () => { this.setup(); console.log("slide!")},
//    next: () => console.log("next slide"),
//    prev: () => console.log("previous slide"),
//    goTo: (slideNum) => console.log("go to slide " + slideNum),
//    setup: () => console.log("build the dom structure is needed, bind needed elements")
//
//}



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
    this.nextSlide = params.nextSlide||1;
    this.prevSlide = params.prevSlide||null;
    this.totalSlides = null; // this will get overwritten anyway
    this.slideTimings = params.slideTimings||[0.0,5.2,6.5];
    this.timed = params.timed || false;
    this.audio = params.audio || false;



    // Transitions related settingd
    this.startupFadeInTime = params.startupFadeInTime||SLIDE_STARTUP_FADE_TIME;
    this.fadeIn = params.fadeIn || FADE_IN;
    this.slideInLeft = params.slideInLeft||SLIDE_IN_LEFT;
    this.slideInRight = params.slideInRight||SLIDE_IN_RIGHT;
    this.slideOutLeft = params.slideOutLeft||SLIDE_OUT_RIGHT;
    this.slideOutRight = params.slideOutRight||SLIDE_OUT_RIGHT;


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
        sections.forEach((section, index) => {

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
        });

        FADE_IN("#"+slideIndexToID(this.currentSlide), {duration: this.startupFadeInTime});

    },


    play: function () {
        console.log("start a new or paused slideshow")
    },

    pause: function () {
        console.log("pause slidey slide")
    },

    next: function () {
        console.log(`(next) current slide is ${this.currentSlide}`);
        console.log(`(next) try go to slide ${this.currentSlide + 1}`);
        this.goto(this.currentSlide + 1);
    },

    prev: function () {
        console.log(`(prev) current slide is ${this.currentSlide}`);
        console.log(`(prev) try go to slide ${this.currentSlide - 1}`);
        this.goto(this.currentSlide - 1);
    },

    goto: function (newSlide) {
        var oldSlide = this.currentSlide;

        if (newSlide >= 0 & newSlide < this.totalSlides) {
            // change current slide indices
            this.currentSlide = newSlide;
            this.prevSlide = newSlide - 1;
            this.nextSlide = newSlide + 1;

            // null out invalid slide indices
            if (this.prevSlide < 0) this.prevSlide = null;
            if (this.nextSlide < this.totalSlides) this.nextSlide = null;

            // determine direction
            if (oldSlide < newSlide) {
                // slide out to the left and in from the right
                this.slideOutLeft("#"+slideIndexToID(oldSlide));
                this.slideInRight("#"+slideIndexToID(newSlide));

            }  else if (oldSlide > newSlide) {

                // slide out to the right and in from the lefy
                this.slideOutRight("#"+slideIndexToID(oldSlide));
                this.slideInLeft("#"+slideIndexToID(newSlide));

            } else {

                // null op, means we're staying put
                console.log(`(goto)  index the same, staying at slide ${this.currentSlide}`);
            }

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

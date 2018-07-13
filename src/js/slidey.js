"use strict"

import "web-animations-js";
import page from "../../lib/page.js/page";
import "../sass/slideyslides.scss";
import "../../lib/animatelo/dist/animatelo.min";



//import "babel-polyfill";

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
    this.currentSlide = 0;
    this.nextSlide = 1;
    this.prevSlide = null;
    this.totalSlides = null;
    this.loadFrom = false;
    this.parentContainer = false;
    this.startupFadeInTime = SLIDE_STARTUP_FADE_TIME;
    this.slideTimings = [[0, 0.0],[1, 5.2], [2, 6.5], [2.2, 7.4], [3, 8.5]]
    this.slideTimes = this.slideTimings.map((i) => {return i[1]});

    console.log("setup slidey slides");


    /*  if a parent container isn't defined, use the parent of the first
        <section>. if it's a string, use that as a selector. otherwise assume
        that it's an element. */
    if (!this.parentContainer) { // any falsy value
        this.parentContainer = document.querySelector("section").parentElement;
    } else if (typeof (this.parentContainer) == "string") {
        this.parentContainer = document.querySelector(this.parentContainer)
    }

    /* TODO: CREATE A DIV INSIDE THE SLIDEY THAT JUST CONTAINS THE SECTIONS */
    //add the slideshow class to the parent container
    this.parentContainer.classList.add(SLIDESET_CLASS);
    this.parentContainer.parentElement.classList.add(PLAYER_CLASS);
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

            // hide all but current slide
            if (index == this.currentSlide) {
//                section.classList.add("current");

            } else {


            }
        });

        FADE_IN("#"+slideIndexToID(this.currentSlide), {duration: this.startupFadeInTime});

        this.play();
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
                SLIDE_OUT_LEFT("#"+slideIndexToID(oldSlide));
                SLIDE_IN_RIGHT("#"+slideIndexToID(newSlide));




            }  else if (oldSlide > newSlide) {

                // slide out to the right and in from the lefy
                SLIDE_OUT_RIGHT("#"+slideIndexToID(oldSlide));
                SLIDE_IN_LEFT("#"+slideIndexToID(newSlide));


            } else {

                // null op, means we're staying put
                console.log(`(goto)  index the same, staying at slide ${this.currentSlide}`);
            }

        } else {
            console.log(`(goto) invalid index, staying at slide ${this.currentSlide}`);
        }
    },


    load: function (source) {
        if (source[0] == "#") {
            console.log("parse from div");
        } else {
            console.log("load and parse from url");
        }
    },




    slideGoto: function(seconds) {

        // if we're outside the current time navigate to the correct time (and pontential fire a step)
        if (seconds >  this.slideTimes[this.nextSlide] || seconds < this.slideTimes[this.currentSlide]  ) {

            // create a list where slides before the current time are false,  after are true
            var slidesTF = this.slidesTimes.map((slideTime) => {return (slideTime > time )});

            var newSlide = slidesTF.indexOf(false);
            if (newsSlide >  0 ) {
                newslide += -1;
            }
            return newSlide;

        }

        return false;


    }



}


// this is in global scope for the module, but after compilation/etc. will be private to it
function slideIndexToID(index) {
    var slideID = SLIDE_ID_PREFIX + index.toString().padStart(SLIDE_INDEX_DIGITS, "0");
    return slideID;
}


module.exports = slidey;

window.slideIndexToID = slideIndexToID;



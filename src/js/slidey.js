"use strict"
const page = require("../../lib/page.js/page");
//import "babel-polyfill";

const PLAYER_CLASS = "slidey"; // goes on body to activate the page
const SLIDESET_CLASS = "slides";
const SLIDE_ID_PREFIX = "slide-";
const SLIDE_INDEX_DIGITS = 3;

//const slidey = {
//    run: () => { this.setup(); console.log("slide!")},
//    next: () => console.log("next slide"),
//    prev: () => console.log("previous slide"),
//    goTo: (slideNum) => console.log("go to slide " + slideNum),
//    setup: () => console.log("build the dom structure is needed, bind needed elements")
//
//}



var slidey = function (params) {
    // mege the params into here
    this.currentSlide = 0;
    this.totalSlides = 10;
    this.loadFrom = false;
    this.parentContainer = false;
    console.log("setup slidey slides")
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

        /*  if a parent container isn't defined, use the parent of the first
            <section>. if it's a string, use that as a selector. otherwise assume
            that it's an element. */

        if (!this.parentContainer) { // any falsy value
            this.parentContainer = document.querySelector("section").parentElement;
        } else if (typeof(this.parentContainer) == "string") {
            this.parentContainer = document.querySelector(this.parentContainer)
        }


        /* TODO: CREATE A DIV INSIDE THE SLIDEY THAT JUST CONTAINS THE SECTIONS */
        //add the slideshow class to the parent container
        this.parentContainer.classList.add(SLIDESET_CLASS);
        this.parentContainer.parentElement.classList.add(PLAYER_CLASS);


        /*  grab all the sections inside the parent
            */
        var sections = this.parentContainer.querySelectorAll("section");

        // give them ids
        // TODO: deal with nested sections
        sections.forEach((section, index) => {
            // generate id including 0-padded, 0-base index
            // then add it as the id
            var slideID = SLIDE_ID_PREFIX + index.toString().padStart(SLIDE_INDEX_DIGITS,"0");
            section.setAttribute("id", slideID);
        });



        this.play();
    },


    play: function () {
        console.log("start a new or paused slideshow")
    },

    pause: function () {
        console.log("pause slidey slide")
    },

    next: function () {
        this.currentSlide += 1;
        console.log(`(next) go to slide ${this.currentSlide}`);
    },

    next: function () {
        this.currentSlide += 1;
        if (this.currentSlide > (this.totalSlides - 1)) {
            this.currentSlide = this.totalSlides - 1;
        }
        console.log(`(next) go to slide ${this.currentSlide}`);
    },

    prev: function () {
        this.currentSlide += -1;
        if (this.currentSlide < 0) {
            this.currentSlide = 0;
        }
        console.log(`(previous) go to slide ${this.currentSlide}`);
    },

    goto: function (index) {
        if (index >= 0 & index < this.totalSlides) {
            this.currentSlide = index;
            console.log(`(goto) go to slide ${this.currentSlide}`);
        }  else {
            console.log(`(goto) invalid index, staying at slide ${this.currentSlide}`);
        }
    },

    load: function(source) {
        if( source[0] == "#") {
            console.log("parse from div");
        } else {
            console.log("load and parse from url");
        }
        this.go();
    },



}


module.exports = slidey;

"use strict"

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
    console.log("setup slidey slides")
}

slidey.prototype = {

    run: function () {
        if (this.loadFrom != false) {
            this.load(this.loadFrom);
        }
        console.log("run slidey slide")
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
    },



}

export function slidey (params) {
    return slidey(params);
}

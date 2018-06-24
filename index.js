"use strict";

//// simple code to calculate height offset for each section element
//var slideHeight = document.getElementsByClassName("slides")[0].offsetHeight;
//
//var sections = document.getElementsByTagName("section");
//for (section in sections) {
//    console.log(section);
//    var secHeight = section.offsetHeight;
//    var secOffset = (slideHeight - secHeight)/2;
//    if (secOffset < 1) { secOffset = 0}
//    section.style.top = secOffset+"px"
//}

console.log("slidey");

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
    console.log("setup slidey slides")
}

slidey.prototype = {

    run: function () {
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


}

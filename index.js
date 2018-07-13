"use strict";
const slidey = require("./src/js/slidey.js")


var slideshow = new slidey({});

console.log(slidey);
console.log(slideshow);

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


//slideshow.run();
//slideshow.load("");
//
//
//slideshow.next();
//slideshow.next();
//slideshow.prev();
//slideshow.prev();
//slideshow.next();
//
//
//
//slideshow.pause();
//
//slideshow.goto(0);
//slideshow.goto(4);
//slideshow.goto(1);



console.log(slidey);

window.slideshow = slideshow;
window.slidey = slidey;



module.exports = {
    slideshow: slideshow,
    slidey: slidey,
}





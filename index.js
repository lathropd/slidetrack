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


slideshow.run();
slideshow.load("");

setTimeout(() =>slideshow.next(), 1000);
setTimeout(() =>slideshow.next(), 3000);
setTimeout(() =>slideshow.next(), 6000);
setTimeout(() =>slideshow.prev(), 8500);
setTimeout(() =>slideshow.prev(), 11000);
setTimeout(() =>slideshow.next(), 15000);
setTimeout(() => slideshow.goto(0), 16000);
setTimeout(() => slideshow.goto(0), 20000);
setTimeout(() => slideshow.goto(4), 24000);
setTimeout(() => slideshow.goto(1), 28000);

slideshow.pause();


;
;



console.log(slidey);

window.slideshow = slideshow;
window.slidey = slidey;



module.exports = {
    slideshow: slideshow,
    slidey: slidey,
}





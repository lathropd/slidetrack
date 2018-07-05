"use strict";
const slidey = require("./src/js/slidey.js")
import "./src/sass/slideyslides.scss";
import "./lib/animate.css/animate.css";


var slideshow = new slidey({});


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


slideshow.next();
slideshow.next();
slideshow.prev();
slideshow.prev();
slideshow.next();



slideshow.pause();

slideshow.goto(0);
slideshow.goto(4);
slideshow.goto(1);



console.log(slidey);

module.exports = {
    slideshow: slideshow,
    slidey: slidey,
}






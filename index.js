"use strict";

//const page = require("page");
//const slidey =  require("./src/js/slidey");
//import "./src/sass/slideyslides.scss";
//import "./src/js/slidey";


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
slideshow.prev();
slideshow.goto(4);
slideshow.pause();


console.log(slidey);

window.slidehsow = slideshow;

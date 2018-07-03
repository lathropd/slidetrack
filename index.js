"use strict";
const slidey = import("./src/js/slidey.js");

const page = require("page");
import "./src/sass/slideyslides.scss";


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

console.log(page);
console.log("slidey");

console.log(slidey)

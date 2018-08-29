"use strict";
const slidey = require("./src/js/slidey.js")


function iframelyPlugin(slide) {
    var links = slide.querySelectorAll("a.embed");
    links.forEach((link) => iframely.load(link));
}


function embedlyPlugin(slide) {
   embedly('card', {selector: 'a.embed'});
}

var slideshow = new slidey({
    plugins: [embedlyPlugin]
});
console.log(slideshow.parentContainer);

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

slideshow.load("#slidecode");

slideshow.run();

//setTimeout(() =>slideshow.next(), 1000);
//setTimeout(() =>slideshow.next(), 3000);
//setTimeout(() =>slideshow.next(), 6000);
//setTimeout(() =>slideshow.prev(), 8500);
//setTimeout(() =>slideshow.prev(), 11000);
//setTimeout(() =>slideshow.next(), 15000);
//setTimeout(() => slideshow.goto(0), 17000);
//setTimeout(() => slideshow.goto(0), 20000);
//setTimeout(() => slideshow.goto(4), 24000);
//setTimeout(() => slideshow.goto(1), 28000);

//slideshow.pause();


;
;



console.log(slidey);

window.slideshow = slideshow;
window.slidey = slidey;
//window.embedza = new Embedza();


module.exports = {
    slideshow: slideshow,
    slidey: slidey,
}





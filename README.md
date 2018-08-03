# SlideySlides

`SlideySlides` is  librry and presentation tool for telling stories one screen at a time.

It's especially optimized for adding a visual "track" to longform audio storyeliing of the kind done by [Reveal](https://www.revealnews.org/) and [APM Reports](https://www.apmreports.org/). 

It's based heavily on a storyboard metaphor and inspred heavily by [reveal.js](https://revealjs.com/).

## Dependencies
- [Page.js](https://visionmedia.github.io/page.js/) for routing. It's a bit heavy, and could probably be swapped out later
   - Used instead of [Backbone.js](http://backbonejs.org/)  bececause we only wanted the [router](http://backbonejs.org/#Router)
- Probably need to use something for DOM manipulation...
- [bideo.js](https://github.com/rishabhp/bideo.js) fill a container with autoplaying background video
- [web-animations-js](https://www.npmjs.com/package/web-animations-js) a polyfill for adding web animations API support
- [Animatelo](https://github.com/gibbok/animatelo) animate.css ported to the web animations api
- [EasyTimer.js](https://albert-gonzalez.github.io/easytimer.js/) for timing independent of a playing media file
- [wavesurfer.js](https://wavesurfer-js.org/) for a really cool audio player

## Potentially useful tools:
- [vivify](https://github.com/Martz90/vivify) css animations library (57.2kb minified)
- [Sparks](https://aftertheflood.com/projects/sparks/) sparkline typeface
- [animate.css](https://github.com/daneden/animate.css) animations (because it seems to do everything)
- [Emergence.js](https://github.com/xtianmiller/emergence.js) does stuff when elements appear in the browser
- [AnimateMate](http://animatemate.com/) make keyframed animations inside Sketch
- [repaintless](https://github.com/szynszyliszys/repaintless) css transitions library that only uses things that don't require repainting... so smoother, faster (10kb)
- [Shave](https://dollarshaveclub.github.io/shave/) text truncation library
- [mo.js](http://mojs.io/) motion graphics library ... probably something for another day

## Information to use in the design

- [Mozilla documentation on keeping load times fast](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Author_fast-loading_HTML_pages)
- [Brief, not great explanation of why a file should ideally be 14kb or less](https://tylercipriani.com/blog/2016/09/25/the-14kb-in-the-tcp-initial-window/)


## Zepto/jQuery

Looked at them. Parcel bundles them in and does a worse job with minification. Put Zepto in `./lib` as a potential dependency where I can build just the things I want. But... Probably can avoid it.
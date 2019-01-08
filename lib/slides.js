'use strict'
const WaveSurfer = require("wavesurfer") // TODO: not working with mr dependency manager
const throttle = require('lodash/throttle')

let Slides = function (params) {
  let defaults = { 
    // the ALL CAPS VARIABLES ARE BELOW THE REST OF THE CODE
    player: PLAYER_ID,
    slideset: SLIDESET_CLASS,
    slidePrefix: SLIDE_ID_PREFIX,
    slideDigits: SLIDE_INDEX_DIGITS,
    transitionTime: SLIDE_TRANSITION_TIME,
    transitionConfig: SLIDE_TRANSITION_CONFIG,
    animateIn: ANIMATE_IN_FW,
    animateOut: ANIMATE_OUT_FW,
    animateBackIn: ANIMATE_IN_BW,
    animateBackOut: ANIMATE_OUT_BW,
    audioPlayer: WaveSurfer.create(Object.assign(WAVESURFER_SETTINGS, params.wavesurfer)),
    audio: 'default.mp3' // TODO: this will need to be actually useful
  }
  this.settings = Object.assign(defaults, params)
  this.slides = Array.from(document.getElementsByClassName(this.settings.slideset))
    .filter(s => s.dataset.index)
    .map(s => {
      // turn the index into an array second, minutes, hours, days, etc
      let indices = s.dataset.index.split(':').reverse()
      indices.push(0, 0, 0)
      // calculate an offset in seconds from seconds, minutes, hours
      s.dataset.offset = Number(indices[0]) + Number(indices[1]) * 60 + Number(indices[2]) * 60 * 60
      return s
    })
    .sort((s1, s2) => +s1.dataset.offset - +s2.dataset.offset) // sort in seconds
  this.offsets = this.slides.map(s => Number(s.dataset.offset))
  this.currentSlide = 0
  this.player = this.settings.audioPlayer
  delete this.settings.audioPlayer
  this.player.on('audioprocess', throttle(() => this.updateSlide(), 10))
  this.settings.animateIn(this.slides[this.currentSlide])
  // use data attributes to set backgrounds
  // note the use of backgrounds on divs in our templates
  // to trick the system into makeing cool images
  document.querySelectorAll("[data-background-image]").forEach( el => el.style["background-image"] = `url(${el.dataset.backgroundImage})`)
  document.querySelectorAll("[data-background-color]").forEach( el => el.style["background-color"] = `url(${el.dataset.backgroundColor})`)
  return this
}

Slides.prototype.updateSlide = function () {
  let currentTime = this.player.getCurrentTime()
  // console.log(currentTime)
  // the index of the first slide with a higher index
  // than the current time 
  let nextSlide = this.offsets.findIndex(offset => offset > currentTime)
  if (nextSlide == -1) {
    nextSlide = this.offsets.length
  }
  // go back one to find what should be the current slide
  let correctSlide = nextSlide - 1
  // if the correct slide isn't displaying is, fade it in
  // TODO left/right
  if (correctSlide != this.currentSlide) {
    this.navigateToSlide(correctSlide)
  }
}

Slides.prototype.navigateToSlide = function (newIndex) {  
  let oldIndex = this.currentSlide
  let oldSlide = this.slides[oldIndex]
  let newSlide = this.slides[newIndex]
  if (newIndex > oldIndex) {
    this.settings.animateOut(oldSlide)
    this.settings.animateIn(newSlide)
    console.log('move forward to', newIndex)
  } else if (newIndex < oldIndex) {
    this.settings.animateBackOut(oldSlide)
    this.settings.animateBackIn(newSlide)
    console.log('move backward to', newIndex)
  }
  this.currentSlide = newIndex
}

/******************************************************************************/
// constants

const PLAYER_ID = 'slidetrack'; // goes on body to activate the page
const SLIDESET_CLASS = 'slide';
const SLIDE_ID_PREFIX = 'slide-';
const SLIDE_INDEX_DIGITS = 3
const SLIDE_TRANSITION_TIME = 500
const SLIDE_TRANSITION_CONFIG = {
  duration: SLIDE_TRANSITION_TIME,
  easing: 'ease-out'

}

// taking animatelo dependency out, so these are non-working for now
const ANIMATE_IN = function (element, parent) {
  var a = element.animate([{ opacity: 0 }, { opacity: 1 }], SLIDE_TRANSITION_CONFIG)
  a.onfinish = () => { element.style.opacity = 1.0; element.style.zIndex = 1}

  element.classList
}

const ANIMATE_OUT = function (element, parent) {
  var a = element.animate([{ opacity: 1 }, { opacity: 0 }], SLIDE_TRANSITION_CONFIG)
  a.onfinish = () => { element.style.opacity = 0.0; element.style.zIndex = -1}
  //    parent.removeChild(element);
}

// increasing index
const ANIMATE_IN_BW = function (element, parent) {
  var a = element.animate([{ left: '-100%', opacity: 1.0 }, { left: 0, opacity: 1.0 }], SLIDE_TRANSITION_CONFIG)
  a.onfinish = () => { element.style.opacity = 1.0; element.style.zIndex = 1}
}

// decreasing index
const ANIMATE_IN_FW = function (element, parent) {
  var a = element.animate([{ left: '100%', opacity: 1.0 }, { left: 0, opacity: 1.0 }], SLIDE_TRANSITION_CONFIG)
  a.onfinish = () => { element.style.opacity = 1.0; element.style.zIndex = 1}
}

// increasing index
const ANIMATE_OUT_BW = function (element, parent) {
  var a = element.animate([{ left: 0 }, { left: '100%' }], SLIDE_TRANSITION_CONFIG)
  a.onfinish = () => { element.style.opacity = 0.0; element.style.zIndex = -1}
  //    parent.removeChild(element);
}

// decreasing index
const ANIMATE_OUT_FW = function (element, parent) {
  var a = element.animate([{ left: 0 }, { left: '-100%' }], SLIDE_TRANSITION_CONFIG)
  a.onfinish = () => { element.style.opacity = 0.0; element.style.zIndex = -1}
}
const WAVESURFER_SETTINGS = {
  container: '#player',
  waveColor: 'violet',
  progressColor: 'purple'
}

module.exports = Slides
'use strict'
const WaveSurfer = require("wavesurfer") // TODO: not working with mr dependency manager


let slides = function(params) {
  let defaults = { 
    // the ALL CAPS VARIABLES ARE BELOW THE REST OF THE CODE
    player: PLAYER_ID,
    slideset: SLIDESET_CLASS,
    slidePrefix: SLIDE_ID_PREFIX,
    slideDigits: SLIDE_INDEX_DIGITS,
    transitionTime: SLIDE_TRANSITION_TIME,
    transitionConfig: SLIDE_TRANSITION_CONFIG,
    animateIn: ANIMATE_IN,
    animateOut: ANIMATE_OUT,
    animateBackIn: ANIMATE_IN_BW,
    animateBackOut: ANIMATE_OUT_BW,
    audioPlayer: WaveSurfer.create(Object.assign(WAVESURFER_SETTINGS, params.wavesurferSettings)),
    audio: 'default.mp3' // TODO: this will need to be actually useful
  }

  this.settings = Object.assign(defaults, params)
  return this
}

/******************************************************************************/
// constants

const PLAYER_ID = 'slidetrack'; // goes on body to activate the page
const SLIDESET_CLASS = 'slides';
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
  a.onfinish = () => { element.style.opacity = 1.0; element.style.zIndex = 1000}

  element.classList
}

const ANIMATE_OUT = function (element, parent) {
  var a = element.animate([{ opacity: 1 }, { opacity: 0 }], SLIDE_TRANSITION_CONFIG)
  a.onfinish = () => { element.style.opacity = 0.0; element.style.zIndex = -1000}
  //    parent.removeChild(element);
}

// increasing index
const ANIMATE_IN_BW = function (element, parent) {
  var a = element.animate([{ left: '-100%', opacity: 1.0 }, { left: 0, opacity: 1.0 }], SLIDE_TRANSITION_CONFIG)
  a.onfinish = () => { element.style.opacity = 1.0; element.style.zIndex = 1000}
}

// decreasing index
const ANIMATE_IN_FW = function (element, parent) {
  var a = element.animate([{ left: '100%', opacity: 1.0 }, { left: 0, opacity: 1.0 }], SLIDE_TRANSITION_CONFIG)
  a.onfinish = () => { element.style.opacity = 1.0; element.style.zIndex = 1000}
}

// increasing index
const ANIMATE_OUT_BW = function (element, parent) {
  var a = element.animate([{ left: 0 }, { left: '100%' }], SLIDE_TRANSITION_CONFIG)
  a.onfinish = () => { element.style.opacity = 0.0; element.style.zIndex = -1000}
  //    parent.removeChild(element);
}

// decreasing index
const ANIMATE_OUT_FW = function (element, parent) {
  var a = element.animate([{ left: 0 }, { left: '-100%' }], SLIDE_TRANSITION_CONFIG)
  a.onfinish = () => { element.style.opacity = 0.0; element.style.zIndex = -1000}
}

module.exports = slides
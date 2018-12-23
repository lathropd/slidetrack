'use strict'
// const waversurfer = require("./lib/wavesurfer")
const slides = require('./lib/slides') // slideshow related functions
const marky = require('./lib/markymarkup') // markup related functions
const nunjucks = require('nunjucks')

const slidetrack = function (params) {
  this.waversurfer = waversurfer // figure this later
  this.slides = new slides(params)
  this.scaffold = () => scaffold(params.player, content)
  this.convert = marky.convert
}

// bootstraping functions

function scaffold (playerSelector, content) {
  let slides
  // if content is passed as a string
  if (typeof content === 'string')  {
    // try it as a query selector
    let contentElement = document.querySelector(content)
    // if it is, look for section tags
    if (typeof contentElement !== null) {
      if (typeof contentElement.querySelector('section') !== null) {
        // if so, that element be our slides
        slides = contentElement.innerHTML
      } else {
        // otherwise use its innerHTML to create the slides
        slides = marky.convert(contentElement.innerHTML)
      }
    } else {
      // use non-selector strings as the html
      slides = marky.convert(content)
    }
  }
  let player = document.querySelector(playerSelector)
  if (player === null) {
    player = document.createElement("div")
    player.id =  'slidetrackPlayer' + Date.now()
    playerSelector = '#' + player.id
    player = document.body.append() // TODO: force it to match the selector info
  }
  player.innerHTML = nunjucks.render('templates/player.njk', {content: slides})
  return true
}

if (window) {
  window.slidetrack = slidetrack
}

exports.module = slidetrack

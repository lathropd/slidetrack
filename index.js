'use strict'
// const waversurfer = require("./lib/wavesurfer") // TODO: not working with mr dependency manager
const slides = require('./lib/slides') // slideshow related functions
const marky = require('./lib/markymarkup') // markup related functions
const nunjucks = require('nunjucks')

const slidetrack = function (params) {
  this.waversurfer = waversurfer // TODO: figure this out later for now should work if waversurfer is already loaded
  this.slides = new slides(params)
  this.scaffold = () => scaffold(params)
}

// bootstraping functions

function scaffold (params) {
  let player = document.querySelector('#' + params.player)
  if (player === null) {
    player = document.createElement("div")
    player.id = params.player
    player = document.body.append() // TODO: force it to match the selector info
  }
  player.innerHTML = nunjucks.render('templates/player.njk') // replace this with an inline string later
  return true
}

if (window) {
  window.slidetrack = slidetrack
}

exports.module = slidetrack

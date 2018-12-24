'use strict'
const slides = require('./lib/slides') // slideshow related functions
const marky = require('./lib/markymarkup') // markup related functions
const nunjucks = require('nunjucks')

const slidetrack = function (params) {
  this.slides = new slides(params)
  if (params.scaffold) {
    params.player = scaffold(params)
  }
  return this
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
  return player.id
}

if (window) {
  window.slidetrack = slidetrack
}

exports.module = slidetrack

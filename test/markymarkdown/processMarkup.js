'use strict'

const chai = require('chai')
const assert = chai.assert
const describe = chai.describe
const it = chai.it
const marky = require('../../lib/markymarkup')
const fs = require('fs')

// read the example files into an object
let exampleFiles = {}
fs.readdirSync('../exampleFiles', { withFileTypes: true })
  .filter(entry => entry.isFile)
  .forEach(entry => {
    exampleFiles[entry.name] = fs.readFileSync('../exampleFiles' + entry.name)
  })

// begin describing the functions
describe('', function () {

})

'use strict'

const chai = require('chai')
const assert = chai.assert
const marky = require('../lib/markymarkup')
const fs = require('fs')

// read the example files into an object
let exampleFiles = {}
fs.readdirSync('test/exampleFiles/', { withFileTypes: true })
  .filter(entry => entry.isFile)
  .forEach(entry => {
    exampleFiles[entry.name] = fs.readFileSync('test/exampleFiles/' + entry.name, 'utf8')
  })

// begin describing the functions
describe('renderBody', function () {
  it('should return bare paragraphs in <p> tags', function () {
    let lorem = marky.renderBody(exampleFiles['loremipsum.txt'])
    assert.equal(lorem, exampleFiles['loremipsum.html'])

  })

})

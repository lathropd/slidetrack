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

  it('should render single line YAML heds', function () {
    assert.equal(marky.renderBody('hed: test a headline'), '<h1 class="hed">test a headline</h1>')
  })
  
  it('should render single line HTML heds', function () {
    assert.equal(marky.renderBody('<h1>test a headline</h1>'),'<h1>test a headline</h1>')
  })

  it('should render a pair of YAMLs', function () {
    assert.equal(marky.renderBody('hed: hed\ndek: dek'), '<h1 class="hed">hed</h1>\n<h2 class="dek">dek</h2>')
  })

  it('should render a mixture of YAML and bare grafs', function () {
    assert.equal(exampleFiles['loremmixed.html'], marky.renderBody(exampleFiles['loremmixed.txt']))
  })

})

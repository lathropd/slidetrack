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

// the function used to render section bodies
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
    assert.equal(marky.renderBody(exampleFiles['loremmixed.txt']), exampleFiles['loremmixed.html'])
  })
})

// the function used to parse individual markymarkup sections into data
describe('parseSection', function () {
  let testText = exampleFiles['section1.txt']
  let testResult = marky.parseSection(testText)
  let expectedResult = JSON.parse(exampleFiles['section1.json'])

  it('should correctly generate a content attribute', function () {
    assert(testResult.content, expectedResult.content)
  })

  it('should preserve the markymarkup as a "text" attribute', function () {
    assert(testResult.text, expectedResult.text)
  })

  it('should correctly create the data elements', function () {
    assert(testResult.data.index, expectedResult.data.index)
    assert(testResult.data.title, expectedResult.data.title)
    assert(testResult.data.template, expectedResult.data.template)
    assert(testResult.data.meta, expectedResult.data.meta)
  })
})

// the function used to render individual sections from markymarkup
describe('renderSection', function () {

})

// the function used to render the markymarkup into html
describe('convert', function () {

})

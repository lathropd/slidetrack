'use strict'

const chai = require('chai')
const assert = chai.assert
const allMatches = require('../lib/markymarkup').allMatches

// demo tests from https://www.sitepoint.com/unit-test-javascript-mocha-chai/

describe('allMatches', function () {
  it('should return all the matches', function () {
    let matches = allMatches(/./g, 'abcde')
    assert.equal(matches.length, 5)
    assert.equal(matches[1][0], 'b')
  })

  it('should convert a non-global regex to a global one', function () {
    let matches = allMatches(/./, 'abcde')
    assert.equal(matches.length, 5)
    assert.equal(matches[1][0], 'b')
  })
})

"use strict"

const chai = require("chai")
const assert = chai.assert;

// demo tests from https://www.sitepoint.com/unit-test-javascript-mocha-chai/

describe('Array', function() {
  it('should start empty', function () {
    var arr = new Array();

    assert.equal(arr.length, 0);
    assert.equal(arr.toString(), "");
  });
});







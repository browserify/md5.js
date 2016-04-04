'use strict'
var test = require('tape').test
var vectors = require('hash-test-vectors')

var MD5 = require('../')

vectors.forEach(function (vector, i) {
  var input = new Buffer(vector.input, 'base64')

  test('vector #' + (i + 1) + ' with .update', function (t) {
    t.same(new MD5().update(input).digest('hex'), vector.md5)
    t.end()
  })

  test('vector #' + (i + 1) + ' with streams', function (t) {
    var hash = new MD5()
    hash.end(input)
    t.same(hash.read().toString('hex'), vector.md5)
    t.end()
  })
})

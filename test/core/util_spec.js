/**
 * Utility function tests
 *
 * Copyright (C) 2011 Nikolay Nemshilov
 */
var

vows   = require('vows'),
assert = require('assert'),
util   = require('util'),

LeftJS = require('../left').LeftJS;

vows.describe('Core Utils').addBatch({
  "ext(a,b)": {
    topic: function() { return LeftJS.ext; },

    'should extend one object with another': function(ext) {
      var a = {a: 1}, b = {b: 2}, c = ext(a, b);
      assert.deepEqual({a:1, b:2}, c);
      assert.equal(a, c);
    },

    "should accept 'null' as the second argument": function(ext) {
      assert.deepEqual({a: 1}, ext({a: 1}, null));
    },

    "should accept 'undefined' as the second argument": function(ext) {
      assert.deepEqual({a: 1}, ext({a: 1}, undefined));
    }
  },

  "isString(value)": assertTypeCheck('isString', {
    ok:   [''],
    fail: [1, 2.2, null, undefined, true, false, {}, function() {}]
  }),

  "isNumber(value)": assertTypeCheck('isNumber', {
    ok:   [1, 2.2],
    fail: ['11', '2.2', true, false, null, undefined, [], {}, function() {}]
  }),

  "isFunction(value)": assertTypeCheck('isFunction', {
    ok:   [function() {}, new Function('return 1')],
    fail: ['', 1, 2.2, true, false, null, undefined, [], {}]
  }),

  "isArray(value)": assertTypeCheck('isArray', {
    ok:   [[], new Array()],
    fail: ['', 1, 2.2, true, false, null, undefined, {}, function() {}]
  }),

  "isObject(value)": assertTypeCheck('isObject', {
    ok:   [{}, new Object],
    fail: ['', 1, 2.2, true, false, null, undefined, [], function() {}]
  })

}).export(module);

/**
 * A shortcut for the type check functions testing
 *
 * @param {String} function name
 * @param {Object} okays and fails
 * @return void
 */
function assertTypeCheck(name, options) {
  return {
    topic: function() { return LeftJS[name]; },

    "should return 'true' for correct values": function(method) {
      for (var i=0; i < options.ok.length; i++) {
        assert.isTrue(method(options.ok[i]), "Fails with: "+ util.inspect(options.ok[i]));
      }
    },

    "should return 'false' for wrong values": function(method) {
      for (var i=0; i < options.fail.length; i++) {
        assert.isFalse(method(options.fail[i]), "Fails with: "+ util.inspect(options.fail[i]));
      }
    }
  }
}
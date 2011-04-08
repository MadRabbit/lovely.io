/**
 * The magic list of LeftJS
 *
 * The goal in here is to provide a quick, steady and inheritable
 * JavaScript 1.7 Array like interface with some additional
 * features, so that we could iterate through anything in a civilize
 * maner without tempering with the JavaScript core.
 *
 * Copyright (C) 2011 Nikolay Nemshilov
 */
var List = new Class(Array, {
  length: 0,

  /**
   * Basic constructor
   *
   * @param {mixed} iterable list
   * @return void
   */
  initialize: function(items) {
    Array_proto.splice.apply(this, [0,0].concat(A(items)));
  },

  /**
   * Returns the first items on the list
   *
   * @return {mixed} the first item or `undefined`
   */
  first: function() {
    return arguments.length === 0 ? this[0] :
      this.filter.apply(this, arguments).first();
  },

  /**
   * Returns the last item on the list
   *
   * @return {mixed} the last item or `undefined`
   */
  last: function() {
    return arguments.length === 0 ? this[this.length - 1] :
      this.filter.apply(this, arguments).last();
  },

  /**
   * Returns the size of the list
   *
   * @return {Number} list size
   */
  size: function() {
    return this.length;
  },

  /**
   * The standard `forEaech` equivalent
   *
   * @param {mixed} method name or a callback function
   * @param {mixed} scope object or the method param
   * @return {List} this
   */
  each: function() {
    List_call(Array_proto.forEach, this, arguments);
    return this;
  },

  /**
   * Maps the result of the callback function work into
   * a new {List} object
   *
   * @param {mixed} method name or a callback function
   * @param {mixed} scope object or the method param
   * @return {List} new
   */
  map: function() {
    return new List(List_call(Array_proto.map, this, arguments));
  },

  /**
   * Creates a new list that has only matching items in it
   *
   * @param {mixed} method name or a callback function
   * @param {mixed} scope object or the method param
   * @return {List} new
   */
  filter: function() {
    return new List(List_call(Array_proto.filter, this, arguments));
  },

  /**
   * Creates a new list that has no matching items in it
   *
   * @param {mixed} method name or a callback function
   * @param {mixed} scope object or the method param
   * @return {List} new
   */
  reject: function() {
    return new List(List_call(Array_reject, this, arguments));
  },

  /**
   * Creates a new list without the specified items
   *
   * @param {mixed} item
   * .....
   * @return {List} new
   */
  without: function() {
    var filter = A(arguments);
    return this.reject(function(item) {
      return filter.indexOf(item) !== -1;
    });
  },

  /**
   * Creates a new list that doesn't have 'null' and 'undefined' values
   *
   * @return {List} new
   */
  compact: function() {
    return this.without(null, undefined);
  },

  /**
   * Clones the list with all the internal data
   *
   * @return {List} new
   */
  clone: function() {
    return new List(A(this));
  },

  /**
   * Converts the list into an instance or {Array}
   *
   * @return {Array} new
   */
  toArray: function() {
    return A(this);
  },

  /**
   * Debugability improver
   *
   * @return {String} representation
   */
  toString: function() {
    return '#<List ['+ A(this) +']>';
  }
});


// private
var Array_proto = Array.prototype;

function Array_reject(callback, scope) {
  return Array_proto.filter.call(this, function() {
    return !callback.apply(scope, arguments);
  });
}

// calls the array method on the list with the arguments
function List_call(method, list, args) {
  return method.apply(list, args);
}
#
# The `Window` wrapper unit tests
#
# Copyright (C) 2011 Nikolay Nemshilov
#
require '../test_helper'

load_window = ->
  load "/test.html", this, (dom)->
    new dom.Window(this.window)


describe 'Window', module,
  'constructor':
    topic: load_window

    "should make an instance of 'Window' class": (window)->
      assert.instanceOf window, this.Window

    "should refer to the original window via '_'": (window)->
      assert.same window._, this.window

  '#window':
    topic: load_window

    "should return itself with this method": (window)->
      assert.same window.window(), window

  '#size':
    "\b()":
      topic: load_window

      "should return the window sizes in a hash": (window)->
        assert.deepEqual window.size(), x: 1024, y: 768

    "\b(x:NNN, y:NNN)":
      topic: load_window

      "should set the new window inner size": (window)->
        size_x = []; size_y = []

        window._.resizeTo = (x, y) ->
          size_x.push(x); size_y.push(y)

        window.size x: 800, y: 600

        assert.equal size_x[0], 800
        assert.equal size_y[0], 600

        assert.equal size_x[1], 2 * 800 - 1024
        assert.equal size_y[1], 2 * 600 - 768

      "should return the window object itself back": (window)->
        assert.same window.size(100, 200), window

  "#scrolls":
    "\b()":
      topic: load_window

      "should return the current scrolling position": (window) ->
        assert.deepEqual window.scrolls(), x: 0, y: 0

    "\b(x:NNN, y:NNN)":
      topic: load_window

      "should assign new scrolling position": (window) ->
        pos_x = null; pos_y = null

        window._.scrollTo = (x,y)->
          pos_x = x; pos_y = y

        window.scrolls x: 100, y: 200

        assert.equal pos_x, 100
        assert.equal pos_y, 200

      "should accept just one direction": (window)->
        pos_x = null; pos_y = null

        window._.scrollTo = (x,y)->
          pos_x = x; pos_y = y

        window.scrolls x: 100

        assert.equal pos_x, 100
        assert.equal pos_y, 0

        window.scrolls y: 200

        assert.equal pos_x, 0
        assert.equal pos_y, 200

      "should work with two-number calls": (window) ->
        pos_x = null; pos_y = null

        window._.scrollTo = (x,y)->
          pos_x = x; pos_y = y

        window.scrolls 300, 400

        assert.equal pos_x, 300
        assert.equal pos_y, 400

      "should return the window reference back": (window)->
        assert.same window.scrolls(x:100), window

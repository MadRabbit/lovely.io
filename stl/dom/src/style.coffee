#
# Custom wrapper for the `STYLE` elements
#
# Copyright (C) 2012 Nikolay Nemshilov
#

class Style extends Element

  #
  # Basic constructor
  #
  # @param {Object} options
  # @return {Style} this
  #
  constructor: (options)->
    super 'style', type: 'text/css'

    options or= {}

    if typeof(options.html) is 'string'
      @_.appendChild document.createTextNode(options.html)

    return @



Style.include = Element.include
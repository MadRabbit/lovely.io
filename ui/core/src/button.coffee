#
# A generic ui-button class
#
# Copyright (C) 2012 Nikolay Nemshilov
#
class Button extends Input

  #
  # Basic constructor, can receive some additional HTML options
  #
  # @param {String} caption
  # @param {Object} options
  # @return {Button} self
  #
  constructor: (html, options)->
    options          or= {}
    options.html     or= html
    options.type     or= 'button'
    options['class'] or= ''
    options['class']  += ' lui-button'

    super('button', options)
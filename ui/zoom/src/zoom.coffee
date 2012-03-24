#
# Project's main unit
#
# Copyright (C) 2012 Nikolay Nemshilov
#
class Zoom extends Modal
  include: Options
  extend:
    Options: # default options
      nolock:     true
      fxDuration: 'normal'

  #
  # Default constructor
  #
  # @param {Object} options
  # @return {Zoom} self
  #
  constructor: (options)->
    @$super(options).addClass('lui-zoom')

    @locker = new Locker()
    @icon   = new Element('i', title: 'Close')
    @image  = new Element('img')
    @dialog = @first('.lui-inner').append(@icon, @image)

    @icon.on('click', => @hide())

    Element.prototype.insert.call(@, @locker)

  #
  # Downloads and shows the image from the link
  #
  # @param {Element} link
  # @return {Zoom} self
  #
  show: (link)->
    @setOptions(link.data('zoom')).addClass('lui-modal-nolock')

    @dialog.style('display: none')

    super() # needs to be done _before_ the @locker resize calls

    if @thumb = link.first('img')
      @locker.show().position(@thumb.position()).size(@thumb.size())

    @image = @image.clone().insertTo(@image, 'instead').attr('src', null)
    @image.on('load', =>@loaded()).attr('src', link.attr('href'))

    return @

# private

  #
  # Handles the image-load events
  #
  loaded: ->
    @dialog.style('display: inline-block; opacity: 0')

    @[if @options.nolock is true then 'addClass' else 'removeClass']('lui-modal-nolock')

    if @thumb && @options.fxDuration
      @zoom()
    else
      @dialog.style(opacity: 1)

    @locker.hide()

  #
  # Makes the smooth zoom visual effect
  #
  zoom: ()->
    start_pos  = @thumb.position()
    start_size = @thumb.size()

    end_size   = @dialog.size()
    end_pos    = @dialog.position()

    @dialog.style(position: 'absolute').size(start_size).position(start_pos)
    @image.style width: '100%', height: '100%'

    pos_diff = @dialog.style('top,left')
    pos_diff = x: parseInt(pos_diff.left), y: parseInt(pos_diff.top)

    @dialog.style(opacity: 1).animate({
      top:     pos_diff.y + (end_pos.y - start_pos.y) + 'px'
      left:    pos_diff.x + (end_pos.x - start_pos.x) + 'px'
      width:   end_size.x + 'px'
      height:  end_size.y + 'px'
    }, duration: @options.fxDuration, finish: =>
      @image.style(width: '', height: '')
      @dialog.style(top: '', left: '', width: '', height: '')
      @dialog.style(position: 'relative')
    )

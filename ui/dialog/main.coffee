#
# Dialog main file
#
# Copyright (C) 2012 Nikolay Nemshilov
#

# hook up dependencies
core    = require('core')
$       = require('dom')
UI      = require('ui')
Ajax    = require('ajax')

# local variables assignments
ext     = core.ext
Class   = core.Class
Element = $.Element

# glue in your files
include 'src/dialog'
include 'src/alert'

# export your objects in the module
exports = ext Dialog,
  version: '%{version}'
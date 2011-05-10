#
# The syntax sugar for the 'dom' module of Lovely IO
#
# Copyright (C) 2011 Nikolay Nemshilov
#
Lovely ['dom', 'lang'], ($, lang) ->

  include 'src/element'
  include 'src/string'

  {version: '%{version}'}
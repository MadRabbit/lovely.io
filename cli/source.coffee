#
# This module handles source code compilation
# for a standard project
#
# Copyright (C) 2011 Nikolay Nemshilov
#
fs   = require('fs')
path = require('path')

#
# Builds the actual source code of the current project
#
# @param {String} package directory root
# @return {String} raw source code
#
compile = (directory)->
  directory or= process.cwd()

  options = require('./package').read(directory)
  format  = path.existsSync("#{directory}/main.coffee")
  format  = if format then 'coffee' else 'js'
  source  = fs.readFileSync("#{directory}/main.#{format}").toString()

  # inserting the related files
  source = source.replace /(\n([ \t]*))include[\(| ]+['"](.+?)['"][\)]*/mg,
    (m, start, spaces, filename) ->
      start + fs.readFileSync("#{directory}/#{filename}.#{format}")
      .toString().replace(/($|\n)/g, '$1'+spaces) + "\n\n"

  # converting coffee into javascript if needed
  if format is 'coffee'
    source = require('coffee-script').compile(source, {bare: true})

    # fixing coffee's void(0) hack back to `undefined`
    source = source.replace(/([^a-z0-9\_]+)void\s+0([^a-z0-9]+)/ig, '$1undefined$2')

  # adding the package dependencies
  source = source.replace('%{version}', options.version)

  # creating a standard AMD layout
  if options.name is 'core' # core doesn't use AMD
    source = """
    (function(undefined) {
      var global = this;
      #{source.replace(/(\n)/g, '$1  ')}
    }).apply(this)
    """

  else
    if /[^a-z0-9_\-\.]exports[^a-z0-9\_\-]/i.test(source)
      source = "var exports = {};\n\n#{source}\n\nreturn exports;"

    if /[^a-z0-9_\-\.]global[^a-z0-9\_\-]/i.test(source)
      source = "var global = this;\n"+ source

    # extracting the 'require' modules to make dependencies
    dependencies = []
    source = source.replace /([^a-z0-9_\-\.])require\(('|")([^\.].+?)\2\)/ig,
      (match, start, quote, module)->
        if module is 'core'
          return "#{start}global.Lovely"
        else
          dependencies.push(module)
          return "#{start}Lovely.modules['#{module}']"

    # creating the Lovely(....) definition
    source = """
      Lovely("#{options.name}", [#{"'#{name}'" for name in dependencies}], function(undefined) {
        #{source.replace(/(\n)/g, "$1  ")}
      });
      #{inline_css(directory)}
      """

  # creating a standard header block
  source = """
  /**
   * lovely.io '#{options.name}' module v#{options.version}
   *
   * Copyright (C) #{new Date().getFullYear()} #{options.author}
   */
  #{source}
  """


#
# Minifies the source code
#
# @param {String} package directory root
# @return {String} minified source code
#
minify = (directory)->
  source = compile(directory)
  ugly   = require('uglify-js')
  build  = ugly.parser.parse(source)

  build  = ugly.uglify.ast_mangle(build)
  build  = ugly.uglify.ast_squeeze(build)
  build  = ugly.uglify.gen_code(build)

  # fixing the ugly `== 'string'` fuckups back to `=== 'string'`
  build  = build.replace(/(typeof [a-z]+)==("[a-z]+")/g, '$1===$2')

  # copying the header over
  (source.match(/\/\*[\s\S]+?\*\/\s/m) || [''])[0] + build


#
# Embedds the styles as an inline javascript
#
# @param {String} package directory root
# @return {String} inlined css
#
inline_css = (directory) ->
  try
    format = path.existsSync("#{directory}/main.styl")
    format = if format then 'styl' else 'css'

    style  = fs.readFileSync("#{directory}/main.#{format}").toString()

    if format is 'styl'
      require('stylus').render style, (err, src) ->
        if err then console.log(err) else style = src

    style = style

    # preserving IE hacks
    .replace(/\/\*\\\*\*\/:/g, '_ie8_s:')
    .replace(/\\9;/g, '_ie8_e;')

    # compacting the styles
    .replace(/\/\*[\S\s]*?\*\//img, '')
    .replace(/\n\s*\n/mg, "\n")
    .replace(/\s+/img, ' ')
    .replace(/\s*(\+|>|\||~|\{|\}|,|\)|\(|;|:|\*)\s*/img, '$1')
    .replace(/;\}/g, '}')
    .replace(/\)([^;}\s])/g, ') $1')
    .trim()

    # getting IE hacks back
    .replace(/([^\s])\*/g,   '$1 *')
    .replace(/_ie8_s:/g,     '/*\\\\**/:')
    .replace(/_ie8_e(;|})/g, '\\\\9$1')

    # escaping the quotes
    .replace(/"/g, '\\"')


    # making the JavaScript embedding script
    if style.match(/^\s*$/) then '' else """

      // embedded css-styles
      (function(document) {
        var style = document.createElement('style');
        var rules = document.createTextNode("#{style}");

        style.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(style);

        if (style.styleSheet) {
          style.styleSheet.cssText = rules.nodeValue;
        } else {
          style.appendChild(rules);
        }
      })(this.document);
      """
  catch e
    "" # file doesn't exists

exports.compile = compile
exports.minify  = minify
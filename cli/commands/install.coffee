#
# Packages installing command
#
# Copyright (C) 2011 Nikolay Nemshilov
#

#
# Makes a local package install
#
local_install = ->
  fs      = require('fs')
  pack    = require('../package')
  repo    = require('../repository')

  sout "» Installing '#{pack.name}' locally".ljust(61)
  system "#{__dirname}/../../bin/lovely build", ->
    repo.save(
      JSON.parse(fs.readFileSync("package.json").toString()),
      fs.readFileSync("build/#{pack.name}.js").toString())
    sout "Done\n".green


#
# Makes a package installation from the hosting app
#
remote_install = (args)->
  hosting = require('../hosting')
  repo    = require('../repository')

  sout "» Downloading the package from the server".ljust(61)
  hosting.get_package args[0], args[1], (pack, build)->
    sout "Done\n".green

    sout "» Resolving package dependencies".ljust(61)
    for name, version of (pack.dependencies || {})
      sout "\n  - #{name}@#{version}".magenta
      system "#{__dirname}/../../bin/lovely install #{name} #{version}"

    sout "\n" if name
    sout "Done\n".green

    sout "» Saving the package in ~/.lovely/packages/#{pack.name} ".ljust(61)
    repo.save(pack, build)
    sout "Done\n".green


#
# Initalizes the command
#
exports.init = (args) ->
  pack  = require('../package')

  if !args.length and !pack.name
    print_error "You should specify the package name"
  else if args.length
    remote_install args
  else
    local_install()


#
# Prints out the command help
#
exports.help = (args) ->
  """
  Install a lovely package

  Usage:
      lovely install <package-name>[ <version>]

  To install your own package locally, run:
      lovely install

  from your project root directory

  """
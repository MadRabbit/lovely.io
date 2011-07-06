#
# The hosting server connection interface
#
# Copyright (C) 2011 Nikolay Nemshilov
#

#
# Generic request method
#
# @param {String} url addres (relative)
# @param {Object} data
# @param {String} request method
# @param {Function} optional callback
#
request = (path, params, method, callback)->
  url = require('url').parse(lovelyrc.host)

  options =
    host:   url.hostname
    port:   url.port
    path:   path
    method: method

  req = require('http').request options, (response)->
    response.setEncoding('utf8')

    response.on 'data', (data)->
      content_type = response.headers['content-type']

      if /json/.test(content_type)
        try
          data = JSON.parse(data)

          if data.errors
            message = "request failed".grey

            for key, errors of data.errors
              errors = [errors] if typeof(errors) is 'string'
              for msg in errors
                message += "\n - #{key} #{msg}".magenta

            print_error message

        catch e
          print_error "server response is malformed"

      else if !/(ecma|java)script/.test(content_type)
        print_error "unexpected server response"

      callback(data) if callback

  req.on 'error', (error)->
    print_error error.message

  params.auth_token = lovelyrc.auth

  req.write(to_query_string(params))
  req.end()

#
# Converts an object into a query string
#
# @param {Object} data
# @return {String} URI encoded string
#
to_query_string = (data)->

  map = (hash, prefix='')->
    result = []

    for key, value of hash
      key = if prefix is '' then key else "#{prefix}[#{key}]"

      if typeof(value) is 'object'
        if value instanceof Array
          for v in value
            result.push(["#{key}[]", v])
        else if value # assuming it's an object
          for entry in map(value, key)
            result.push(entry)

      else
        result.push([key, "#{value}"])

    result

  data = for e in map(data)
    "#{encodeURIComponent(e[0])}=#{encodeURIComponent(e[1])}"

  data.join('&')


#
# Makes a GET request to the server
#
# @param {String} url address (relative)
# @param {Object} optional data
# @param {Function} optional callback
#
get = (path, params, callback)->
  request path, params, 'GET', callback

#
# Makes a POST request to the lovelyrc.host
# in order to create/update a package
#
# @param {String} url addres (relative)
# @param {Object} data
# @param {Function} optional callback
#
post = (path, params, callback)->
  request path, params, 'POST', callback


#
# Sends the package create/update request to the server
#
exports.send_package = (params)->
  post "/packages.json", package: params


#
# Sends a request to remove a package out of the server
#
exports.remove_package = (name, version)->
  post "/packages/#{name}.json", version: version, _method: 'delete'

#
# Downloads the package from the server
#
exports.get_package = (name, version, callback)->
  url = "/packages/#{name}"
  url+= "/#{version}" if version

  get "#{url}.json", {}, (package)->
    package.version = version || package.versions[0]
    get "/#{package.name}-#{package.version}.js", {}, (build)->
      callback package, build

#
# Downloads the package index from the server
#
exports.get_index = (callback)->
  get "/packages.json", {}, (index)->
    callback index
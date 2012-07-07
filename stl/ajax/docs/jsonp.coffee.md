JSONP tunnel for the 'Ajax' interface

Copyright (C) 2011-2012 Nikolay Nemshilov

```coffee-aside
class JSONP
```

Basic constructor

@param {Ajax} original request

```coffee-aside
  constructor: (ajax) ->
    @ajax  = ajax
    @name  = '__lovely_jsonp' + new Date().getTime()
    @param = ajax.options.jsonp
    @param = 'callback' if typeof(@param) isnt 'string'
    @param += "="+ @name

    @script = new Element 'script',
      charset: ajax.options.encoding
      async:   true

    return @
```

saving the url and method for the further use

@param {String} method request method
@param {String} url address
@param {Boolean} async request marker

```coffee-aside
  open: (method, url, async)->
    @url    = url
    @method = method
```

Sends the actual request by inserting the script into the document body

@param {String} data

```coffee-aside
  send: (data)->
    global[@name] = bind(@finish, @)

    url = @url + (if @url.indexOf('?') is -1 then '?' else '&') + @param + "&" + data

    @script.attr('src', url).insertTo($('head')[0]);
```

Receives the actual JSON data from the server

@param {Object} JSON data
@return void

```coffee-aside
  finish: (data)->
    @status     = 200
    @readyState = 4

    @ajax.responseJSON = data
    @script.remove()

    @onreadystatechange()
```

We can't really cancel a JSONP request
but we can prevent the default handler to ckick in

@return void

```coffee-aside
  abort: ->
    global[@name] = ->


  # XMLHttpRequest dummy methods
  setRequestHeader:   ->
  getResponseHeader:  ->
  onreadystatechange: ->
```

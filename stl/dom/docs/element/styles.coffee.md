This module handles the dom-elements styles manipulations

Copyright (C) 2011-2012 Nikolay Nemshilov

```coffee-aside
Element.include
```

Returns the current class-names of the element

@return {String} class-names

```coffee-aside
  getClass: ->
    this._.className
```

Sets the entire `className` property and replaces
and currently active css-classes

@param {String} class-name
@return {Element} this

```coffee-aside
  setClass: (name) ->
    this._.className = name
    this
```

Checks if current element has the tagName

@param {String} class-name
@return {Element} this

```coffee-aside
  hasClass: (name) ->
    " #{this._.className} ".indexOf(" #{name} ") isnt -1
```

Adds the class name to the list

@param {String} class-name
@return {Element} this

```coffee-aside
  addClass: (name) ->
    if name.indexOf(' ') is -1
      testee = " #{this._.className} "
      if testee.indexOf(" #{name} ") is -1
        @_.className += (if testee is '  ' then '' else ' ') + name
    else
      for name in name.split(' ')
        @addClass(name)

    this
```

Removes the class name out of the list

@param {String} class-name
@return {Element} this

```coffee-aside
  removeClass: (name) ->
    if name.indexOf(' ') is -1
      @_.className = trim(" #{@_.className} ".replace(" #{name} ", ' '))

    else
      for name in name.split(' ')
        @removeClass(name)

    this
```

Toggles the class-name existance in the element

@param {String} class-name
@return {Element} this

```coffee-aside
  toggleClass: (name) ->
    if this.hasClass(name) then this.removeClass(name)
    else this.addClass(name)
```

Removes the class name out of all the sibling elements
and adds it to the current one

@param {String} class-name
@return {Element} this

```coffee-aside
  radioClass: (name) ->
    this.siblings().forEach('removeClass', name)
    this.addClass(name)
```

Main method to work with the element styles

    :js
    element.style('name')          // -> {String} style value
    element.style('name1,name2')   // -> {Object} style values
    element.style('name', 'value') // -> {Element} sets the style
    element.style('name:value')    // -> {Element} sets the style
    element.style(name: value)     // -> {Element} also sets the style

@param {String|Hash} style name or style definition
@param {String} style value
@return {String|Object|Element} style, styles or self reference

```coffee-aside
  style: (name, value) ->
    if typeof(name) is 'string'
      if name.indexOf(':') isnt -1 # setting style as a string
        return @style(Element_parse_style(name))

      else if name.indexOf(',') isnt -1 # reading multiple styles
        return Element_read_styles(this, name)

      else if value is undefined # reading a single style
        return Element_clean_style(@_.style, name) or
          Element_clean_style(Element_computed_styles(@_), name)

      else # setting a style
        name = 'cssFloat' if name is 'float'
        @_.style[camelize(name)] = value

    else # assuming it's a hash to set
      for value of name
        @style value, name[value]

    return @


# private

# reads specified element styles into a hash
Element_read_styles = (element, names) ->
  hash = {}

  for name in names.split(',')
    name = camelize(name)
    hash[name] = element.style(name)

  hash


# parses a string style into a hash of styles
Element_parse_style = (style) ->
  hash = {}

  for chunk in style.split(';')
    unless /^\s+$/.test(chunk)
      [name, value] = chunk.split(':')
      hash[trim(name)] = trim(value)

  hash


# creates a clean version of a style value
Element_clean_style = (style, name) ->
  name = camelize(name)

  if name is 'opacity'
    return style[name].replace(',', '.')

  else if name is 'float'
    name = 'cssFloat'

  value = style[name]

  # Opera returns named colors with quotes
  value = value.replace(/"/g, '') if /color/i.test(name) and value

  value


# finding computed styles of a dom-element
Element_computed_styles = (element) ->
  element.ownerDocument.defaultView.getComputedStyle(element, null)
```

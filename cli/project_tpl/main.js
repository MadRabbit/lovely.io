/**
 * %{projectname} main file
 *
 * Copyright (C) %{year} %{username}
 */

// hook up the dependencies
var core = require('core');
var dom  = require('dom');

// glue in your files
include('src/my-file');

// exports your objects in the module
exports.version = '%{version}';

// global exports (don't use unless you're really need that)
global.my_stuff = 'that pollutes the global scope';
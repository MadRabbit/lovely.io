/**
 * The new project generator tool
 *
 * Copyright (C) 2011 Nikolay Nemshilov
 */
var fs = require('fs');

/**
 * Starts the new project generation
 *
 * @param {String} projectname
 * @param {Array} the rest of the arguments
 * @return void
 */
function generate(projectname, args) {
  var directory    = process.cwd() + "/" + projectname;
  var project_tpl  = __dirname + "/project_tpl";
  var placeholders = {
    projectname: projectname,
    year:        new Date().getFullYear(),
    username:    "Vasily Pupkin" // TODO hook me up from ~/.somerc
  };

  console.log("Creating directory: ", projectname);
  fs.mkdirSync(directory, 0755);

  fs.readdirSync(project_tpl).forEach(function(filename) {
    var source = fs.readFileSync(project_tpl + "/" + filename).toString();

    for (var key in placeholders) {
      source = source.replace(
        new RegExp('%\\{'+ key + '\\}', 'g'), placeholders[key]
      );
    }

    console.log("  -", filename);
    fs.writeFileSync(directory + "/" + filename, source);
  });
}

exports.init = function(args) {
  if (args[0].match(/^[a-z0-9][a-z0-9\-_]+[a-z0-9]$/)) {
    try {
      fs.lstatSync(process.cwd() + "/" + args[0]);
      console.log("Directory already exists");
    } catch (e) {
      generate(args[0], args.slice(1));
    }
  } else {
    console.log("Project name should match /^[a-z0-9][a-z0-9\-_]+[a-z0-9]$/");
  }
};

exports.help = function(args) {
  console.log(
    "Generates a standard LovelyIO module project\n\n" +
    "Usage: lovely new <project-name>"
  );
}
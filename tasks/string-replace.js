/*
 * grunt-string-replace
 * https://github.com/erickrdch/grunt-string-replace
 *
 * Copyright (c) 2012 Erick Ruiz de Chavez
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';

  var helpers = require('grunt-lib-contrib').init(grunt);
  var string_replace = require('./lib/string-replace').init(grunt);

  grunt.registerMultiTask('string-replace', 'String Replace Task.', function() {
    var replacements;

    var options = helpers.options(this, {
      replacements: []
    });

    replacements = string_replace.normalize_replacements(options.replacements);
    string_replace.replace(this.files, replacements);
  });
};

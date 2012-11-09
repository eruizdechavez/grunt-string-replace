/*
 * grunt-string-replace
 * https://github.com/erickrdch/grunt-string-replace
 *
 * Copyright (c) 2012 Erick Ruiz de Chavez
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';

  var path = require('path'),
    helpers = require('grunt-lib-contrib').init(grunt);

  // ==========================================================================
  // TASKS
  // ==========================================================================
  grunt.registerMultiTask('string-replace', 'String Replace Task.', function() {
    var options, replacements;

    // TODO: remove if/when we officially drop node <= 0.7.9
    path.sep = path.sep || path.normalize('/');

    // TODO: ditch this when grunt v0.4 is released
    this.files = this.files || helpers.normalizeMultiTaskFiles(this.data, this.target);

    options = helpers.options(this, {
      replacements: []
    });
    replacements = grunt.helper('normalize-replacements', options.replacements);

    grunt.helper('string-replace', this.files, replacements);
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================
  grunt.registerHelper('string-replace', function(files, replacements) {
    var dest, srcFiles, srcFile, destType, destFile, content, basePath, filename, relative;

    files.forEach(function(file) {
      dest = path.normalize(file.dest);
      destType = grunt.helper('detect-dest-type', dest);
      srcFiles = grunt.file.expandFiles(file.src);
      basePath = helpers.findBasePath(srcFiles);

      srcFiles.forEach(function(srcFile) {
        srcFile = path.normalize(srcFile);
        content = grunt.file.read(srcFile);
        content = grunt.helper('multi-str-replace', content, replacements);

        if (destType === 'file') {
          if (srcFiles.length === 1) {
            grunt.file.write(dest, content);
          } else {
            grunt.fail.warn('multiple files to the same destination');
          }
        } else if (destType === 'directory') {
          filename = path.basename(srcFile);
          relative = path.dirname(srcFile);
          relative = grunt.util._(relative).strRight(basePath).trim(path.sep);

          // make paths outside grunts working dir relative
          // TODO: do I really need this?
          relative = relative.replace(/\.\.(\/|\\)/g, '');

          destFile = path.join(dest, relative, filename);
          grunt.file.write(destFile, content);
        }
      });
    });
  });

  grunt.registerHelper('normalize-replacements', function(replacements) {
    return replacements.map(function(replacement) {
      return [replacement.pattern, replacement.replacement];
    });
  });

  grunt.registerHelper('str-replace', function(string, pattern, replacement) {
    return string.replace(pattern, grunt.task.directive(replacement));
  });

  grunt.registerHelper('multi-str-replace', function(string, replacements) {
    return replacements.reduce(function(content, replacement) {
      return grunt.helper('str-replace', content, replacement[0], replacement[1]);
    }, string);
  });

  grunt.registerHelper('detect-dest-type', function(dest) {
    dest = path.normalize(dest);
    if (grunt.util._.endsWith(dest, path.sep)) {
      return 'directory';
    } else {
      return 'file';
    }
  });
};

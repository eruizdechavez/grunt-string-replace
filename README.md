# grunt-string-replace [![Build Status](https://travis-ci.org/erickrdch/grunt-string-replace.png)](https://travis-ci.org/erickrdch/grunt-string-replace)  [![Node Dependencies](https://david-dm.org/erickrdch/grunt-string-replace.png)](https://david-dm.org/erickrdch/grunt-string-replace)

Replaces strings on files by using string or regex patterns. Attempts to be a [String.prototype.replace](http://www.ecma-international.org/ecma-262/5.1/#sec-15.5.4.11) adapter task for your grunt project.

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-string-replace --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-string-replace');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.1.1-1](https://github.com/erickrdch/grunt-string-replace/tree/0.1.1-1).*

## Documentation

### Configuration

Inside your `Gruntfile.js` file add a section named `string-replace`. This section specifies the files to edit, destinations, patterns and replacements.

#### Parameters

##### files ```object```

This defines what files this task will edit and must follow [Gruntfile Files mapping](http://gruntjs.com/configuring-tasks#files).

##### options ```object```

This controls how this task operates and should contain key:value pairs, see options below.

#### Options

##### replacements ```array```

This option will hold all your pattern/replacement pairs. A pattern/replacement pair should contain key:value pairs containing:

* pattern ```string``` or ```regex```
* replacement ```string```

```javascript
options: {
  replacements: [{
    pattern: /\/(asdf|qwer)\//ig,
    replacement: '"$1"'
  }, {
    pattern: ',',
    replacement: ';'
  }]
}
```

###### Note

If the pattern is a string, only the first occurrence will be replaced, as stated on [String.prototype.replace](http://www.ecma-international.org/ecma-262/5.1/#sec-15.5.4.11).

#### Config Example

```javascript
'string-replace': {
  dist: {
    files: {
      'path/to/directory/': 'path/to/source/*', // includes files in dir
      'path/to/directory/': 'path/to/source/**', // includes files in dir and subdirs
      'path/to/project-<%= pkg.version %>/': 'path/to/source/**', // variables in destination
      'path/to/directory/': ['path/to/sources/*.js', 'path/to/more/*.js'], // include JS files in two diff dirs
      'path/to/filename.ext': 'path/to/source.ext'
    },
    options: {
      replacements: [{
        pattern: /\/(asdf|qwer)\//ig,
        replacement: ''$1''
      }, {
        pattern: ',',
        replacement: ';'
      }]
    }
  },
  inline: {
    options: {
      replacements: [
        // place files inline example
        {
        	pattern: '<script src='js/async.min.js'></script>',
        	replacement: '<script><%= grunt.file.read('path/to/source/js/async.min.js') %></script>'
      	}
      ]
    },
    files: {...}
  }
}
```

## Advanced Usage

Since grunt-string-replace is basically a wrapper of [String.prototype.replace](http://www.ecma-international.org/ecma-262/5.1/#sec-15.5.4.11) you can also provide a function as a replacement pattern instead of a string or a template. To get more details about how to use a function as replacement pattern I recommend you to read [Specifying a function as a parameter](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_function_as_a_parameter).

### Example

We will be reading file names from HTML comments and use the paths later to fetch the content and insert it inside a resulting HTML. Assuming the following setup:

*dist/index.html*

```html
<!-- @import partials/header.html -->
content here
<!-- @import partials/footer.html -->
```

*dist/partials/header.html*

```html
<html><head></head><body>
```

*dist/partials/footer.html*

```html
</body></html>
```

*Gruntfile.js*

```javascript
'use strict';

module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    config: {
      dist: 'dist/'
    },
    'string-replace': {
      kit: {
        files: {
          '<%= config.dist %>index-dist.html': '<%= config.dist %>index.html'
        },
        options: {
          replacements: [{
            pattern: /<!-- @import (.*?) -->/ig,
            replacement: function (match, p1, offset, string) {
              return grunt.file.read(grunt.config.get('config.dist') + p1);
            }
          }]
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-string-replace');

  // Default task.
  grunt.registerTask('default', ['string-replace']);
};
```

After executing grunt we get the following:

*dist/index-dist.html*

```html
<html><head></head><body>
content here
</body></html>
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History

0.2.8
  - Added log message after file is succesfully created. Contributed by [donaldpipowitch](https://github.com/donaldpipowitch)

0.2.7
  - External libraries are deprecated on Grunt 0.4.2
    - Remove grunt.util._ as it is not really required
    - Replace grunt.util.async with async

0.2.6
  - Update Getting Started section
  - Fix broken link to Gruntfile's File section (#18)

0.2.5
  - Fix for #16
  - Fix for Travis CI config file
  - Added error handling to finish the task if something did not work as expected instead of just fail silently
  - Updated dev dependencies to latest stable versions

0.2.4
  - Asynchronously loop files. Original idea contributed by [maxnachlinger](https://github.com/maxnachlinger)
  - Inline replacing example on README.md. Contributed by [willfarrell](https://github.com/willfarrell)

0.2.3
  - Removed dependency with grunt-lib-contrib due to deprecation of 'options' method in favor of Grunt's 'options' util.
  - Updated grunt-contrib-jshint version in package.json to 0.3.0
  - Updated grunt-contrib-watch version in package.json to 0.3.1
  - Updated grunt version in package.json to 0.4.1
  - Added Node.js v0.10 to Travis CI config file

0.2.2
  - Added support to be used as npm module. Contributed by [thanpolas](https://github.com/thanpolas).

0.2.1
  - Updated dependencies for Grunt 0.4.0.

0.2.0
  - Added Support for grunt 0.4.0. This version will not support grunt 0.3.x, if you need to use it then ```npm install grunt-string-replace@0.1```.

0.1.1-1
  - Added Clean task (and dev dependency) to remove test generated file before testing.
  - Added Sublime Text project files and test generated file to npm ignore list.

0.1.1
  - Fix dependency with grunt-lib-contrib.

0.1.0-1
  - Fixed a typo on package.json description.
  - Added a note about string pattern behavior.

0.1.0
  - Initial release.

## License
Copyright (c) 2012 Erick Ruiz de Chavez.
Licensed under the MIT license.

[grunt]: http://gruntjs.com/

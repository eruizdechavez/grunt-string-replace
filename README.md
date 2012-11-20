# grunt-string-replace [![Build Status](https://secure.travis-ci.org/erickrdch/grunt-string-replace.png?branch=master)](https://travis-ci.org/erickrdch/grunt-string-replace)

Replaces strings on files by using string or regex patterns. Attempts to be a [String.prototype.replace](http://www.ecma-international.org/ecma-262/5.1/#sec-15.5.4.11) adapter task for your grunt project.

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-string-replace`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-string-replace');
```

[grunt]: http://gruntjs.com/
[getting_started]: https://github.com/gruntjs/grunt/blob/master/docs/getting_started.md

## Documentation

### Configuration

Inside your `grunt.js` file add a section named `string-replace`. This section specifies the files to edit, destinations, patterns and replacements.

#### Parameters

##### files ```object```

This defines what files this task will edit and should contain key:value pairs.

The key (destination) should be an unique path (supports [grunt.template](https://github.com/gruntjs/grunt/blob/master/docs/api_template.md)) and the value (source) should be a filepath or an array of filepaths (supports [minimatch](https://github.com/isaacs/minimatch)).

When copying to a directory you must add a trailing slash to the destination due to support of single file copy.

##### options ```object```

This controls how this task operates and should contain key:value pairs, see options below.

#### Options

##### replacements ```array```

This option will hold all your pattern/replacement pairs. A pattern/replacement pair should contain key:value pairs containing:

* pattern ```string``` or ```regex```
* replacement ```string```

``` javascript
options: {
  replacements: [{
    pattern: /\/(asdf|qwer)\//ig,
    replacement: "'$1'"
  }, {
    pattern: ",",
    replacement: ";"
  }]
}
```

###### Note

If the pattern is a string, only the first occurrence will be replaced, as stated on [String.prototype.replace](http://www.ecma-international.org/ecma-262/5.1/#sec-15.5.4.11).

#### Config Example

``` javascript
"string-replace": {
  dist: {
    files: {
      "path/to/directory/": "path/to/source/*", // includes files in dir
      "path/to/directory/": "path/to/source/**", // includes files in dir and subdirs
      "path/to/project-<%= pkg.version %>/": "path/to/source/**", // variables in destination
      "path/to/directory/": ["path/to/sources/*.js", "path/to/more/*.js"], // include JS files in two diff dirs
      "path/to/filename.ext": "path/to/source.ext"
    },
    options: {
      replacements: [{
        pattern: /\/(asdf|qwer)\//ig,
        replacement: "'$1'"
      }, {
        pattern: ",",
        replacement: ";"
      }]
    }
  }
}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
0.1.0 - Initial release

## License
Copyright (c) 2012 Erick Ruiz de Chavez
Licensed under the MIT license.


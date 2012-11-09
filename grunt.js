module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    lint: {
      files: ['grunt.js', 'tasks/**/*.js']
    },
    test: {
      files: ['test/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint test'
    },
    'string-replace': {
      foo: {
        files: {
          'baz.txt': 'foo.txt'
        },
        options: {
          replacements: [{
            pattern: '[test:string]',
            replacement: 'replaced!'
          },{
            pattern: /\[test a:regex \d{3,}\]/,
            replacement: 'replaced!'
          },{
            pattern: /\[test b:regex \d{3,}\]/g,
            replacement: 'replaced!'
          },{
            pattern: /\[test c:regex \d{3,}\]/g,
            replacement: 'replaced!'
          },{
            pattern: /\[test d:regex \d{3,}\]/ig,
            replacement: 'replaced!'
          }]
        }
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      },
      globals: {}
    }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', 'lint test string-replace');
};
